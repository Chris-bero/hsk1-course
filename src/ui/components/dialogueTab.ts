/**
 * Dialogue tab — reference-style chat view:
 *  - selector chips when a lesson has multiple listening texts,
 *  - panel with title, context line, key-word chips,
 *  - "Play full dialogue" (sequential, line highlighting), global speed readout,
 *    "Listening challenge" (blurs all text so students listen first),
 *  - speaker bubbles: first speaker left/blue, second right/red.
 */
import type { Conversation, Lesson } from '../../types/content';
import { S } from '../../i18n/strings';
import type { AudioPlayContext } from '../../services/audioService';
import { el } from '../dom';
import type { AppContext } from '../context';
import { sectionHeader } from './common';

const AVATAR_COLORS = ['avatar-a', 'avatar-b', 'avatar-c', 'avatar-d'];

export function dialogueTab(
  ctx: AppContext,
  lesson: Lesson,
  cleanups: (() => void)[],
): HTMLElement {
  const body = el('div', { class: 'dialogue-body' });

  if (lesson.conversations.length === 0) {
    return el('p', { class: 'muted empty-note', text: '—' });
  }

  let selected = 0;

  const renderPanel = (): void => {
    body.textContent = '';
    body.appendChild(dialoguePanel(ctx, lesson, lesson.conversations[selected]!, cleanups));
  };

  const selector =
    lesson.conversations.length > 1
      ? el('div', { class: 'dialogue-selector' },
          ...lesson.conversations.map((conv, i) => {
            const chip = el('button', {
              class: `dialogue-chip${i === selected ? ' active' : ''}`,
              attrs: { type: 'button' },
            },
              el('div', { class: 'dc-title', text: conv.title.zh, lang: 'zh' }),
              el('div', { class: 'dc-sub' }, '🎧 ', el('span', { text: S.listening.en })),
            );
            chip.addEventListener('click', () => {
              selected = i;
              for (const c of Array.from(chip.parentNode?.children ?? [])) c.classList.remove('active');
              chip.classList.add('active');
              ctx.audio.stop();
              renderPanel();
            });
            return chip;
          }),
        )
      : null;

  renderPanel();
  return el('div', {}, sectionHeader('话', S.conversation), selector, body);
}

