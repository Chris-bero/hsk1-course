/**
 * Type declarations for scripts/mock_backend.mjs (test tooling).
 */
export interface MockStudentSeed {
  name: string;
  code: string;
  studentId?: string;
  status?: string;
}

export interface MockBackendOptions {
  students?: MockStudentSeed[];
  online?: boolean;
}

export interface MockBackend {
  /** Same envelope as the Apps Script endpoint: {op, token?, payload?} → {ok, data|error}. Teacher ops are FORBIDDEN on this channel. */
  request(req: unknown): { ok: boolean; data?: unknown; error?: { code: string; message: string } };
  /** Mirrors teacherApi(): the private HtmlService channel — teacher ops allowed without a token. */
  dashboardRequest(req: unknown): { ok: boolean; data?: unknown; error?: { code: string; message: string } };
  db: {
    students: Array<Record<string, string>>;
    lessonProgress: Map<string, Record<string, unknown>>;
    vocabProgress: Map<string, Record<string, unknown>>;
    quizStats: Map<string, Record<string, unknown>>;
    events: Array<Record<string, unknown>>;
    sessions: Map<string, { role: string; studentId: string; expiresAt: number }>;
  };
  COURSE_DATA: {
    courseId: string;
    courseLevel: string;
    totalLessons: number;
    lessons: Array<{ id: string; order: number; titleEn: string; titleZh: string; vocabIds: string[] }>;
  };
  setOnline(v: boolean): void;
  readonly online: boolean;
  advanceClock(ms: number): void;
  lessonRow(studentId: string, lessonId: string): Record<string, unknown> | null;
  vocabRow(studentId: string, lessonId: string, vocabId: string): Record<string, unknown> | null;
  studentRow(studentId: string): Record<string, string> | null;
}

export declare function createMockBackend(opts?: MockBackendOptions): MockBackend;
export declare const COURSE_DATA: MockBackend['COURSE_DATA'];
