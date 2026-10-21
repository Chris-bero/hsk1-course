/**
 * Lesson 5 — extracted from 《新HSK教程1》第5课 (New HSK Course 1, Lesson 5).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 5-2 / 5-4 / 5-6 with word-card examples,
 *    text contexts (p5/p24/p40), 小语讲堂 grammar blocks (p22/p23/p39),
 *    exercises (p21/p38/p42), classroom game (p56).
 *  - Textbook dialogue pages P28/P30/P32 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p25/p41) corroborate the dialogues.
 *
 * All three grammar cards are the book's own 小语讲堂 content. The 星期日/星期天
 * cards share identical examples in the book — IDs reused (single clips).
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson05: Lesson = {
  id: 'hsk1-l05',
  order: 5,
  title: { en: "I'm off today", zh: '今天我休息' },
  titlePinyin: 'Jīntiān wǒ xiūxi',
  objectives: [
    { en: 'Dates', zh: '日期' },
    { en: 'The modal verb “会”', zh: '能愿动词“会”' },
    { en: 'Nominal-predicate sentences', zh: '名词谓语句' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: How is Yang Tongle’s new computer?', zh: '根据课文内容回答问题：杨同乐的新电脑怎么样？' },
    { en: 'Answer according to the text: Does Yang Tongle like his new computer?', zh: '根据课文内容回答问题：杨同乐喜欢他的新电脑吗？' },
    { en: 'Group game: one student holds word cards and asks whether the others can do the actions; the others race to answer, and the one with the fewest answers becomes the next questioner.', zh: '小组游戏：一个人拿着词语卡片，询问其他人会不会做这件事，其他人抢答。抢答最少者成为下一轮的提问者。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l05-v01',
      hanzi: '今天',
      pinyin: 'jīntiān',
      english: 'today',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v01-e01', hanzi: '我今天很高兴。', pinyin: 'Wǒ jīntiān hěn gāoxìng.', english: 'I am very happy today.' },
        { id: 'hsk1-l05-v01-e02', hanzi: '今天他来找我。', pinyin: 'Jīntiān tā lái zhǎo wǒ.', english: 'He is coming to see me today.' },
      ],
    },
    {
      id: 'hsk1-l05-v02',
      hanzi: '号',
      pinyin: 'hào',
      english: 'date',
      partOfSpeech: 'm.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v02-e01', hanzi: '我们3月1号上课。', pinyin: 'Wǒmen sān yuè yī hào shàngkè.', english: 'We have class on March 1st.' },
        { id: 'hsk1-l05-v02-e02', hanzi: '你几号上班？', pinyin: 'Nǐ jǐ hào shàngbān?', english: 'What date do you start work?' },
      ],
    },
    {
      id: 'hsk1-l05-v03',
      hanzi: '月',
      pinyin: 'yuè',
      english: 'month',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l05-v03-e01', hanzi: '今天是2026年3月6日。', pinyin: 'Jīntiān shì èr-líng-èr-liù nián sān yuè liù rì.', english: 'Today is March 6, 2026.' },
        { id: 'hsk1-l05-v03-e02', hanzi: '我工作了三个月。', pinyin: 'Wǒ gōngzuò le sān gè yuè.', english: 'I worked for three months.' },
      ],
    },
    {
      id: 'hsk1-l05-v04',
      hanzi: '日',
      pinyin: 'rì',
      english: 'day',
      partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l05-v04-e01', hanzi: '明天是9月7日。', pinyin: 'Míngtiān shì jiǔ yuè qī rì.', english: 'Tomorrow is September 7.' },
      ],
    },
    {
      id: 'hsk1-l05-v05',
      hanzi: '星期',
      pinyin: 'xīngqī',
      english: 'week',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v05-e01', hanzi: '今天星期几？', pinyin: 'Jīntiān xīngqī jǐ?', english: 'What day of the week is it today?' },
        { id: 'hsk1-l05-v05-e02', hanzi: '她要去美国两个星期。', pinyin: 'Tā yào qù Měiguó liǎng gè xīngqī.', english: 'She is going to the US for two weeks.' },
      ],
    },
    {
      id: 'hsk1-l05-v06',
      hanzi: '星期日',
      pinyin: 'Xīngqīrì',
      english: 'Sunday',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l05-v06-e01', hanzi: '星期天我不上学。', pinyin: 'Xīngqītiān wǒ bú shàngxué.', english: 'I don’t go to school on Sundays.' },
        { id: 'hsk1-l05-v06-e02', hanzi: '星期天我和妹妹在家里玩。', pinyin: 'Xīngqītiān wǒ hé mèimei zài jiā lǐ wán.', english: 'On Sundays my younger sister and I play at home.' },
      ],
    },
    {
      id: 'hsk1-l05-v07',
      hanzi: '星期天',
      pinyin: 'Xīngqītiān',
      english: 'Sunday',
      partOfSpeech: 'n.',
      examples: [
        // Book card shares the same examples as 星期日 — IDs reused.
        { id: 'hsk1-l05-v06-e01', hanzi: '星期天我不上学。', pinyin: 'Xīngqītiān wǒ bú shàngxué.', english: 'I don’t go to school on Sundays.' },
        { id: 'hsk1-l05-v06-e02', hanzi: '星期天我和妹妹在家里玩。', pinyin: 'Xīngqītiān wǒ hé mèimei zài jiā lǐ wán.', english: 'On Sundays my younger sister and I play at home.' },
      ],
    },
    {
      id: 'hsk1-l05-v08',
      hanzi: '休息',
      pinyin: 'xiūxi',
      english: 'have a rest',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v08-e01', hanzi: '星期天我休息。', pinyin: 'Xīngqītiān wǒ xiūxi.', english: 'I rest on Sundays.' },
        { id: 'hsk1-l05-v08-e02', hanzi: '他想好好休息一下。', pinyin: 'Tā xiǎng hǎohao xiūxi yíxià.', english: 'He wants to have a good rest.' },
      ],
    },
    {
      id: 'hsk1-l05-v09',
      hanzi: '会',
      pinyin: 'huì',
      english: 'can; be able to',
      partOfSpeech: 'mod.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v09-e01', hanzi: '我会说中文。', pinyin: 'Wǒ huì shuō Zhōngwén.', english: 'I can speak Chinese.' },
        { id: 'hsk1-l05-v09-e02', hanzi: '他会写字。', pinyin: 'Tā huì xiězì.', english: 'He can write characters.' },
      ],
    },
    {
      id: 'hsk1-l05-v10',
      hanzi: '做饭',
      pinyin: 'zuò fàn',
      english: 'cook',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v10-e01', hanzi: '我们都会做饭。', pinyin: 'Wǒmen dōu huì zuò fàn.', english: 'We can all cook.' },
        { id: 'hsk1-l05-v10-e02', hanzi: '我喜欢做饭。', pinyin: 'Wǒ xǐhuan zuò fàn.', english: 'I like cooking.' },
      ],
    },
    {
      id: 'hsk1-l05-v11',
      hanzi: '做',
      pinyin: 'zuò',
      english: 'make; produce',
      partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l05-v11-e01', hanzi: '我做了三个菜。', pinyin: 'Wǒ zuò le sān gè cài.', english: 'I made three dishes.' },
        { id: 'hsk1-l05-v11-e02', hanzi: '今天做什么吃？', pinyin: 'Jīntiān zuò shénme chī?', english: 'What shall we make to eat today?' },
      ],
    },
    {
      id: 'hsk1-l05-v12',
      hanzi: '面条儿',
      pinyin: 'miàntiáor',
      english: 'noodles',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l05-v12-e01', hanzi: '我喜欢吃面条儿。', pinyin: 'Wǒ xǐhuan chī miàntiáor.', english: 'I like eating noodles.' },
        { id: 'hsk1-l05-v12-e02', hanzi: '妈妈今天做面条儿。', pinyin: 'Māma jīntiān zuò miàntiáor.', english: 'Mom is making noodles today.' },
      ],
    },
    {
      id: 'hsk1-l05-v13',
      hanzi: '饺子',
      pinyin: 'jiǎozi',
      english: 'jiaozi',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l05-v13-e01', hanzi: '饺子很好吃。', pinyin: 'Jiǎozi hěn hǎochī.', english: 'Jiaozi are very tasty.' },
        { id: 'hsk1-l05-v13-e02', hanzi: '很多中国人喜欢吃饺子。', pinyin: 'Hěn duō Zhōngguó rén xǐhuan chī jiǎozi.', english: 'Many Chinese people like eating jiaozi.' },
      ],
    },
    {
      id: 'hsk1-l05-v14',
      hanzi: '一些',
      pinyin: 'yìxiē',
      english: 'some',
      partOfSpeech: 'num.-m.',
      examples: [
        { id: 'hsk1-l05-v14-e01', hanzi: '今天做的一些菜我很喜欢吃。', pinyin: 'Jīntiān zuò de yìxiē cài wǒ hěn xǐhuan chī.', english: 'I really like eating some of the dishes made today.' },
        { id: 'hsk1-l05-v14-e02', hanzi: '一些人喜欢饺子也喜欢面条儿。', pinyin: 'Yìxiē rén xǐhuan jiǎozi yě xǐhuan miàntiáor.', english: 'Some people like jiaozi and also like noodles.' },
      ],
    },
    {
      id: 'hsk1-l05-v15',
      hanzi: '菜',
      pinyin: 'cài',
      english: 'dish; course',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l05-v15-e01', hanzi: '她想学做菜。', pinyin: 'Tā xiǎng xué zuò cài.', english: 'She wants to learn to cook dishes.' },
        { id: 'hsk1-l05-v15-e02', hanzi: '我爸爸喜欢吃我妈妈做的菜。', pinyin: 'Wǒ bàba xǐhuan chī wǒ māma zuò de cài.', english: 'My father likes eating the dishes my mother makes.' },
      ],
    },
    {
      id: 'hsk1-l05-v16',
      hanzi: '下班',
      pinyin: 'xiàbān',
      english: 'get off work',
      partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l05-v16-e01', hanzi: '下班了我可以休息。', pinyin: 'Xiàbān le wǒ kěyǐ xiūxi.', english: 'After work I can rest.' },
        { id: 'hsk1-l05-v16-e02', hanzi: '她六点下班。', pinyin: 'Tā liù diǎn xiàbān.', english: 'She gets off work at six.' },
      ],
    },
    {
      id: 'hsk1-l05-v17',
      hanzi: '新',
      pinyin: 'xīn',
      english: 'new',
      partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l05-v17-e01', hanzi: '我买了一件新衣服。', pinyin: 'Wǒ mǎi le yí jiàn xīn yīfu.', english: 'I bought a new piece of clothing.' },
        { id: 'hsk1-l05-v17-e02', hanzi: '明天是新的一天。', pinyin: 'Míngtiān shì xīn de yì tiān.', english: 'Tomorrow is a new day.' },
      ],
    },
    {
      id: 'hsk1-l05-v18',
      hanzi: '电脑',
      pinyin: 'diànnǎo',
      english: 'computer',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v18-e01', hanzi: '我想要一个新电脑。', pinyin: 'Wǒ xiǎng yào yí gè xīn diànnǎo.', english: 'I want a new computer.' },
        { id: 'hsk1-l05-v18-e02', hanzi: '这个电脑非常贵。', pinyin: 'Zhège diànnǎo fēicháng guì.', english: 'This computer is very expensive.' },
      ],
    },
    {
      id: 'hsk1-l05-v19',
      hanzi: '真',
      pinyin: 'zhēn',
      english: 'really; truly',
      partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l05-v19-e01', hanzi: '这个菜真好吃！', pinyin: 'Zhège cài zhēn hǎochī!', english: 'This dish is really delicious!' },
        { id: 'hsk1-l05-v19-e02', hanzi: '那个同学真漂亮！', pinyin: 'Nàge tóngxué zhēn piàoliang!', english: 'That classmate is really pretty!' },
      ],
    },
    {
      id: 'hsk1-l05-v20',
      hanzi: '好看',
      pinyin: 'hǎokàn',
      english: 'good-looking; nice',
      partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l05-v20-e01', hanzi: '这件新衣服真好看！', pinyin: 'Zhè jiàn xīn yīfu zhēn hǎokàn!', english: 'This new piece of clothing is really nice!' },
        { id: 'hsk1-l05-v20-e02', hanzi: '这本书很好看。', pinyin: 'Zhè běn shū hěn hǎokàn.', english: 'This book is very good.' },
      ],
    },
    {
      id: 'hsk1-l05-v21',
      hanzi: '喜欢',
      pinyin: 'xǐhuan',
      english: 'like',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l05-v21-e01', hanzi: '他很喜欢李老师。', pinyin: 'Tā hěn xǐhuan Lǐ lǎoshī.', english: 'He likes Teacher Li very much.' },
        { id: 'hsk1-l05-v21-e02', hanzi: '我喜欢玩电脑。', pinyin: 'Wǒ xǐhuan wán diànnǎo.', english: 'I like using the computer.' },
      ],
    },
    {
      id: 'hsk1-l05-v22',
      hanzi: '它',
      pinyin: 'tā',
      english: 'it',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l05-v22-e01', hanzi: '你的猫喜欢吃什么？它喜欢吃鱼。', pinyin: 'Nǐ de māo xǐhuan chī shénme? Tā xǐhuan chī yú.', english: 'A: What does your cat like eating? B: It likes eating fish.' },
        { id: 'hsk1-l05-v22-e02', hanzi: '它是一只漂亮的小狗。', pinyin: 'Tā shì yì zhī piàoliang de xiǎo gǒu.', english: 'It is a pretty little dog.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l05-s01', hanzi: '今天5月1号。', pinyin: 'Jīntiān wǔ yuè yī hào.', english: 'Today is May 1st.' },
    { id: 'hsk1-l05-s02', hanzi: '我妹妹12岁。', pinyin: 'Wǒ mèimei shí’èr suì.', english: 'My younger sister is 12.' },
    { id: 'hsk1-l05-s03', hanzi: '我会做面条儿。', pinyin: 'Wǒ huì zuò miàntiáor.', english: 'I can make noodles.' },
    { id: 'hsk1-l05-s04', hanzi: '我不会做菜。', pinyin: 'Wǒ bú huì zuò cài.', english: 'I can’t cook dishes.' },
  ],
  grammar: [
    {
      id: 'hsk1-l05-g01',
      title: { en: 'Expression of time (1): dates & days', zh: '时间的表达（1）：日期、星期' },
      focusHanzi: ['年', '月', '日', '号', '星期'],
      structure: '年 → 月 → 日/号 → 星期',
      explanation: {
        en: 'From 小语讲堂: this lesson focuses on how to express dates and days of the week in Chinese — ordered year → month → day (日/号) → week. (Full tables: textbook P29.)',
        zh: '小语讲堂：本课学习日期、星期的表达——顺序为年→月→日/号→星期。详见课本P29。',
      },
      examples: [
        { id: 'hsk1-l05-d01-02', hanzi: '今天9月8号。', pinyin: 'Jīntiān jiǔ yuè bā hào.', english: 'Today is September 8.' },
        { id: 'hsk1-l05-s01', hanzi: '今天5月1号。', pinyin: 'Jīntiān wǔ yuè yī hào.', english: 'Today is May 1st.' },
      ],
    },
    {
      id: 'hsk1-l05-g02',
      title: { en: 'Nominal-predicate sentences', zh: '名词谓语句' },
      explanation: {
        en: 'From 小语讲堂: in a nominal-predicate sentence the predicate consists only of a noun or nominal phrase — usually indicating time, date, age, and so on (no “是” needed).',
        zh: '小语讲堂：名词谓语句的谓语部分只有名词或名词性成分，一般表达时间、日期、年龄等（不用“是”）。',
      },
      examples: [
        { id: 'hsk1-l05-d01-01', hanzi: '今天几号？', pinyin: 'Jīntiān jǐ hào?', english: 'What’s today’s date?' },
        { id: 'hsk1-l05-s01', hanzi: '今天5月1号。', pinyin: 'Jīntiān wǔ yuè yī hào.', english: 'Today is May 1st.' },
        { id: 'hsk1-l05-s02', hanzi: '我妹妹12岁。', pinyin: 'Wǒ mèimei shí’èr suì.', english: 'My younger sister is 12.' },
      ],
    },
    {
      id: 'hsk1-l05-g03',
      title: { en: 'The modal verb “会”', zh: '能愿动词“会”' },
      focusHanzi: ['会', '不会'],
      structure: '会 + 动词',
      structureNegative: '不会 + 动词',
      explanation: {
        en: 'From 小语讲堂: 会 + verb indicates the knowledge or ability to perform an action that is acquired through learning.',
        zh: '小语讲堂：会+动词，表示通过学习后，懂得怎样做或有能力做。',
      },
      examples: [
        { id: 'hsk1-l05-d02-01', hanzi: '你会做饭吗？', pinyin: 'Nǐ huì zuò fàn ma?', english: 'Can you cook?' },
        { id: 'hsk1-l05-s03', hanzi: '我会做面条儿。', pinyin: 'Wǒ huì zuò miàntiáor.', english: 'I can make noodles.' },
        { id: 'hsk1-l05-s04', hanzi: '我不会做菜。', pinyin: 'Wǒ bú huì zuò cài.', english: 'I can’t cook dishes.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l05-d01',
      title: { en: 'Dates and days (Text 1)', zh: '今天几号' },
      context: {
        en: 'At home, Liu Ming and Wang Yixue were chatting.',
        zh: '在家里，刘明和王一雪在聊天儿。',
      },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '刘明 Liú Míng', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l05-d01-01', speakerId: 'A', hanzi: '今天几号？', pinyin: 'Jīntiān jǐ hào?', english: 'What’s today’s date?' },
        { id: 'hsk1-l05-d01-02', speakerId: 'B', hanzi: '今天9月8号。', pinyin: 'Jīntiān jiǔ yuè bā hào.', english: 'Today is September 8.' },
        { id: 'hsk1-l05-d01-03', speakerId: 'A', hanzi: '星期几？', pinyin: 'Xīngqī jǐ?', english: 'What day of the week is it?' },
        { id: 'hsk1-l05-d01-04', speakerId: 'B', hanzi: '星期日。今天我休息。', pinyin: 'Xīngqīrì. Jīntiān wǒ xiūxi.', english: 'Sunday. I’m off today.' },
      ],
    },
    {
      id: 'hsk1-l05-d02',
      title: { en: 'What can you cook? (Text 2)', zh: '你会做什么' },
      context: {
        en: 'At the company, Wang Yixue and Yang Tongle were chatting during a break.',
        zh: '在公司里，王一雪和杨同乐休息时聊天儿。',
      },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '杨同乐 Yáng Tónglè', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l05-d02-01', speakerId: 'A', hanzi: '你会做饭吗？', pinyin: 'Nǐ huì zuò fàn ma?', english: 'Can you cook?' },
        { id: 'hsk1-l05-d02-02', speakerId: 'B', hanzi: '我会做。', pinyin: 'Wǒ huì zuò.', english: 'I can.' },
        { id: 'hsk1-l05-d02-03', speakerId: 'A', hanzi: '你会做什么？', pinyin: 'Nǐ huì zuò shénme?', english: 'What can you make?' },
        { id: 'hsk1-l05-d02-04', speakerId: 'B', hanzi: '我会做面条儿、饺子，也会做一些菜。星期天我也做饭。', pinyin: 'Wǒ huì zuò miàntiáor, jiǎozi, yě huì zuò yìxiē cài. Xīngqītiān wǒ yě zuò fàn.', english: 'I can make noodles, jiaozi, and some dishes. On Sundays I cook too.' },
      ],
    },
    {
      id: 'hsk1-l05-d03',
      title: { en: 'The new computer (Text 3)', zh: '新电脑' },
      context: {
        en: 'At the company, Wang Yixue and Yang Tongle were chatting after work.',
        zh: '在公司里，王一雪和杨同乐下班时聊天儿。',
      },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '杨同乐 Yáng Tónglè', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l05-d03-01', speakerId: 'A', hanzi: '同乐，下班吗？', pinyin: 'Tónglè, xiàbān ma?', english: 'Tongle, off work?' },
        { id: 'hsk1-l05-d03-02', speakerId: 'B', hanzi: '下班。', pinyin: 'Xiàbān.', english: 'Off work.' },
        { id: 'hsk1-l05-d03-03', speakerId: 'A', hanzi: '这是你的新电脑吗？', pinyin: 'Zhè shì nǐ de xīn diànnǎo ma?', english: 'Is this your new computer?' },
        { id: 'hsk1-l05-d03-04', speakerId: 'B', hanzi: '是的，是我的新电脑。', pinyin: 'Shì de, shì wǒ de xīn diànnǎo.', english: 'Yes, it’s my new computer.' },
        { id: 'hsk1-l05-d03-05', speakerId: 'A', hanzi: '真好看！', pinyin: 'Zhēn hǎokàn!', english: 'Really nice!' },
        { id: 'hsk1-l05-d03-06', speakerId: 'B', hanzi: '我也很喜欢它。', pinyin: 'Wǒ yě hěn xǐhuan tā.', english: 'I like it very much too.' },
      ],
    },
  ],
};

export default lesson05;