function dialoguePanel(
  ctx: AppContext,
  lesson: Lesson,
  conv: Conversation,
  cleanups: (() => void)[],
): HTMLElement {
  const lessonId = lesson.id;
  const speakerById = new Map(conv.speakers.map((s) => [s.id, s]));
  const speakerIndex = new Map(conv.speakers.map((s, i) => [s.id, i]));
  const lineEls = new Map<string, HTMLElement>();

  // Key words of the lesson that actually appear in this dialogue.
  const dialogueText = conv.lines.map((l) => l.hanzi).join('');
  const keyChips = lesson.vocabulary
    .filter((w) => w.keyWord && dialogueText.includes(w.hanzi))
    .map((w) => el('span', { class: 'key-chip', text: w.hanzi, lang: 'zh' }));

  const clearHighlight = (): void => {
    for (const node of lineEls.values()) node.classList.remove('playing');
  };

  const lineCtxs: AudioPlayContext[] = conv.lines.map((line) => ({
    clipId: line.id,
    lessonId,
    kind: 'conversation-line',
  }));

  const playAllBtn = el('button', { class: 'btn btn-grad', attrs: { type: 'button' } },
    '▶ ', el('span', { text: S.playAll.en }));
  const stopBtn = el('button', { class: 'btn', attrs: { type: 'button' } },
    '■ ', el('span', { text: S.stop.en }));
  stopBtn.hidden = true;

  const setPlayingUI = (playing: boolean): void => {
    playAllBtn.hidden = playing;
    stopBtn.hidden = !playing;
  };

  playAllBtn.addEventListener('click', () => {
    const started = ctx.audio.playSequence(lineCtxs, (active) => {
      clearHighlight();
      if (active) lineEls.get(active.clipId)?.classList.add('playing');
      else setPlayingUI(false);
    });
    if (started) {
      ctx.progress.track('conversation_played', lessonId);
      setPlayingUI(true);
    }
  });
  stopBtn.addEventListener('click', () => {
    ctx.audio.stop();
    clearHighlight();
    setPlayingUI(false);
  });

  // Listening challenge: blur all bubble text until revealed.
  const panel = el('section', { class: 'dialogue-panel' });
  const listenBtn = el('button', { class: 'btn', attrs: { type: 'button' } },
    '🎧 ', el('span', { text: S.listeningChallenge.en }));
  const listenHint = el('p', { class: 'listen-hint', text: `${S.listeningHint.en} · ${S.listeningHint.zh}` });
  listenHint.hidden = true;
  listenBtn.addEventListener('click', () => {
    const on = !panel.classList.contains('listening');
    panel.classList.toggle('listening', on);
    listenBtn.classList.toggle('active', on);
    listenHint.hidden = !on;
  });

  const speedLabel = el('span', { class: 'speed-readout' },
    el('span', { class: 'muted', text: `${S.globalSpeed.en}: ` }),
    el('strong', { class: 'speed-value', text: `${ctx.settings.get().playbackRate}×` }),
  );
  const unsub = ctx.settings.subscribe((s) => {
    speedLabel.querySelector('.speed-value')!.textContent = `${s.playbackRate}×`;
  });
  cleanups.push(unsub);

  const bubbles = el('div', { class: 'conv-lines' },
    ...conv.lines.map((line, lineIndex) => {
      const idx = speakerIndex.get(line.speakerId) ?? 0;
      const right = idx % 2 === 1;
      const speaker = speakerById.get(line.speakerId);
      const avatar = el('span', {
        class: `avatar ${AVATAR_COLORS[idx % AVATAR_COLORS.length]!}`,
        text: speaker ? (speaker.id || speaker.name.slice(0, 1)) : String(idx + 1),
      });
      const bubble = el('div', { class: `conv-line ${right ? 'side-right' : 'side-left'}`, dataset: { lineId: line.id } },
        avatar,
        el('div', { class: 'bubble' },
          el('div', { class: 'pinyin', text: line.pinyin, lang: 'zh-Latn' }),
          el('div', { class: 'hanzi-sm', text: line.hanzi, lang: 'zh' }),
          el('div', { class: 'translation', text: line.english }),
          el('button', {
            class: 'play-btn play-btn-sm',
            attrs: { type: 'button', title: `${S.play.en} · ${S.play.zh}` },
            onClick: () => {
              const started = ctx.audio.play({ clipId: line.id, lessonId, kind: 'conversation-line' });
              if (started) {
                ctx.progress.track('conversation_played', lessonId);
                clearHighlight();
                bubble.classList.add('playing');
              }
            },
          }, '▶'),
        ),
      );
      lineEls.set(line.id, bubble);
      bubble.style.setProperty('--i', String(lineIndex));
      return bubble;
    }),
  );

  panel.append(
    el('div', { class: 'dialogue-head' },
      el('h2', { class: 'dialogue-title', text: conv.title.zh, lang: 'zh' }),
      el('p', { class: 'dialogue-subtitle', text: conv.title.en }),
      conv.context
        ? el('p', { class: 'dialogue-context' }, '🎬 ', el('span', { text: conv.context.en }), el('span', { class: 'zh', text: ` · ${conv.context.zh}`, lang: 'zh' }))
        : null,
      keyChips.length > 0 ? el('div', { class: 'key-chips' }, ...keyChips) : null,
    ),
    el('div', { class: 'dialogue-controls' }, playAllBtn, stopBtn, speedLabel, listenBtn),
    listenHint,
    bubbles,
  );
  return panel;
}
