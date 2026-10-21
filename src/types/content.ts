/**
 * Content model for lessons.
 *
 * STABLE ID RULES (spec §17B, §20):
 * Every lesson, vocabulary entry, sentence, grammar point, conversation and
 * conversation line carries a permanent, human-readable ID that never changes
 * once published, even if the UI is redesigned or items are reordered.
 *
 *   lesson:        hsk1-l01 ... hsk1-l15
 *   vocabulary:    hsk1-l01-v01
 *   vocab example: hsk1-l01-v01-e01
 *   sentence:      hsk1-l01-s01
 *   grammar point: hsk1-l01-g01
 *   conversation:  hsk1-l01-d01
 *   conv. line:    hsk1-l01-d01-01
 *   audio clip:    identical to the content item's ID (audio/<id>.mp3)
 *
 * Progress records always reference these IDs — never display positions.
 */

/** A bilingual label used for UI text and titles. */
export interface BiText {
  en: string;
  zh: string;
}

/** Which Mandarin voice to use for a speaker's audio clips. */
export type VoiceHint = 'female' | 'female2' | 'female3' | 'male' | 'male2' | 'male3' | 'girl' | 'boy';

export interface ExampleSentence {
  /** Stable ID, e.g. hsk1-l01-s01 (unique across the whole course). */
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  /**
   * Optional TTS-only text: what the audio should say when the DISPLAYED
   * hanzi contains symbols a speech engine must not read literally
   * (e.g. masked digits like 135xxxx1160). Defaults to `hanzi`.
   */
  audioText?: string;
}

export interface VocabularyEntry {
  /** Stable ID, e.g. hsk1-l01-v01. */
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  /** Part of speech, e.g. "n.", "v.", "adj.", "intj." — optional. */
  partOfSpeech?: string;
  /** Flags the word as a lesson key word (⭐ chip + "Key words" filter). */
  keyWord?: boolean;
  /** Example sentences that illustrate this word. Each has its own stable ID. */
  examples?: ExampleSentence[];
}

export interface GrammarPoint {
  /** Stable ID, e.g. hsk1-l01-g01. */
  id: string;
  title: BiText;
  /**
   * The grammar focus character(s), e.g. "要" — shown in the badge, colored
   * inside the structure formula, and highlighted in example sentences.
   * Falls back to the first character of the title.
   */
  focusHanzi?: string | string[];
  /** Sentence pattern, e.g. "A + 叫 + 什么 + 名字？" */
  structure?: string;
  /** Optional negative/alternative pattern, e.g. "Negative: S + 不想 + V + O". */
  structureNegative?: string;
  explanation: BiText;
  /** Example sentences. May reuse IDs of lesson-level sentences (audio is deduplicated by ID). Optional — some grammar cards (e.g. number notation) carry only an explanation. */
  examples?: ExampleSentence[];
}

export interface ConversationSpeaker {
  /** Stable speaker ID within the conversation, e.g. "A". */
  id: string;
  /** Display name, e.g. "李军 Lǐ Jūn". */
  name: string;
  /** Voice used when generating this speaker's audio. Defaults to 'female'. */
  voice?: VoiceHint;
}

export interface ConversationLine {
  /** Stable ID, e.g. hsk1-l01-d01-01. */
  id: string;
  /** References ConversationSpeaker.id */
  speakerId: string;
  hanzi: string;
  pinyin: string;
  english: string;
}

export interface Conversation {
  /** Stable ID, e.g. hsk1-l01-d01. */
  id: string;
  title: BiText;
  /** Situational context line, e.g. "Planning a trip together". */
  context?: BiText;
  speakers: ConversationSpeaker[];
  lines: ConversationLine[];
}

export interface Lesson {
  /** Stable ID, e.g. hsk1-l01. Never reused or renumbered. */
  id: string;
  /** Display order, 1..15. */
  order: number;
  title: BiText;
  /** Pinyin of the lesson title (shown on lesson cards). */
  titlePinyin?: string;
  /** Lesson objectives shown at the top of the lesson (bilingual strings). */
  objectives?: BiText[];
  /** Speaking activities from the book (课文练习), shown on the Practice tab. */
  activities?: BiText[];
  vocabulary: VocabularyEntry[];
  /** Lesson-level example sentences (beyond per-word examples). */
  sentences: ExampleSentence[];
  grammar: GrammarPoint[];
  conversations: Conversation[];
}

/** Metadata for the whole course. */
export interface Course {
  id: string;
  title: BiText;
  /** e.g. "HSK 1" — maps to Lessons.CourseLevel in the future spreadsheet. */
  level: string;
  totalLessons: number;
}

/**
 * A row in the lesson index shown on the home page and in navigation.
 * `lesson` is null for lessons whose content has not been extracted yet
 * (awaiting source PDFs); they render as "coming soon".
 */
export interface LessonSummary {
  id: string;
  order: number;
  title: BiText;
  titlePinyin?: string;
  vocabularyCount: number;
  available: boolean;
}
