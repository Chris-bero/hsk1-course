/**
 * Outbox — persistent queue of remote writes (docs/PHASE2_INTEGRATION.md §7).
 *
 * Why: the student site must never lose progress when the network drops or
 * the page closes mid-session. Every remote write is first recorded here
 * (localStorage), then flushed to the Apps Script endpoint in order. Failed
 * flushes keep the ops queued; the provider's syncState badge tells the truth
 * ('pending' while non-empty, 'error' after a failed flush, 'synced' after
 * server acks).
 *
 * Merge rules (keep the queue small + last-intent-wins):
 *  - updateLessonProgress: one op per lesson (latest record wins — records
 *    are absolute, so replacing is safe; the server still clamps time).
 *  - markVocabulary: one op per (lesson, vocabulary).
 *  - saveQuizStats: one op per lesson.
 *  - logEvents: a single growing batch (dedupe by eventId); split into
 *    server-sized chunks at flush time.
 *  - migrateLocalProgress: one op (latest snapshot wins).
 */
import { appConfig } from '../config';
import { uuid } from '../services/identity';

export type OutboxOpType =
  | 'updateLessonProgress'
  | 'markVocabulary'
  | 'saveQuizStats'
  | 'logEvents'
  | 'migrateLocalProgress';

export interface OutboxOp {
  id: string;
  op: OutboxOpType;
  payload: Record<string, unknown>;
  createdAt: string;
}

interface OutboxFile {
  version: 1;
  ops: OutboxOp[];
}

/** Max events kept in the queued logEvents batch (oldest dropped beyond). */
const MAX_QUEUED_EVENTS = 1000;

function opKey(op: OutboxOp): string | null {
  const p = op.payload as Record<string, unknown>;
  switch (op.op) {
    case 'updateLessonProgress': {
      const rec = (p.record ?? p) as Record<string, unknown>;
      return `lesson:${String(rec.lessonId ?? '')}`;
    }
    case 'markVocabulary': {
      const rec = (p.record ?? p) as Record<string, unknown>;
      return `vocab:${String(rec.lessonId ?? '')}:${String(rec.vocabularyId ?? '')}`;
    }
    case 'saveQuizStats': {
      const q = (p.stats ?? p) as Record<string, unknown>;
      return `quiz:${String(q.lessonId ?? '')}`;
    }
    case 'migrateLocalProgress':
      return 'migrate';
    default:
      return null; // logEvents: never replaced, merged separately
  }
}

export class Outbox {
  private ops: OutboxOp[] = [];
  private keyIndex = new Map<string, string>(); // opKey -> op.id
  private storage: Storage | null;

  constructor(
    storage: Storage | null,
    private onChanged?: (length: number) => void,
    private storageKey: string = appConfig.storageKeys.outbox,
  ) {
    this.storage = storage;
    this.load();
  }

  get length(): number {
    return this.ops.length;
  }

  isEmpty(): boolean {
    return this.ops.length === 0;
  }

  /** All queued ops in flush order (do not mutate). */
  peek(): readonly OutboxOp[] {
    return this.ops;
  }

  private load(): void {
    if (!this.storage) return;
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as OutboxFile;
      if (parsed && parsed.version === 1 && Array.isArray(parsed.ops)) {
        this.ops = parsed.ops.filter((o) => o && typeof o.op === 'string' && o.payload);
        for (const op of this.ops) {
          const k = opKey(op);
          if (k) this.keyIndex.set(k, op.id);
        }
      }
    } catch {
      // Corrupt queue — start empty rather than blocking all writes.
      this.ops = [];
      this.keyIndex.clear();
    }
  }

  private persist(): void {
    if (!this.storage) return;
    try {
      const file: OutboxFile = { version: 1, ops: this.ops };
      this.storage.setItem(this.storageKey, JSON.stringify(file));
    } catch {
      // Storage full/blocked: ops survive in memory for this page session.
    }
    this.onChanged?.(this.ops.length);
  }

  /** Queue a lesson/vocab/quiz/migrate write (merges by key). */
  enqueue(opType: OutboxOpType, payload: Record<string, unknown>): void {
    const op: OutboxOp = { id: uuid(), op: opType, payload, createdAt: new Date().toISOString() };
    if (opType === 'logEvents') {
      this.mergeEvents(op);
      return;
    }
    const k = opKey(op);
    if (k) {
      const existingId = this.keyIndex.get(k);
      if (existingId) {
        const idx = this.ops.findIndex((o) => o.id === existingId);
        if (idx !== -1) {
          // Replace payload but KEEP position (flush order stays chronological
          // relative to other ops like migrate).
          this.ops[idx] = { ...this.ops[idx]!, payload, createdAt: op.createdAt };
          this.persist();
          return;
        }
      }
      this.keyIndex.set(k, op.id);
    }
    this.ops.push(op);
    this.persist();
  }

  /** Queue events: merge into a single batch, dedupe by eventId, cap size. */
  private mergeEvents(op: OutboxOp): void {
    const incoming = ((op.payload.events as unknown[]) ?? []).filter(
      (e): e is Record<string, unknown> => !!e && typeof e === 'object',
    );
    let batch = this.ops.find((o) => o.op === 'logEvents');
    if (!batch) {
      batch = { ...op, payload: { events: [] } };
      this.ops.push(batch);
    }
    const events = batch.payload.events as Record<string, unknown>[];
    const seen = new Set(events.map((e) => String(e.eventId)));
    for (const ev of incoming) {
      const id = String(ev.eventId ?? '');
      if (!id || seen.has(id)) continue;
      seen.add(id);
      events.push(ev);
    }
    if (events.length > MAX_QUEUED_EVENTS) {
      events.splice(0, events.length - MAX_QUEUED_EVENTS);
    }
    batch.createdAt = op.createdAt;
    this.persist();
  }

  /** Remove the first op (call only AFTER the server acked it). */
  ackFirst(): void {
    const op = this.ops.shift();
    if (!op) return;
    const k = opKey(op);
    if (k && this.keyIndex.get(k) === op.id) this.keyIndex.delete(k);
    this.persist();
  }

  /**
   * Split the queued logEvents batch into a chunk of at most `size` events.
   * Returns null when there is nothing to send. The remaining events stay
   * queued until the chunk is acked (ackEventsChunk).
   */
  peekEventsChunk(size: number): Record<string, unknown>[] | null {
    const batch = this.ops.find((o) => o.op === 'logEvents');
    if (!batch) return null;
    const events = batch.payload.events as Record<string, unknown>[];
    if (!events.length) return null;
    return events.slice(0, size);
  }

  /** Drop the first `n` events from the queued batch (after server ack). */
  ackEventsChunk(n: number): void {
    const idx = this.ops.findIndex((o) => o.op === 'logEvents');
    if (idx === -1) return;
    const batch = this.ops[idx]!;
    const events = batch.payload.events as Record<string, unknown>[];
    events.splice(0, n);
    if (events.length === 0) this.ops.splice(idx, 1);
    this.persist();
  }

  clear(): void {
    this.ops = [];
    this.keyIndex.clear();
    this.persist();
  }
}
