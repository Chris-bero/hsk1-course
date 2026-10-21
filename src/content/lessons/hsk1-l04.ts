/**
 * Lesson 4 — extracted from 《新HSK教程1》第4课 (New HSK Course 1, Lesson 4).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 4-2 / 4-4 / 4-6 with word-card examples,
 *    text contexts (p5/p15/p39), 小语讲堂 grammar blocks (p13/p14/p37/p38),
 *    exercises (p12/p36/p41), classroom activity (p58).
 *  - Textbook dialogue pages P19/P22/P24 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p16/p40) confirm dialogue
 *    details (e.g. 女儿今年十二岁).
 *
 * All four grammar cards are the book's own 小语讲堂 content. Deviations:
 *  - read-aloud line "我没/没有姐姐" is stored as 我没有姐姐。 (audio-friendly);
 *    the 我没 variant is noted in the English gloss.
 *  - 数字的表达 (p14) points to textbook P20–21 for its tables; the card
 *    carries the book's statement only.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson04: Lesson = {
  id: 'hsk1-l04',
  order: 4,
  title: { en: 'I have two children', zh: '我有两个孩子' },
  titlePinyin: 'Wǒ yǒu liǎng gè háizi',
  objectives: [
    { en: 'The “有” sentence (1)', zh: '“有”字句（1）' },
    { en: 'The “A……, B ne?” structure', zh: 'A……，B呢？' },
    { en: 'Numerals and measure words', zh: '数词、量词' },
    { en: 'Ask and answer about age', zh: '年龄问答' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: How many sons and daughters does Wang Yixue have?', zh: '根据课文内容回答问题：王一雪有几个儿子？几个女儿？' },
    { en: 'Answer according to the text: How old is Wang Yixue’s son?', zh: '根据课文内容回答问题：王一雪儿子今年几岁？' },
    { en: 'Pair work: ask each other about personal and family information (age, number of family members, etc.). Feel free to invent details.', zh: '双人活动：两人一组，互相询问个人和家庭情况（年龄、家庭人口等），可虚拟。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l04-v01',
      hanzi: '有',
      pinyin: 'yǒu',
      english: 'have',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v01-e01', hanzi: '他有女朋友。', pinyin: 'Tā yǒu nǚpéngyou.', english: 'He has a girlfriend.' },
        { id: 'hsk1-l04-v01-e02', hanzi: '你有法国同学吗？', pinyin: 'Nǐ yǒu Fǎguó tóngxué ma?', english: 'Do you have French classmates?' },
      ],
    },
    {
      id: 'hsk1-l04-v02',
      hanzi: '多少',
      pinyin: 'duōshao',
      english: 'how many/much',
      partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v02-e01', hanzi: '你还有多少钱？', pinyin: 'Nǐ hái yǒu duōshao qián?', english: 'How much money do you still have?' },
        { id: 'hsk1-l04-v02-e02', hanzi: '你们学校有多少学生？', pinyin: 'Nǐmen xuéxiào yǒu duōshao xuéshēng?', english: 'How many students are there in your school?' },
      ],
    },
    {
      id: 'hsk1-l04-v03',
      hanzi: '个',
      pinyin: 'gè',
      english: 'a general measure word',
      partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l04-v03-e01', hanzi: '我有一个姐姐。', pinyin: 'Wǒ yǒu yí gè jiějie.', english: 'I have one elder sister.' },
        { id: 'hsk1-l04-v03-e02', hanzi: '他是一个学生。', pinyin: 'Tā shì yí gè xuéshēng.', english: 'He is a student.' },
      ],
    },
    {
      id: 'hsk1-l04-v04',
      hanzi: '哥哥',
      pinyin: 'gēge',
      english: 'elder brother',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v04-e01', hanzi: '他是王老师的哥哥。', pinyin: 'Tā shì Wáng lǎoshī de gēge.', english: 'He is Teacher Wang’s elder brother.' },
        { id: 'hsk1-l04-v04-e02', hanzi: '她哥哥很好。', pinyin: 'Tā gēge hěn hǎo.', english: 'Her elder brother is very nice.' },
      ],
    },
    {
      id: 'hsk1-l04-v05',
      hanzi: '呢',
      pinyin: 'ne',
      english: 'used at the end of a question',
      partOfSpeech: 'part.',
      examples: [
        { id: 'hsk1-l04-v05-e01', hanzi: '我叫陈天中，你呢？', pinyin: 'Wǒ jiào Chén Tiānzhōng, nǐ ne?', english: 'My name is Chen Tianzhong — and you?' },
        { id: 'hsk1-l04-v05-e02', hanzi: '我有三个泰国同学，你呢？', pinyin: 'Wǒ yǒu sān gè Tàiguó tóngxué, nǐ ne?', english: 'I have three Thai classmates — and you?' },
      ],
    },
    {
      id: 'hsk1-l04-v06',
      hanzi: '没有',
      pinyin: 'méiyǒu',
      english: 'not have',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v06-e01', hanzi: '他还没有女朋友。', pinyin: 'Tā hái méiyǒu nǚpéngyou.', english: 'He doesn’t have a girlfriend yet.' },
        // Same sentence as dialogue line d02-02 — ID reused, single clip.
        { id: 'hsk1-l04-d02-02', hanzi: '我没有哥哥。', pinyin: 'Wǒ méiyǒu gēge.', english: 'I don’t have elder brothers.' },
      ],
    },
    {
      id: 'hsk1-l04-v07',
      hanzi: '家',
      pinyin: 'jiā',
      english: 'family',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v07-e01', hanzi: '我家有三口人。', pinyin: 'Wǒ jiā yǒu sān kǒu rén.', english: 'There are three people in my family.' },
        { id: 'hsk1-l04-v07-e02', hanzi: '她家没有狗。', pinyin: 'Tā jiā méiyǒu gǒu.', english: 'Her family doesn’t have a dog.' },
      ],
    },
    {
      id: 'hsk1-l04-v08',
      hanzi: '几',
      pinyin: 'jǐ',
      english: 'how many',
      partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v08-e01', hanzi: '他有几个哥哥？', pinyin: 'Tā yǒu jǐ gè gēge?', english: 'How many elder brothers does he have?' },
        // Same sentence as dialogue line d02-03 — ID reused.
        { id: 'hsk1-l04-d02-03', hanzi: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people are there in your family?' },
      ],
    },
    {
      id: 'hsk1-l04-v09',
      hanzi: '口',
      pinyin: 'kǒu',
      english: 'for family members, knives, etc.',
      partOfSpeech: 'm.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v09-e01', hanzi: '我家有五口人。', pinyin: 'Wǒ jiā yǒu wǔ kǒu rén.', english: 'There are five people in my family.' },
        { id: 'hsk1-l04-d02-03', hanzi: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people are there in your family?' },
      ],
    },
    {
      id: 'hsk1-l04-v10',
      hanzi: '爸爸',
      pinyin: 'bàba',
      english: 'father',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v10-e01', hanzi: '他是白家月的爸爸。', pinyin: 'Tā shì Bái Jiāyuè de bàba.', english: 'He is Bai Jiayue’s father.' },
        { id: 'hsk1-l04-v10-e02', hanzi: '我爸爸的工作很忙。', pinyin: 'Wǒ bàba de gōngzuò hěn máng.', english: 'My father’s job is very busy.' },
      ],
    },
    {
      id: 'hsk1-l04-v11',
      hanzi: '妈妈',
      pinyin: 'māma',
      english: 'mother',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v11-e01', hanzi: '他妈妈在法国。', pinyin: 'Tā māma zài Fǎguó.', english: 'His mother is in France.' },
        { id: 'hsk1-l04-v11-e02', hanzi: '我很想妈妈。', pinyin: 'Wǒ hěn xiǎng māma.', english: 'I miss my mother very much.' },
      ],
    },
    {
      id: 'hsk1-l04-v12',
      hanzi: '妹妹',
      pinyin: 'mèimei',
      english: 'younger sister',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v12-e01', hanzi: '她是我的妹妹。', pinyin: 'Tā shì wǒ de mèimei.', english: 'She is my younger sister.' },
        { id: 'hsk1-l04-v12-e02', hanzi: '他没有妹妹。', pinyin: 'Tā méiyǒu mèimei.', english: 'He doesn’t have a younger sister.' },
      ],
    },
    {
      id: 'hsk1-l04-v13',
      hanzi: '和',
      pinyin: 'hé',
      english: 'and',
      partOfSpeech: 'conj.',
      examples: [
        { id: 'hsk1-l04-v13-e01', hanzi: '我和她是同学。', pinyin: 'Wǒ hé tā shì tóngxué.', english: 'She and I are classmates.' },
        { id: 'hsk1-l04-v13-e02', hanzi: '哥哥和妹妹一起学中文。', pinyin: 'Gēge hé mèimei yìqǐ xué Zhōngwén.', english: 'The elder brother and younger sister study Chinese together.' },
      ],
    },
    {
      id: 'hsk1-l04-v14',
      hanzi: '儿子',
      pinyin: 'érzi',
      english: 'son',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v14-e01', hanzi: '他是李老师的儿子。', pinyin: 'Tā shì Lǐ lǎoshī de érzi.', english: 'He is Teacher Li’s son.' },
        { id: 'hsk1-l04-v14-e02', hanzi: '他是家里的第一个儿子。', pinyin: 'Tā shì jiā lǐ de dì-yí gè érzi.', english: 'He is the first son in the family.' },
      ],
    },
    {
      id: 'hsk1-l04-v15',
      hanzi: '孩子',
      pinyin: 'háizi',
      english: 'children',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v15-e01', hanzi: '我们都是她的孩子。', pinyin: 'Wǒmen dōu shì tā de háizi.', english: 'We are all her children.' },
        { id: 'hsk1-l04-v15-e02', hanzi: '他还是一个孩子。', pinyin: 'Tā hái shì yí gè háizi.', english: 'He is still a child.' },
      ],
    },
    {
      id: 'hsk1-l04-v16',
      hanzi: '女儿',
      pinyin: 'nǚ’ér',
      english: 'daughter',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v16-e01', hanzi: '她喜欢女儿。', pinyin: 'Tā xǐhuan nǚ’ér.', english: 'She likes daughters.' },
        { id: 'hsk1-l04-v16-e02', hanzi: '她是家里的第二个女儿。', pinyin: 'Tā shì jiā lǐ de dì-èr gè nǚ’ér.', english: 'She is the second daughter in the family.' },
      ],
    },
    {
      id: 'hsk1-l04-v17',
      hanzi: '岁',
      pinyin: 'suì',
      english: 'year (of age)',
      partOfSpeech: 'm.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l04-v17-e01', hanzi: '你几岁了？', pinyin: 'Nǐ jǐ suì le?', english: 'How old are you?' },
        { id: 'hsk1-l04-v17-e02', hanzi: '我十岁了。', pinyin: 'Wǒ shí suì le.', english: 'I am ten years old.' },
      ],
    },
    {
      id: 'hsk1-l04-v18',
      hanzi: '他',
      pinyin: 'tā',
      english: 'he; him',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l04-v18-e01', hanzi: '他是你哥哥吗？', pinyin: 'Tā shì nǐ gēge ma?', english: 'Is he your elder brother?' },
        { id: 'hsk1-l04-v18-e02', hanzi: '他是我同学。', pinyin: 'Tā shì wǒ tóngxué.', english: 'He is my classmate.' },
      ],
    },
    {
      id: 'hsk1-l04-v19',
      hanzi: '今年',
      pinyin: 'jīnnián',
      english: 'this year',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l04-v19-e01', hanzi: '今年是2026年。', pinyin: 'Jīnnián shì èr-líng-èr-liù nián.', english: 'This year is 2026.' },
        { id: 'hsk1-l04-v19-e02', hanzi: '今年他还在中国。', pinyin: 'Jīnnián tā hái zài Zhōngguó.', english: 'He is still in China this year.' },
      ],
    },
    {
      id: 'hsk1-l04-v20',
      hanzi: '多',
      pinyin: 'duō',
      english: 'how; to what extent',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l04-v20-e01', hanzi: '你儿子多大？', pinyin: 'Nǐ érzi duō dà?', english: 'How old is your son?' },
        { id: 'hsk1-l04-v20-e02', hanzi: '这件衣服很贵。多贵？500块！', pinyin: 'Zhè jiàn yīfu hěn guì. Duō guì? Wǔbǎi kuài!', english: 'A: This piece of clothing is expensive. B: How expensive? A: 500 yuan!' },
      ],
    },
    {
      id: 'hsk1-l04-v21',
      hanzi: '大',
      pinyin: 'dà',
      english: '(of age) old',
      partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l04-v21-e01', hanzi: '她才两岁大。', pinyin: 'Tā cái liǎng suì dà.', english: 'She is only two years old.' },
        { id: 'hsk1-l04-v21-e02', hanzi: '他姐姐今年多大？', pinyin: 'Tā jiějie jīnnián duō dà?', english: 'How old is his elder sister this year?' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l04-s01', hanzi: '她有二十个学生。', pinyin: 'Tā yǒu èrshí gè xuéshēng.', english: 'She has twenty students.' },
    { id: 'hsk1-l04-s02', hanzi: '她有一个姐姐。', pinyin: 'Tā yǒu yí gè jiějie.', english: 'She has one elder sister.' },
    { id: 'hsk1-l04-s03', hanzi: '我没有姐姐。', pinyin: 'Wǒ méiyǒu jiějie.', english: 'I don’t have elder sisters. (Also: 我没姐姐。)' },
    { id: 'hsk1-l04-s04', hanzi: '我叫白家月，你呢？', pinyin: 'Wǒ jiào Bái Jiāyuè, nǐ ne?', english: 'My name is Bai Jiayue — and you?' },
    { id: 'hsk1-l04-s05', hanzi: '我是中国人，你呢？', pinyin: 'Wǒ shì Zhōngguó rén, nǐ ne?', english: 'I am Chinese — and you?' },
  ],
  grammar: [
    {
      id: 'hsk1-l04-g01',
      title: { en: 'The “有” sentence (1)', zh: '“有”字句（1）' },
      focusHanzi: ['有', '没有'],
      structure: 'A + 有 + B',
      structureNegative: 'A + 没/没有 + B',
      explanation: {
        en: 'From 小语讲堂: in this lesson “有” indicates possession. Its negative form is “没/没有”.',
        zh: '小语讲堂：本课“有”表示领有，否定形式为“没/没有”。',
      },
      examples: [
        { id: 'hsk1-l04-s01', hanzi: '她有二十个学生。', pinyin: 'Tā yǒu èrshí gè xuéshēng.', english: 'She has twenty students.' },
        { id: 'hsk1-l04-s02', hanzi: '她有一个姐姐。', pinyin: 'Tā yǒu yí gè jiějie.', english: 'She has one elder sister.' },
        { id: 'hsk1-l04-s03', hanzi: '我没有姐姐。', pinyin: 'Wǒ méiyu jiějie.', english: 'I don’t have elder sisters.' },
      ],
    },
    {
      id: 'hsk1-l04-g02',
      title: { en: 'Expression of numbers', zh: '数字的表达' },
      explanation: {
        en: 'From 小语讲堂: in Chinese, numbers can be written in two forms — Arabic numerals (e.g. “1”) and Chinese characters (e.g. “一”). Covers 0–99, from 100 (inclusive) to 10,000, and the special readings of “2”. Full tables: textbook P20–21.',
        zh: '小语讲堂：汉语中，数字有阿拉伯数字和汉字两种写法，例如“1”和“一”。包括0~99的写法和读法、“百”以上（含）“万”以内数字的写法与读法、“2”的写法和读法。详见课本P20—21。',
      },
    },
    {
      id: 'hsk1-l04-g03',
      title: { en: 'Nominal measure words and the [Num+M+(N)] structure', zh: '名量词和名量结构' },
      focusHanzi: ['口', '个'],
      structure: '数词 + 量词（口、个……）+（名词）',
      explanation: {
        en: 'From 小语讲堂: when expressing quantity, a Chinese numeral is generally followed by a measure word. Nominal measure words: 口, 个… The [Num+M+(N)] structure: 四口人, 两个哥哥…',
        zh: '小语讲堂：表达数量时，汉语数词后一般要带量词。名量词：口、个……名量结构：四口人、两个哥哥……',
      },
      examples: [
        { id: 'hsk1-l04-g03-e01', hanzi: '四口', pinyin: 'sì kǒu', english: 'four (family members)’s worth' },
        { id: 'hsk1-l04-g03-e02', hanzi: '四口人', pinyin: 'sì kǒu rén', english: 'four people' },
        { id: 'hsk1-l04-g03-e03', hanzi: '两个', pinyin: 'liǎng gè', english: 'two (of them)' },
        { id: 'hsk1-l04-g03-e04', hanzi: '两个学生', pinyin: 'liǎng gè xuéshēng', english: 'two students' },
      ],
    },
    {
      id: 'hsk1-l04-g04',
      title: { en: 'The modal particle “呢” (1)', zh: '语气助词“呢”（1）' },
      focusHanzi: ['呢'],
      structure: 'A……，B呢？',
      explanation: {
        en: 'From 小语讲堂: in this lesson “呢” is used at the end of a sentence to indicate a question, inquiring about the situation mentioned previously.',
        zh: '小语讲堂：本课“呢”在句末，表示疑问，询问上文提到的情况。',
      },
      examples: [
        { id: 'hsk1-l04-d02-01', hanzi: '我有两个哥哥，你呢？', pinyin: 'Wǒ yǒu liǎng gè gēge, nǐ ne?', english: 'I have two elder brothers — and you?' },
        { id: 'hsk1-l04-s04', hanzi: '我叫白家月，你呢？', pinyin: 'Wǒ jiào Bái Jiāyuè, nǐ ne?', english: 'My name is Bai Jiayue — and you?' },
        { id: 'hsk1-l04-s05', hanzi: '我是中国人，你呢？', pinyin: 'Wǒ shì Zhōngguó rén, nǐ ne?', english: 'I am Chinese — and you?' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l04-d01',
      title: { en: 'Chatting at home (Text 1)', zh: '聊天儿' },
      context: {
        en: 'At home, Liu Ming and Wang Yixue were chatting.',
        zh: '在家里，刘明和王一雪在聊天儿。',
      },
      speakers: [
        { id: 'A', name: '刘明 Liú Míng', voice: 'male2' },
        { id: 'B', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
      ],
      lines: [
        { id: 'hsk1-l04-d01-01', speakerId: 'A', hanzi: '一飞忙吗？', pinyin: 'Yīfēi máng ma?', english: 'Is Yifei busy?' },
        { id: 'hsk1-l04-d01-02', speakerId: 'B', hanzi: '她很忙。', pinyin: 'Tā hěn máng.', english: 'She is very busy.' },
        { id: 'hsk1-l04-d01-03', speakerId: 'A', hanzi: '她有多少个学生？', pinyin: 'Tā yǒu duōshao gè xuéshēng?', english: 'How many students does she have?' },
        { id: 'hsk1-l04-d01-04', speakerId: 'B', hanzi: '她有二十个学生。', pinyin: 'Tā yǒu èrshí gè xuéshēng.', english: 'She has twenty students.' },
      ],
    },
    {
      id: 'hsk1-l04-d02',
      title: { en: 'Family members (Text 2)', zh: '家里有几口人' },
      context: {
        en: 'At the company, Wang Yixue and Yang Tongle were chatting during a break.',
        zh: '在公司里，王一雪和杨同乐休息时聊天儿。',
      },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '杨同乐 Yáng Tónglè', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l04-d02-01', speakerId: 'A', hanzi: '我有两个哥哥，你呢？', pinyin: 'Wǒ yǒu liǎng gè gēge, nǐ ne?', english: 'I have two elder brothers — and you?' },
        { id: 'hsk1-l04-d02-02', speakerId: 'B', hanzi: '我没有哥哥。', pinyin: 'Wǒ méiyǒu gēge.', english: 'I don’t have elder brothers.' },
        { id: 'hsk1-l04-d02-03', speakerId: 'A', hanzi: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people are there in your family?' },
        { id: 'hsk1-l04-d02-04', speakerId: 'B', hanzi: '我家有四口人，爸爸、妈妈、妹妹和我。', pinyin: 'Wǒ jiā yǒu sì kǒu rén, bàba, māma, mèimei hé wǒ.', english: 'There are four people in my family: Dad, Mom, my younger sister and me.' },
      ],
    },
    {
      id: 'hsk1-l04-d03',
      title: { en: 'Running into each other (Text 3)', zh: '偶遇' },
      context: {
        en: 'On the street, Wang Yixue ran into Yang Tongle while she was out with her son.',
        zh: '在街上，王一雪带着儿子偶遇杨同乐。',
      },
      speakers: [
        { id: 'A', name: '杨同乐 Yáng Tónglè', voice: 'male' },
        { id: 'B', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
      ],
      lines: [
        { id: 'hsk1-l04-d03-01', speakerId: 'A', hanzi: '这是您儿子吗？', pinyin: 'Zhè shì nín érzi ma?', english: 'Is this your son?' },
        { id: 'hsk1-l04-d03-02', speakerId: 'B', hanzi: '是的。我有两个孩子，一个儿子，一个女儿。', pinyin: 'Shì de. Wǒ yǒu liǎng gè háizi, yí gè érzi, yí gè nǚ’er.', english: 'Yes. I have two children: one son and one daughter.' },
        { id: 'hsk1-l04-d03-03', speakerId: 'A', hanzi: '您儿子几岁？', pinyin: 'Nín érzi jǐ suì?', english: 'How old is your son?' },
        { id: 'hsk1-l04-d03-04', speakerId: 'B', hanzi: '他今年五岁。', pinyin: 'Tā jīnnián wǔ suì.', english: 'He is five this year.' },
        { id: 'hsk1-l04-d03-05', speakerId: 'A', hanzi: '您女儿多大？', pinyin: 'Nín nǚ’ér duō dà?', english: 'How old is your daughter?' },
        { id: 'hsk1-l04-d03-06', speakerId: 'B', hanzi: '她今年十二。', pinyin: 'Tā jīnnián shí’èr.', english: 'She is twelve this year.' },
      ],
    },
  ],
};

export default lesson04;
