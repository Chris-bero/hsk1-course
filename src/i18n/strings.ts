/**
 * Bilingual UI strings (English + Chinese), per the agreed interface language.
 * Components render both: English primary, Chinese secondary.
 */
export interface BiLabel {
  en: string;
  zh: string;
}

export const S = {
  siteTitle: { en: 'NEW HSK 1 Course', zh: '新版 HSK 1 课程' },
  siteSubtitle: { en: 'Interactive digital edition', zh: '互动数字版' },
  tagline: {
    en: 'Interactive lessons with natural Mandarin audio',
    zh: '互动课程 · 自然普通话音频',
  },
  home: { en: 'Home', zh: '首页' },
  allLessons: { en: 'All Lessons', zh: '课文目录' },
  allLessonsSub: {
    en: 'Open a ready lesson to study — locked ones are being built, one by one',
    zh: '打开已就绪的课程学习 —— 其余课程正在逐课制作',
  },
  howItWorks: { en: 'How it works', zh: '使用说明' },
  lessons: { en: 'Lessons', zh: '课文' },
  lesson: { en: 'Lesson', zh: '课' },
  yourProgress: { en: 'Your progress', zh: '我的进度' },
  courseProgress: { en: 'Course progress', zh: '课程进度' },
  lessonsCompleted: { en: 'lessons completed', zh: '课已完成' },
  activeTime: { en: 'Active learning time', zh: '有效学习时间' },
  activeTimeNote: {
    en: 'estimate of active app use — not a measure of attention or understanding',
    zh: '仅为应用使用时长估算，不代表专注度或掌握程度',
  },
  wordsLearned: { en: 'words marked mastered', zh: '个生词已掌握' },
  lastActivity: { en: 'Last activity', zh: '最近学习' },
  never: { en: 'not yet', zh: '暂无' },

  // lesson tabs
  tabWords: { en: 'Words', zh: '词语' },
  tabGrammar: { en: 'Grammar', zh: '语法' },
  tabDialogue: { en: 'Dialogue', zh: '会话' },
  tabPractice: { en: 'Practice', zh: '练习' },

  objectives: { en: 'Lesson objectives', zh: '学习目标' },
  conversation: { en: 'Conversation', zh: '会话' },
  vocabulary: { en: 'New Words', zh: '生词' },
  exampleSentences: { en: 'Example sentences', zh: '例句' },
  grammar: { en: 'Grammar', zh: '语法' },
  examples: { en: 'Examples', zh: '例句' },
  example: { en: 'EXAMPLE', zh: '例句' },

  play: { en: 'Play', zh: '播放' },
  playAll: { en: 'Play full dialogue', zh: '连续播放会话' },
  playAllWords: { en: 'Play all words', zh: '连续播放生词' },
  stop: { en: 'Stop', zh: '停止' },
  speed: { en: 'Speed', zh: '速度' },
  globalSpeed: { en: 'Global speed', zh: '全局速度' },
  pinyin: { en: 'Pinyin', zh: '拼音' },
  translation: { en: 'English', zh: '翻译' },
  show: { en: 'Show', zh: '显示' },
  hide: { en: 'Hide', zh: '隐藏' },

  statusNotStarted: { en: 'Not started', zh: '未开始' },
  statusInProgress: { en: 'In progress', zh: '学习中' },
  statusCompleted: { en: 'Completed', zh: '已完成' },
  ready: { en: 'Ready', zh: '已就绪' },
  soon: { en: 'Soon', zh: '制作中' },
  open: { en: 'Open', zh: '打开' },

  markComplete: { en: 'Mark lesson complete', zh: '标记本课完成' },
  unmarkComplete: { en: 'Mark as not complete', zh: '取消完成标记' },
  mastered: { en: 'mastered', zh: '已掌握' },
  markMastered: { en: 'mark mastered', zh: '标记已掌握' },
  keyWord: { en: 'key word', zh: '重点词' },
  keyWords: { en: 'Key words', zh: '重点词' },
  allWords: { en: 'All words', zh: '全部生词' },
  wordsSub: {
    en: 'new words — tap ▶ to hear each word and its example sentence',
    zh: '个生词 —— 点 ▶ 听词语和例句',
  },
  wordsCount: { en: 'words', zh: '个生词' },
  practiceWord: { en: 'Quiz me on this word', zh: '练这个词' },

  listeningChallenge: { en: 'Listening challenge', zh: '听力挑战' },
  listening: { en: 'LISTENING', zh: '听力' },
  listeningHint: {
    en: 'Text hidden — listen first, then reveal.',
    zh: '文本已隐藏 —— 先听，再显示。',
  },
  reveal: { en: 'Reveal text', zh: '显示文本' },

  practice: { en: 'Practice', zh: '练习' },
  practiceSub: {
    en: 'A quick quiz built from this lesson’s words — audio + meaning, both directions',
    zh: '基于本课生词的小测验 —— 听音辨义、看义选字',
  },
  startQuiz: { en: 'Start quiz', zh: '开始测验' },
  quizBest: { en: 'quiz best', zh: '测验最佳' },
  question: { en: 'Question', zh: '第几题' },
  quizListenPrompt: { en: 'What does this word mean?', zh: '这个词是什么意思？' },
  quizMeaningPrompt: { en: 'Which word matches this meaning?', zh: '哪个词是这个意思？' },
  quizResult: { en: 'Result', zh: '成绩' },
  quizRetry: { en: 'Try again', zh: '再试一次' },
  quizBack: { en: 'Back to words', zh: '返回生词' },
  quizNewBest: { en: 'New best score!', zh: '新纪录！' },
  quizNoWords: {
    en: 'This lesson needs at least 4 words for a quiz.',
    zh: '本课生词不足 4 个，无法生成测验。',
  },

  prevLesson: { en: 'Previous lesson', zh: '上一课' },
  nextLesson: { en: 'Next lesson', zh: '下一课' },

  comingSoon: {
    en: 'Content pending — awaiting source PDF',
    zh: '内容整理中 —— 等待课件 PDF',
  },
  unavailableNotice: {
    en: 'This lesson is not available yet. Its content will be added after the official PDFs are processed.',
    zh: '本课内容尚未上线，将在官方 PDF 处理后添加。',
  },
  audioMissing: { en: 'Audio not available yet', zh: '音频尚未生成' },

  localOnlyBadge: { en: 'Saved on this device only', zh: '仅保存在本设备' },
  localOnlyNotice: {
    en: 'Progress is stored locally in your browser. Sign in with the name + access code from your teacher to sync progress to the class spreadsheet.',
    zh: '学习进度目前仅保存在本机浏览器中。使用老师发放的姓名和登录码登录，即可把进度同步到班级表格。',
  },
  syncPendingBadge: { en: 'Waiting to sync…', zh: '等待同步…' },
  syncErrorBadge: { en: 'Sync error — saved locally', zh: '同步失败 — 已保存在本地' },
  syncedBadge: { en: 'Synced', zh: '已同步' },

  // ---- Phase 2: student sign-in (teacher-issued name + access code) --------
  signIn: { en: 'Sign in', zh: '登录' },
  signInTitle: { en: 'Student sign in', zh: '学生登录' },
  signInHelp: {
    en: 'Enter the name and access code your teacher gave you. Your progress will sync to the class spreadsheet.',
    zh: '请输入老师发给你的姓名和登录码，学习进度将同步到班级表格。',
  },
  signInNameLabel: { en: 'Name', zh: '姓名' },
  signInNamePlaceholder: { en: 'As written by your teacher', zh: '与老师登记的姓名一致' },
  signInCodeLabel: { en: 'Access code', zh: '登录码' },
  signInCodePlaceholder: { en: 'e.g. K7M2QP', zh: '例如 K7M2QP' },
  signInSubmit: { en: 'Sign in', zh: '登录' },
  signingIn: { en: 'Signing in…', zh: '正在登录…' },
  signInCancel: { en: 'Cancel', zh: '取消' },
  signInSuccess: {
    en: 'Signed in — your progress now syncs to your teacher',
    zh: '登录成功——进度将同步给老师',
  },
  signInFailed: { en: 'Sign-in failed', zh: '登录失败' },
  signInMigrateQueued: {
    en: 'Your earlier progress on this device will sync shortly',
    zh: '本机先前的学习进度稍后会自动同步',
  },
  signOut: { en: 'Sign out', zh: '退出登录' },
  signedInAs: { en: 'Signed in', zh: '已登录' },
  continueLocally: { en: 'Keep studying on this device only', zh: '暂不登录，仅在本机学习' },

  // ---- Phase 2: mandatory sign-in gate (no access without an account) ----
  signInGateTitle: { en: 'Sign in to start learning', zh: '登录后开始学习' },
  signInGateHelp: {
    en: 'Your teacher gave you a name and an access code. Enter them below — your progress is saved to the class spreadsheet and your teacher can see it.',
    zh: '请输入老师发给你的姓名和登录码。学习进度将保存到班级表格，老师可以查看。',
  },
  signInNetworkError: {
    en: 'Cannot reach the server — check your internet connection and try again.',
    zh: '无法连接服务器——请检查网络连接后重试。',
  },
  signInWaitNote: {
    en: 'Signing in can take a few seconds the first time while the course server wakes up — the ping happens while you type.',
    zh: '首次登录可能需要几秒钟唤醒课程服务器——你输入时服务器已在预热。',
  },

  // ---- Phase 2: student profile page (#/me) ----
  myProgress: { en: 'My progress', zh: '我的进度' },
  coursePercent: { en: 'course complete', zh: '课程完成度' },
  profileLessonByLesson: { en: 'Lesson by lesson', zh: '逐课明细' },
  profileTime: { en: 'Total active time', zh: '总有效学习时间' },
  profileQuizBest: { en: 'Quiz best', zh: '测验最佳' },
  syncedNotice: {
    en: 'Progress syncs to your teacher’s class spreadsheet. The header badge always shows the true sync state.',
    zh: '学习进度将同步到老师的班级表格；顶部徽标实时显示真实的同步状态。',
  },

  learnerId: { en: 'Local learner ID', zh: '本机学习者 ID' },
  words: { en: 'words', zh: '词' },

  howAudio: { en: 'Natural audio & speed', zh: '自然音频与语速' },
  howAudioBody: {
    en: 'Every word, sentence and dialogue line has pre-recorded neural Mandarin audio. Use 0.5×–1.25× to slow down or speed up everything at once.',
    zh: '每个词语、句子和会话句都配有神经网络普通话音频；0.5×–1.25× 全局调速。',
  },
  howToggles: { en: 'Pinyin & English toggles', zh: '拼音与翻译开关' },
  howTogglesBody: {
    en: 'Hide pinyin or translations to test yourself; the layout stays stable while hidden.',
    zh: '可隐藏拼音或翻译自测；隐藏时版面保持不变。',
  },
  howMastered: { en: 'Mastered words & quiz', zh: '掌握标记与测验' },
  howMasteredBody: {
    en: 'Tap “mastered” on a word only when you truly know it — playing audio never counts as learning. The Practice tab quizzes you and keeps your best score.',
    zh: '确实学会后再点“已掌握” —— 播放音频不算学会。练习页提供测验并记录最佳成绩。',
  },
  howProgress: { en: 'Honest progress', zh: '诚实的进度' },
  howProgressBody: {
    en: 'Lesson completion is an explicit action; learning time is only an estimate of active use. Everything stays on this device in Phase 1.',
    zh: '完成本课需手动标记；学习时长仅为使用估算。第一阶段所有数据仅存于本机。',
  },
} satisfies Record<string, BiLabel>;

export type StringKey = keyof typeof S;

/** Render "English · 中文" as a single string. */
export function bi(label: BiLabel): string {
  return `${label.en} · ${label.zh}`;
}
