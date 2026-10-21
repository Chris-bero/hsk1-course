/**
 * Lesson 3 — extracted from 《新HSK教程1》第3课 (New HSK Course 1, Lesson 3).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 3-2 / 3-4 / 3-6 with word-card examples,
 *    text contexts (p4/p18/p32), 小语讲堂 grammar blocks (p15–17, p53),
 *    exercises (p14/p31/p52), classroom activity (p55), tongue twister 3-7 (p56).
 *  - Textbook dialogue pages P10/P12/P14 (provided as screenshots): the three texts.
 *
 * All three grammar cards are the book's own 小语讲堂 content (verbatim
 * definitions + read-aloud lines; the 的 card also covers the omission rule
 * from p17). Read-aloud lines live in `sentences` and are reused by grammar.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson03: Lesson = {
  id: 'hsk1-l03',
  order: 3,
  title: { en: "I'm Chinese", zh: '我是中国人' },
  titlePinyin: 'Wǒ shì Zhōngguó rén',
  objectives: [
    { en: 'The “是” sentence', zh: '“是”字句' },
    { en: 'The structural particle “的”', zh: '结构助词“的”' },
    { en: 'The yes-no question with “吗”', zh: '用“吗”的是非问句' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Work in pairs. Ask and answer questions based on the pictures provided by the teacher, imitating the text.', zh: '两人一组，根据老师给出的图片模仿课文互相问答。' },
    { en: 'Group work: in groups of 3–4, introduce yourselves and your group members; then one group presents to the class.', zh: '多人活动：3~4人一组，互相介绍，然后请一组同学展示。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l03-v01',
      hanzi: '人',
      pinyin: 'rén',
      english: 'human; person',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l03-v01-e01', hanzi: '他是一个好人。', pinyin: 'Tā shì yí gè hǎo rén.', english: 'He is a good person.' },
        { id: 'hsk1-l03-v01-e02', hanzi: '你认识这个人吗？', pinyin: 'Nǐ rènshi zhège rén ma?', english: 'Do you know this person?' },
      ],
    },
    {
      id: 'hsk1-l03-v02',
      hanzi: '的',
      pinyin: 'de',
      english: 'used after an attributive',
      partOfSpeech: 'part.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v02-e01', hanzi: '王老师是他的老师。', pinyin: 'Wáng lǎoshī shì tā de lǎoshī.', english: 'Teacher Wang is his teacher.' },
        { id: 'hsk1-l03-v02-e02', hanzi: '你的名字很好。', pinyin: 'Nǐ de míngzi hěn hǎo.', english: 'Your name is very nice.' },
      ],
    },
    {
      id: 'hsk1-l03-v03',
      hanzi: '中国',
      pinyin: 'Zhōngguó',
      english: 'China',
      partOfSpeech: 'proper n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v03-e01', hanzi: '我是中国人。', pinyin: 'Wǒ shì Zhōngguó rén.', english: 'I am Chinese.' },
        { id: 'hsk1-l03-v03-e02', hanzi: '他在中国学习。', pinyin: 'Tā zài Zhōngguó xuéxí.', english: 'He studies in China.' },
      ],
    },
    {
      id: 'hsk1-l03-v04',
      hanzi: '法国',
      pinyin: 'Fǎguó',
      english: 'France',
      partOfSpeech: 'proper n.',
      examples: [
        { id: 'hsk1-l03-v04-e01', hanzi: '我认识一个法国人。', pinyin: 'Wǒ rènshi yí gè Fǎguó rén.', english: 'I know a French person.' },
        { id: 'hsk1-l03-v04-e02', hanzi: '我是法国学生。', pinyin: 'Wǒ shì Fǎguó xuéshēng.', english: 'I am a French student.' },
      ],
    },
    {
      id: 'hsk1-l03-v05',
      hanzi: '中文',
      pinyin: 'Zhōngwén',
      english: 'Chinese language',
      partOfSpeech: 'proper n.',
      examples: [
        { id: 'hsk1-l03-v05-e01', hanzi: '他中文很好。', pinyin: 'Tā Zhōngwén hěn hǎo.', english: 'His Chinese is very good.' },
        { id: 'hsk1-l03-v05-e02', hanzi: '同学们一起学中文。', pinyin: 'Tóngxuémen yìqǐ xué Zhōngwén.', english: 'The classmates study Chinese together.' },
      ],
    },
    {
      id: 'hsk1-l03-v06',
      hanzi: '她',
      pinyin: 'tā',
      english: 'she; her',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l03-v06-e01', hanzi: '你认识她吗？', pinyin: 'Nǐ rènshi tā ma?', english: 'Do you know her?' },
        { id: 'hsk1-l03-v06-e02', hanzi: '她是英国人。', pinyin: 'Tā shì Yīngguó rén.', english: 'She is British.' },
      ],
    },
    {
      id: 'hsk1-l03-v07',
      hanzi: '这',
      pinyin: 'zhè',
      english: 'this',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l03-v07-e01', hanzi: '这是谁？', pinyin: 'Zhè shì shéi?', english: 'Who is this?' },
        { id: 'hsk1-l03-v07-e02', hanzi: '这个人是我的同学。', pinyin: 'Zhège rén shì wǒ de tóngxué.', english: 'This person is my classmate.' },
      ],
    },
    {
      id: 'hsk1-l03-v08',
      hanzi: '谁',
      pinyin: 'shéi/shuí',
      english: 'who',
      partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        // Same sentence as v07-e01 — ID reused, single audio clip.
        { id: 'hsk1-l03-v07-e01', hanzi: '这是谁？', pinyin: 'Zhè shì shéi?', english: 'Who is this?' },
        { id: 'hsk1-l03-v08-e02', hanzi: '谁认识法国人？', pinyin: 'Shéi rènshi Fǎguó rén?', english: 'Who knows a French person?' },
      ],
    },
    {
      id: 'hsk1-l03-v09',
      hanzi: '女朋友',
      pinyin: 'nǚpéngyou',
      english: 'girlfriend',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v09-e01', hanzi: '她是谁的女朋友？', pinyin: 'Tā shì shéi de nǚpéngyou?', english: 'Whose girlfriend is she?' },
        { id: 'hsk1-l03-v09-e02', hanzi: '他的女朋友很漂亮。', pinyin: 'Tā de nǚpéngyou hěn piàoliang.', english: 'His girlfriend is very pretty.' },
      ],
    },
    {
      id: 'hsk1-l03-v10',
      hanzi: '哪',
      pinyin: 'nǎ',
      english: 'which',
      partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v10-e01', hanzi: '他是哪国人？', pinyin: 'Tā shì nǎ guó rén?', english: 'Which country is he from?' },
        { id: 'hsk1-l03-v10-e02', hanzi: '哪个人是你女朋友？', pinyin: 'Nǎ ge rén shì nǐ nǚpéngyou?', english: 'Which person is your girlfriend?' },
      ],
    },
    {
      id: 'hsk1-l03-v11',
      hanzi: '国',
      pinyin: 'guó',
      english: 'country',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v11-e01', hanzi: '你是哪国人？', pinyin: 'Nǐ shì nǎ guó rén?', english: 'Which country are you from?' },
        { id: 'hsk1-l03-v11-e02', hanzi: '两国学生是朋友。', pinyin: 'Liǎng guó xuéshēng shì péngyou.', english: 'Students of the two countries are friends.' },
      ],
    },
    {
      id: 'hsk1-l03-v12',
      hanzi: '泰国',
      pinyin: 'Tàiguó',
      english: 'Thailand',
      partOfSpeech: 'proper n.',
      examples: [
        { id: 'hsk1-l03-v12-e01', hanzi: '我想去泰国。', pinyin: 'Wǒ xiǎng qù Tàiguó.', english: 'I want to go to Thailand.' },
        { id: 'hsk1-l03-v12-e02', hanzi: '我的女朋友是泰国人。', pinyin: 'Wǒ de nǚpéngyou shì Tàiguó rén.', english: 'My girlfriend is Thai.' },
      ],
    },
    {
      id: 'hsk1-l03-v13',
      hanzi: '喂',
      pinyin: 'wèi',
      english: 'hello; hey (on the phone)',
      partOfSpeech: 'int.',
      examples: [
        { id: 'hsk1-l03-v13-e01', hanzi: '喂，请问是王老师吗？', pinyin: 'Wèi, qǐngwèn shì Wáng lǎoshī ma?', english: 'Hello, is this Teacher Wang?' },
        { id: 'hsk1-l03-v13-e02', hanzi: '喂！你叫什么名字？', pinyin: 'Wèi! Nǐ jiào shénme míngzi?', english: 'Hey! What is your name?' },
      ],
    },
    {
      id: 'hsk1-l03-v14',
      hanzi: '姐姐',
      pinyin: 'jiějie',
      english: 'elder sister',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l03-v14-e01', hanzi: '她姐姐是我同学。', pinyin: 'Tā jiějie shì wǒ tóngxué.', english: 'Her elder sister is my classmate.' },
        { id: 'hsk1-l03-v14-e02', hanzi: '他们没有姐姐。', pinyin: 'Tāmen méiyǒu jiějie.', english: 'They don’t have an elder sister.' },
      ],
    },
    {
      id: 'hsk1-l03-v15',
      hanzi: '工作',
      pinyin: 'gōngzuò',
      english: 'job',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l03-v15-e01', hanzi: '你喜欢什么工作？', pinyin: 'Nǐ xǐhuan shénme gōngzuò?', english: 'What job do you like?' },
        { id: 'hsk1-l03-v15-e02', hanzi: '她的工作很好。', pinyin: 'Tā de gōngzuò hěn hǎo.', english: 'Her job is very good.' },
      ],
    },
    { id: 'hsk1-l03-v16', hanzi: '还', pinyin: 'hái', english: 'still', partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l03-v16-e01', hanzi: '你还忙吗？', pinyin: 'Nǐ hái máng ma?', english: 'Are you still busy?' },
        { id: 'hsk1-l03-v16-e02', hanzi: '她还在泰国吗？', pinyin: 'Tā hái zài Tàiguó ma?', english: 'Is she still in Thailand?' },
      ],
    },
    {
      id: 'hsk1-l03-v17',
      hanzi: '忙',
      pinyin: 'máng',
      english: 'busy',
      partOfSpeech: 'adj.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v17-e01', hanzi: '他的工作很忙。', pinyin: 'Tā de gōngzuò hěn máng.', english: 'His job is very busy.' },
        { id: 'hsk1-l03-v17-e02', hanzi: '我今天不忙。', pinyin: 'Wǒ jīntiān bù máng.', english: 'I am not busy today.' },
      ],
    },
    {
      id: 'hsk1-l03-v18',
      hanzi: '吗',
      pinyin: 'ma',
      english: 'used at the end of a question',
      partOfSpeech: 'part.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v18-e01', hanzi: '你有工作吗？', pinyin: 'Nǐ yǒu gōngzuò ma?', english: 'Do you have a job?' },
        { id: 'hsk1-l03-v18-e02', hanzi: '你认识中国人吗？', pinyin: 'Nǐ rènshi Zhōngguó rén ma?', english: 'Do you know Chinese people?' },
      ],
    },
    {
      id: 'hsk1-l03-v19',
      hanzi: '对',
      pinyin: 'duì',
      english: 'right',
      partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l03-v19-e01', hanzi: '他是中国人吗？对，他是中国人。', pinyin: 'Tā shì Zhōngguó rén ma? Duì, tā shì Zhōngguó rén.', english: 'A: Is he Chinese? B: Right, he is Chinese.' },
      ],
    },
    {
      id: 'hsk1-l03-v20',
      hanzi: '太',
      pinyin: 'tài',
      english: 'too; excessively',
      partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l03-v20-e01', hanzi: '他太忙了。', pinyin: 'Tā tài máng le.', english: 'He is too busy.' },
        { id: 'hsk1-l03-v20-e02', hanzi: '太好了！', pinyin: 'Tài hǎo le!', english: 'Great!' },
      ],
    },
    {
      id: 'hsk1-l03-v21',
      hanzi: '我们',
      pinyin: 'wǒmen',
      english: 'we; us',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l03-v21-e01', hanzi: '我们是同学。', pinyin: 'Wǒmen shì tóngxué.', english: 'We are classmates.' },
        { id: 'hsk1-l03-v21-e02', hanzi: '我们一起去上学。', pinyin: 'Wǒmen yìqǐ qù shàngxué.', english: 'We go to school together.' },
      ],
    },
    {
      id: 'hsk1-l03-v22',
      hanzi: '想',
      pinyin: 'xiǎng',
      english: 'miss',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l03-v22-e01', hanzi: '我想你了。', pinyin: 'Wǒ xiǎng nǐ le.', english: 'I miss you.' },
        { id: 'hsk1-l03-v22-e02', hanzi: '他很想她。', pinyin: 'Tā hěn xiǎng tā.', english: 'He misses her very much.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l03-s01', hanzi: '我是法国人。', pinyin: 'Wǒ shì Fǎguó rén.', english: 'I am French.' },
    { id: 'hsk1-l03-s02', hanzi: '她是中文老师。', pinyin: 'Tā shì Zhōngwén lǎoshī.', english: 'She is a Chinese teacher.' },
    { id: 'hsk1-l03-s03', hanzi: '我老师不是法国人。', pinyin: 'Wǒ lǎoshī bú shì Fǎguó rén.', english: 'My teacher is not French.' },
    { id: 'hsk1-l03-s04', hanzi: '你也很忙吗？', pinyin: 'Nǐ yě hěn máng ma?', english: 'Are you also very busy?' },
    { id: 'hsk1-l03-s05', hanzi: '你是他的中文老师吗？', pinyin: 'Nǐ shì tā de Zhōngwén lǎoshī ma?', english: 'Are you his Chinese teacher?' },
    { id: 'hsk1-l03-s06', hanzi: '你有姐姐吗？', pinyin: 'Nǐ yǒu jiějie ma?', english: 'Do you have an elder sister?' },
  ],
  grammar: [
    {
      id: 'hsk1-l03-g01',
      title: { en: 'The “是” sentence', zh: '“是”字句' },
      focusHanzi: ['是', '不是'],
      structure: 'A + 是 + B',
      structureNegative: 'A + 不是 + B',
      explanation: {
        en: 'From 小语讲堂: the “是” sentence indicates what somebody or something equals or belongs to. The negative form is “不是”.',
        zh: '小语讲堂：“是”字句表示人或事物等同什么或类属什么，否定形式是“不是”。',
      },
      examples: [
        { id: 'hsk1-l03-s01', hanzi: '我是法国人。', pinyin: 'Wǒ shì Fǎguó rén.', english: 'I am French.' },
        { id: 'hsk1-l03-s02', hanzi: '她是中文老师。', pinyin: 'Tā shì Zhōngwén lǎoshī.', english: 'She is a Chinese teacher.' },
        { id: 'hsk1-l03-s03', hanzi: '我老师不是法国人。', pinyin: 'Wǒ lǎoshī bú shì Fǎguó rén.', english: 'My teacher is not French.' },
      ],
    },
    {
      id: 'hsk1-l03-g02',
      title: { en: 'The structural particle “的”', zh: '结构助词“的”' },
      focusHanzi: ['的'],
      structure: '定语 + 的 + 中心语',
      structureNegative: '人称代词 + 的 + 亲属称谓/指人名词 → “的”可省略',
      explanation: {
        en: 'From 小语讲堂: Attributive + 的 + head noun expresses a possessive relationship. With personal pronouns before kinship terms or nouns referring to people, 的 can be omitted (我老师 = 我的老师).',
        zh: '小语讲堂：定语+的+中心语，表示领属关系。人称代词+的+亲属称谓或指人的名词时，“的”可省略（我老师＝我的老师）。',
      },
      examples: [
        { id: 'hsk1-l03-g02-e01', hanzi: '白家月的中文老师', pinyin: 'Bái Jiāyuè de Zhōngwén lǎoshī', english: 'Bai Jiayue’s Chinese teacher' },
        { id: 'hsk1-l03-g02-e02', hanzi: '你的名字', pinyin: 'Nǐ de míngzi', english: 'your name' },
        { id: 'hsk1-l03-g02-e03', hanzi: '我老师', pinyin: 'Wǒ lǎoshī', english: 'my teacher (的 omitted)' },
        { id: 'hsk1-l03-g02-e04', hanzi: '我妈妈', pinyin: 'Wǒ māma', english: 'my mother (的 omitted)' },
      ],
    },
    {
      id: 'hsk1-l03-g03',
      title: { en: 'The yes-no question with “吗”', zh: '用“吗”的是非问句' },
      focusHanzi: ['吗'],
      structure: '句子 + 吗？',
      explanation: {
        en: 'From 小语讲堂: “吗” is a modal particle typically placed at the end of a sentence to indicate a yes-no question.',
        zh: '小语讲堂：“吗”是语气助词，通常在句子末尾，表示疑问。',
      },
      examples: [
        { id: 'hsk1-l03-s04', hanzi: '你也很忙吗？', pinyin: 'Nǐ yě hěn máng ma?', english: 'Are you also very busy?' },
        { id: 'hsk1-l03-s05', hanzi: '你是他的中文老师吗？', pinyin: 'Nǐ shì tā de Zhōngwén lǎoshī ma?', english: 'Are you his Chinese teacher?' },
        { id: 'hsk1-l03-s06', hanzi: '你有姐姐吗？', pinyin: 'Nǐ yǒu jiějie ma?', english: 'Do you have an elder sister?' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l03-d01',
      title: { en: 'Continuing the chat (Text 1)', zh: '继续聊天儿' },
      context: {
        en: 'On campus, Li Wen and Bai Jiayue met for the first time and continued chatting.',
        zh: '在校园里，李文和白家月第一次相遇，两人继续聊天儿。',
      },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l03-d01-01', speakerId: 'A', hanzi: '我是中国人。', pinyin: 'Wǒ shì Zhōngguó rén.', english: 'I am Chinese.' },
        { id: 'hsk1-l03-d01-02', speakerId: 'B', hanzi: '我是法国人。我的中文老师也是中国人。', pinyin: 'Wǒ shì Fǎguó rén. Wǒ de Zhōngwén lǎoshī yě shì Zhōngguó rén.', english: 'I am French. My Chinese teacher is also Chinese.' },
      ],
    },
    {
      id: 'hsk1-l03-d02',
      title: { en: 'Whose photo? (Text 2)', zh: '这是谁？' },
      context: {
        en: 'After class, Annie was looking at the photos on Chen Tianzhong’s cell phone in the classroom.',
        zh: '在教室里，下课后，安妮在看陈天中手机里的照片。',
      },
      speakers: [
        { id: 'A', name: '安妮 Ānnī', voice: 'female' },
        { id: 'B', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l03-d02-01', speakerId: 'A', hanzi: '这是谁？', pinyin: 'Zhè shì shéi?', english: 'Who is this?' },
        { id: 'hsk1-l03-d02-02', speakerId: 'B', hanzi: '这是我女朋友。', pinyin: 'Zhè shì wǒ nǚpéngyou.', english: 'This is my girlfriend.' },
        { id: 'hsk1-l03-d02-03', speakerId: 'A', hanzi: '你女朋友是哪国人？', pinyin: 'Nǐ nǚpéngyou shì nǎ guó rén?', english: 'Which country is your girlfriend from?' },
        { id: 'hsk1-l03-d02-04', speakerId: 'B', hanzi: '她也是泰国人。', pinyin: 'Tā yě shì Tàiguó rén.', english: 'She is also from Thailand.' },
      ],
    },
    {
      id: 'hsk1-l03-d03',
      title: { en: 'A video call home (Text 3)', zh: '视频电话' },
      context: {
        en: 'At home, Wang Yixue was making a video call to Wang Yifei.',
        zh: '在家里，王一雪给王一飞打视频电话。',
      },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '王一飞 Wáng Yīfēi', voice: 'female' },
      ],
      lines: [
        { id: 'hsk1-l03-d03-01', speakerId: 'A', hanzi: '喂，一飞！', pinyin: 'Wèi, Yīfēi!', english: 'Hello? Yifei!' },
        { id: 'hsk1-l03-d03-02', speakerId: 'B', hanzi: '姐姐！', pinyin: 'Jiějie!', english: 'Sister!' },
        { id: 'hsk1-l03-d03-03', speakerId: 'A', hanzi: '你工作还忙吗？', pinyin: 'Nǐ gōngzuò hái máng ma?', english: 'Is your job still busy?' },
        { id: 'hsk1-l03-d03-04', speakerId: 'B', hanzi: '对，还很忙。你也很忙吗？', pinyin: 'Duì, hái hěn máng. Nǐ yě hěn máng ma?', english: 'Yes, still very busy. Are you also very busy?' },
        { id: 'hsk1-l03-d03-05', speakerId: 'A', hanzi: '我不太忙。我们很想你。', pinyin: 'Wǒ bú tài máng. Wǒmen hěn xiǎng nǐ.', english: 'I’m not too busy. We miss you very much.' },
        { id: 'hsk1-l03-d03-06', speakerId: 'B', hanzi: '我也想你们。', pinyin: 'Wǒ yě xiǎng nǐmen.', english: 'I miss you all too.' },
      ],
    },
    {
      id: 'hsk1-l03-d04',
      title: { en: 'Tongue twister (3-7)', zh: '绕口令' },
      context: { en: 'Shadow the tongue twister.', zh: '跟读绕口令。' },
      speakers: [{ id: 'A', name: '小语 Xiǎoyǔ', voice: 'female2' }],
      lines: [
        { id: 'hsk1-l03-d04-01', speakerId: 'A', hanzi: '四是四，十是十。', pinyin: 'Sì shì sì, shí shì shí.', english: 'Four is four. Ten is ten.' },
        { id: 'hsk1-l03-d04-02', speakerId: 'A', hanzi: '十四是十四，四十是四十。', pinyin: 'Shísì shì shísì, sìshí shì sìshí.', english: 'Fourteen is fourteen. Forty is forty.' },
      ],
    },
  ],
};

export default lesson03;
