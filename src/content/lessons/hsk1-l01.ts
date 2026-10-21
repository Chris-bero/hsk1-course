/**
 * Lesson 1 — extracted from 《新HSK教程1》第1课 (New HSK Course 1, Lesson 1).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 1-2 / 1-4 / 1-6 with example sentences
 *    from the word cards, text contexts (p4/p10/p24), exercises (p23/p33),
 *    tongue twister 1-7 (p34).
 *  - Textbook dialogue pages P1–P3 (provided as screenshots): the three texts.
 *
 * Grammar note: this PDF contains no standalone 语法/注释 section. The two
 * grammar cards below are derived strictly from the book's own material
 * (word-card definitions of 您 / 们 and the lesson objectives) and use only
 * the book's own example sentences. Replace them if the print textbook's
 * grammar notes become available.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson01: Lesson = {
  id: 'hsk1-l01',
  order: 1,
  title: { en: 'Hello, AI Xiaoyu!', zh: 'AI小语，你好！' },
  titlePinyin: 'AI Xiǎoyǔ, nǐ hǎo!',
  objectives: [
    { en: 'Greetings, thanks, and farewells', zh: '打招呼、致谢、告别' },
    { en: 'Chinese communication etiquette; “您”', zh: '中文交际礼仪；“您”' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs or groups and have a dialogue using your real names.', zh: '两人或多人一组，用真实姓名对话。' },
    { en: 'Work in pairs and have a dialogue using each other’s names.', zh: '两人一组，用对方的名字对话。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l01-v01',
      hanzi: '你好',
      pinyin: 'nǐ hǎo',
      english: 'hello',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v01-e01', hanzi: '你好，王老师！', pinyin: 'Nǐ hǎo, Wáng lǎoshī!', english: 'Hello, Ms. Wang!' },
        { id: 'hsk1-l01-v01-e02', hanzi: '同学，你好！', pinyin: 'Tóngxué, nǐ hǎo!', english: 'Hello, classmate!' },
      ],
    },
    {
      id: 'hsk1-l01-v02',
      hanzi: '王老师',
      pinyin: 'Wáng lǎoshī',
      english: 'Ms. Wang (surname 王 + 老师 teacher)',
      partOfSpeech: 'proper n.',
      examples: [
        // Same sentence as v01-e01 — ID reused, so the audio clip exists once.
        { id: 'hsk1-l01-v01-e01', hanzi: '你好，王老师！', pinyin: 'Nǐ hǎo, Wáng lǎoshī!', english: 'Hello, Ms. Wang!' },
      ],
    },
    { id: 'hsk1-l01-v03', hanzi: '请问', pinyin: 'qǐngwèn', english: 'excuse me', partOfSpeech: 'v.' },
    {
      id: 'hsk1-l01-v04',
      hanzi: '大家',
      pinyin: 'dàjiā',
      english: 'everybody',
      partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v04-e01', hanzi: '大家好！', pinyin: 'Dàjiā hǎo!', english: 'Hello, everybody!' },
        { id: 'hsk1-l01-v04-e02', hanzi: '谢谢大家！', pinyin: 'Xièxie dàjiā!', english: 'Thank you, everybody!' },
      ],
    },
    {
      id: 'hsk1-l01-v05',
      hanzi: '好',
      pinyin: 'hǎo',
      english: 'good; fine',
      partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l01-v05-e01', hanzi: '他学习很好。', pinyin: 'Tā xuéxí hěn hǎo.', english: 'His studies are very good.' },
        { id: 'hsk1-l01-v05-e02', hanzi: '我中文不好。', pinyin: 'Wǒ Zhōngwén bù hǎo.', english: 'My Chinese is not good.' },
      ],
    },
    {
      id: 'hsk1-l01-v06',
      hanzi: '学生',
      pinyin: 'xuéshēng',
      english: 'student',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l01-v06-e01', hanzi: '他是李老师的学生。', pinyin: 'Tā shì Lǐ lǎoshī de xuéshēng.', english: 'He is Teacher Li’s student.' },
        { id: 'hsk1-l01-v06-e02', hanzi: '你们学校有多少学生？', pinyin: 'Nǐmen xuéxiào yǒu duōshao xuéshēng?', english: 'How many students are there in your school?' },
      ],
    },
    {
      id: 'hsk1-l01-v07',
      hanzi: '们',
      pinyin: 'men',
      english: 'used after a personal pronoun or a noun to show plural number',
      partOfSpeech: 'suf.',
      examples: [
        { id: 'hsk1-l01-v07-e01', hanzi: '你们好吗？', pinyin: 'Nǐmen hǎo ma?', english: 'Are you all well?' },
        { id: 'hsk1-l01-v07-e02', hanzi: '他们正在上课。', pinyin: 'Tāmen zhèngzài shàngkè.', english: 'They are having class.' },
      ],
    },
    {
      id: 'hsk1-l01-v08',
      hanzi: '老师',
      pinyin: 'lǎoshī',
      english: 'teacher',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v08-e01', hanzi: '他是老师。', pinyin: 'Tā shì lǎoshī.', english: 'He is a teacher.' },
        { id: 'hsk1-l01-v08-e02', hanzi: '她是我的中文老师。', pinyin: 'Tā shì wǒ de Zhōngwén lǎoshī.', english: 'She is my Chinese teacher.' },
      ],
    },
    {
      id: 'hsk1-l01-v09',
      hanzi: '您',
      pinyin: 'nín',
      english: 'you (polite)',
      partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v09-e01', hanzi: '您好！', pinyin: 'Nín hǎo!', english: 'Hello! (polite)' },
        { id: 'hsk1-l01-v09-e02', hanzi: '您去哪儿？', pinyin: 'Nín qù nǎr?', english: 'Where are you going?' },
        { id: 'hsk1-l01-v09-e03', hanzi: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!', english: 'Hello, teacher! (polite)' },
      ],
    },
    {
      id: 'hsk1-l01-v10',
      hanzi: '你们',
      pinyin: 'nǐmen',
      english: '(plural) you',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l01-v10-e01', hanzi: '谢谢你们。', pinyin: 'Xièxie nǐmen.', english: 'Thank you (all).' },
        { id: 'hsk1-l01-v10-e02', hanzi: '你们是哪里人？', pinyin: 'Nǐmen shì nǎlǐ rén?', english: 'Where are you (all) from?' },
      ],
    },
    {
      id: 'hsk1-l01-v11',
      hanzi: '谢谢',
      pinyin: 'xièxie',
      english: 'thank you',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v11-e01', hanzi: '谢谢你！', pinyin: 'Xièxie nǐ!', english: 'Thank you!' },
        // Same sentence as v04-e02 — ID reused, single audio clip.
        { id: 'hsk1-l01-v04-e02', hanzi: '谢谢大家！', pinyin: 'Xièxie dàjiā!', english: 'Thank you, everybody!' },
      ],
    },
    {
      id: 'hsk1-l01-v12',
      hanzi: '不客气',
      pinyin: 'bú kèqi',
      english: 'you’re welcome',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v12-e01', hanzi: '谢谢！不客气！', pinyin: 'Xièxie! Bú kèqi!', english: 'A: Thank you! B: You’re welcome!' },
      ],
    },
    {
      id: 'hsk1-l01-v13',
      hanzi: '同学',
      pinyin: 'tóngxué',
      english: 'classmate',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l01-v13-e01', hanzi: '同学们好！', pinyin: 'Tóngxuémen hǎo!', english: 'Hello, classmates!' },
        { id: 'hsk1-l01-v13-e02', hanzi: '我和他是同学。', pinyin: 'Wǒ hé tā shì tóngxué.', english: 'He and I are classmates.' },
      ],
    },
    {
      id: 'hsk1-l01-v14',
      hanzi: '再见',
      pinyin: 'zàijiàn',
      english: 'goodbye',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l01-v14-e01', hanzi: '再见，明天见！', pinyin: 'Zàijiàn, míngtiān jiàn!', english: 'Goodbye, see you tomorrow!' },
        { id: 'hsk1-l01-v14-e02', hanzi: '我下班了，再见。', pinyin: 'Wǒ xiàbān le, zàijiàn.', english: 'I’m off work — goodbye.' },
      ],
    },
  ],
  sentences: [],
  grammar: [
    {
      id: 'hsk1-l01-g01',
      title: {
        en: 'Greetings: 你好 / 您好 / 你们好 / 大家好',
        zh: '打招呼：你好 / 您好 / 你们好 / 大家好',
      },
      focusHanzi: '好',
      structure: '你 / 您 / 你们 / 大家 + 好',
      explanation: {
        en: 'The greeting changes with the addressee: 你好 for peers, 您好 with the polite “您” for teachers and elders, 你们好 to a group you address, 大家好 to everybody. Choosing 您好 shows respect — a core point of Chinese communication etiquette (lesson objective).',
        zh: '问候语随对象变化：对同辈用“你好”；对老师、长辈用敬称“您”，说“您好”；对多人用“你们好”；对所有人用“大家好”。选择“您”表示尊重，是中文交际礼仪（本课目标）。',
      },
      examples: [
        { id: 'hsk1-l01-v01-e01', hanzi: '你好，王老师！', pinyin: 'Nǐ hǎo, Wáng lǎoshī!', english: 'Hello, Ms. Wang!' },
        { id: 'hsk1-l01-v09-e03', hanzi: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!', english: 'Hello, teacher! (polite)' },
        { id: 'hsk1-l01-v04-e01', hanzi: '大家好！', pinyin: 'Dàjiā hǎo!', english: 'Hello, everybody!' },
      ],
    },
    {
      id: 'hsk1-l01-g02',
      title: { en: 'The plural suffix 们', zh: '复数后缀“们”' },
      focusHanzi: '们',
      structure: 'pronoun / noun + 们',
      explanation: {
        en: 'Per the book’s word note: 们 is used after a personal pronoun or a noun to show plural number — 你们 (you, plural), 我们 (we), 他们 (they), 同学们 (classmates).',
        zh: '按本课生词注释：“们”用在人称代词或名词后面，表示复数——你们、我们、他们、同学们。',
      },
      examples: [
        { id: 'hsk1-l01-v07-e01', hanzi: '你们好吗？', pinyin: 'Nǐmen hǎo ma?', english: 'Are you all well?' },
        { id: 'hsk1-l01-v07-e02', hanzi: '他们正在上课。', pinyin: 'Tāmen zhèngzài shàngkè.', english: 'They are having class.' },
        { id: 'hsk1-l01-v13-e01', hanzi: '同学们好！', pinyin: 'Tóngxuémen hǎo!', english: 'Hello, classmates!' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l01-d01',
      title: { en: 'Greetings (Text 1)', zh: '打招呼' },
      context: {
        en: 'On the first day of school, in the office, Wang Yifei was greeting the AI assistant Xiaoyu.',
        zh: '开学第一天，在办公室里，王一飞和AI助教小语打招呼。',
      },
      speakers: [
        { id: 'A', name: '王一飞 Wáng Yīfēi', voice: 'female' },
        { id: 'B', name: '小语 Xiǎoyǔ', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l01-d01-01', speakerId: 'A', hanzi: 'AI小语，你好！', pinyin: 'AI Xiǎoyǔ, nǐ hǎo!', english: 'Hello, AI Xiaoyu!' },
        { id: 'hsk1-l01-d01-02', speakerId: 'B', hanzi: '王老师，你好！', pinyin: 'Wáng lǎoshī, nǐ hǎo!', english: 'Hello, Ms. Wang!' },
      ],
    },
    {
      id: 'hsk1-l01-d02',
      title: { en: 'Learning greetings (Text 2)', zh: '学习打招呼用语' },
      context: {
        en: 'On the first day of school, in class, the students were learning greeting expressions.',
        zh: '开学第一天，课堂上，学生们学习打招呼用语。',
      },
      speakers: [
        { id: 'A', name: '王一飞 Wáng Yīfēi', voice: 'female' },
        { id: 'B', name: '学生们 xuéshēngmen', voice: 'male' },
        { id: 'C', name: '小语 Xiǎoyǔ', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l01-d02-01', speakerId: 'A', hanzi: '大家好！', pinyin: 'Dàjiā hǎo!', english: 'Hello, everybody!' },
        { id: 'hsk1-l01-d02-02', speakerId: 'B', hanzi: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!', english: 'Hello, teacher! (polite)' },
        { id: 'hsk1-l01-d02-03', speakerId: 'C', hanzi: '你们好！', pinyin: 'Nǐmen hǎo!', english: 'Hello, you all!' },
        { id: 'hsk1-l01-d02-04', speakerId: 'B', hanzi: '你好，小语！', pinyin: 'Nǐ hǎo, Xiǎoyǔ!', english: 'Hello, Xiaoyu!' },
      ],
    },
    {
      id: 'hsk1-l01-d03',
      title: { en: 'Thanks and farewells (Text 3)', zh: '致谢与告别' },
      context: {
        en: 'On the first day of school, in class, the students were learning expressions of gratitude and farewell.',
        zh: '开学第一天，课堂上，学生们学习致谢语、告别语。',
      },
      speakers: [
        { id: 'A', name: '学生们 xuéshēngmen', voice: 'male' },
        { id: 'B', name: '小语 Xiǎoyǔ', voice: 'female2' },
        { id: 'C', name: '王一飞 Wáng Yīfēi', voice: 'female' },
      ],
      lines: [
        { id: 'hsk1-l01-d03-01', speakerId: 'A', hanzi: '谢谢！', pinyin: 'Xièxie!', english: 'Thank you!' },
        { id: 'hsk1-l01-d03-02', speakerId: 'B', hanzi: '不客气！', pinyin: 'Bú kèqi!', english: 'You’re welcome!' },
        { id: 'hsk1-l01-d03-03', speakerId: 'C', hanzi: '同学们，再见！', pinyin: 'Tóngxuémen, zàijiàn!', english: 'Goodbye, classmates!' },
        { id: 'hsk1-l01-d03-04', speakerId: 'A', hanzi: '老师，再见！', pinyin: 'Lǎoshī, zàijiàn!', english: 'Goodbye, teacher!' },
      ],
    },
    {
      id: 'hsk1-l01-d04',
      title: { en: 'Tongue twister (1-7)', zh: '绕口令' },
      context: { en: 'Shadow the tongue twister.', zh: '跟读绕口令。' },
      speakers: [{ id: 'A', name: '小语 Xiǎoyǔ', voice: 'female2' }],
      lines: [
        { id: 'hsk1-l01-d04-01', speakerId: 'A', hanzi: '妈种麻，我放马。', pinyin: 'Mā zhòng má, wǒ fàng mǎ.', english: 'Mom plants flax. I tend the horse.' },
        { id: 'hsk1-l01-d04-02', speakerId: 'A', hanzi: '马吃麻，妈骂马。', pinyin: 'Mǎ chī má, mā mà mǎ.', english: 'The horse eats the flax. Mom scolds the horse.' },
      ],
    },
  ],
};

export default lesson01;
