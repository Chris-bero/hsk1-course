/**
 * Lesson 7 — extracted from 《新HSK教程1》第7课 (New HSK Course 1, Lesson 7).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 7-2 / 7-4 / 7-6 with word-card examples,
 *    text contexts (p5/p26/p46), 小语讲堂 grammar blocks (p23–25/p44–45),
 *    exercises (p22/p43/p66), classroom activity (p68).
 *  - Textbook dialogue pages P46/P48/P51 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p27/p47) corroborate the dialogues.
 *
 * All four grammar cards are the book's own 小语讲堂 content; read-aloud lines
 * live in `sentences` and are reused by the grammar cards.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson07: Lesson = {
  id: 'hsk1-l07',
  order: 7,
  title: { en: "I'll finish work at 6:30 in the evening", zh: '我晚上六点半下班' },
  titlePinyin: 'Wǒ wǎnshang liù diǎn bàn xiàbān',
  objectives: [
    { en: 'The timing of events', zh: '事情发生的时间' },
    { en: 'The modal particle “吧” (1)', zh: '语气助词“吧”（1）' },
    { en: 'The modal particle “呢” (2)', zh: '语气助词“呢”（2）' },
    { en: 'Position of adverbs and time expressions as adverbials', zh: '副词、时间词语作状语的位置' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: What will Liu Ming do in the evening?', zh: '根据课文内容回答问题：刘明晚上还去做什么？' },
    { en: 'Answer according to the text: What will Liu Ming do in ten minutes?', zh: '根据课文内容回答问题：刘明十分钟后去做什么？' },
    { en: 'Group work: in groups of three, each member fills in the time slots according to their own schedule, then share.', zh: '三人一组，每人根据自己的情况填写时间，填好后分享。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l07-v01', hanzi: '现在', pinyin: 'xiànzài', english: 'now', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v01-e01', hanzi: '现在我要去看书了。', pinyin: 'Xiànzài wǒ yào qù kànshū le.', english: 'Now I’m going to read.' },
        { id: 'hsk1-l07-v01-e02', hanzi: '你现在去学校吗？', pinyin: 'Nǐ xiànzài qù xuéxiào ma?', english: 'Are you going to school now?' },
      ],
    },
    {
      id: 'hsk1-l07-v02', hanzi: '点', pinyin: 'diǎn', english: 'o’clock', partOfSpeech: 'm.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v02-e01', hanzi: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', english: 'What time is it now?' },
        { id: 'hsk1-l07-v02-e02', hanzi: '我家七点吃晚饭。', pinyin: 'Wǒ jiā qī diǎn chī wǎnfàn.', english: 'My family eats dinner at seven.' },
      ],
    },
    {
      id: 'hsk1-l07-v03', hanzi: '早上', pinyin: 'zǎoshang', english: '(early) morning', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v03-e01', hanzi: '早上好！', pinyin: 'Zǎoshang hǎo!', english: 'Good morning!' },
        { id: 'hsk1-l07-v03-e02', hanzi: '我早上坐出租车去上班。', pinyin: 'Wǒ zǎoshang zuò chūzūchē qù shàngbān.', english: 'I take a taxi to work in the morning.' },
      ],
    },
    {
      id: 'hsk1-l07-v04', hanzi: '上午', pinyin: 'shàngwǔ', english: 'morning', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v04-e01', hanzi: '上午我不休息。', pinyin: 'Shàngwǔ wǒ bù xiūxi.', english: 'I don’t rest in the morning.' },
        { id: 'hsk1-l07-v04-e02', hanzi: '他上午打了一个电话。', pinyin: 'Tā shàngwǔ dǎ le yí gè diànhuà.', english: 'He made a phone call in the morning.' },
      ],
    },
    {
      id: 'hsk1-l07-v05', hanzi: '分', pinyin: 'fēn', english: 'minute', partOfSpeech: 'm.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v05-e01', hanzi: '现在是3点10分。', pinyin: 'Xiànzài shì sān diǎn shí fēn.', english: 'It is now 3:10.' },
      ],
    },
    {
      id: 'hsk1-l07-v06', hanzi: '课', pinyin: 'kè', english: 'class; lesson', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v06-e01', hanzi: '我今天有很多课。', pinyin: 'Wǒ jīntiān yǒu hěn duō kè.', english: 'I have many classes today.' },
        { id: 'hsk1-l07-v06-e02', hanzi: '今天我们学第三课。', pinyin: 'Jīntiān wǒmen xué dì-sān kè.', english: 'Today we study Lesson 3.' },
      ],
    },
    {
      id: 'hsk1-l07-v07', hanzi: '下午', pinyin: 'xiàwǔ', english: 'afternoon', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v07-e01', hanzi: '下午4点爸爸回家了。', pinyin: 'Xiàwǔ sì diǎn bàba huí jiā le.', english: 'Dad came home at 4 in the afternoon.' },
        { id: 'hsk1-l07-v07-e02', hanzi: '我们今天下午不上课。', pinyin: 'Wǒmen jīntiān xiàwǔ bú shàngkè.', english: 'We have no class this afternoon.' },
      ],
    },
    {
      id: 'hsk1-l07-v08', hanzi: '见', pinyin: 'jiàn', english: 'meet', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l07-v08-e01', hanzi: '明天见！', pinyin: 'Míngtiān jiàn!', english: 'See you tomorrow!' },
        { id: 'hsk1-l07-v08-e02', hanzi: '我们下午三点在家家超市见。', pinyin: 'Wǒmen xiàwǔ sān diǎn zài Jiājiā Chāoshì jiàn.', english: 'Let’s meet at Jiajia Supermarket at 3 pm.' },
      ],
    },
    {
      id: 'hsk1-l07-v09', hanzi: '吧', pinyin: 'ba', english: 'used at the end of a sentence to express suggestions, consultations, advice, or requests', partOfSpeech: 'part.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v09-e01', hanzi: '我们去那家饭店吃饭吧。', pinyin: 'Wǒmen qù nà jiā fàndiàn chīfàn ba.', english: 'Let’s eat at that restaurant.' },
        { id: 'hsk1-l07-v09-e02', hanzi: '你早点儿休息吧。', pinyin: 'Nǐ zǎodiǎnr xiūxi ba.', english: 'You should rest earlier.' },
        { id: 'hsk1-l07-v09-e03', hanzi: '我们现在走吧。', pinyin: 'Wǒmen xiànzài zǒu ba.', english: 'Let’s go now.' },
      ],
    },
    {
      id: 'hsk1-l07-v10', hanzi: '电影院', pinyin: 'diānyǐngyuàn', english: 'cinema', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v10-e01', hanzi: '电影院人很多。', pinyin: 'Diānyǐngyuàn rén hěn duō.', english: 'The cinema has many people.' },
        { id: 'hsk1-l07-v10-e02', hanzi: '我和妈妈去电影院看电影。', pinyin: 'Wǒ hé māma qù diānyǐngyuàn kàn diānyǐng.', english: 'Mom and I go to the cinema to watch a movie.' },
      ],
    },
    {
      id: 'hsk1-l07-v11', hanzi: '看', pinyin: 'kàn', english: 'watch; see; read; look at', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v11-e01', hanzi: '今年我看了很多书。', pinyin: 'Jīnnián wǒ kàn le hěn duō shū.', english: 'I read many books this year.' },
        { id: 'hsk1-l07-v11-e02', hanzi: '爸爸在看电视。', pinyin: 'Bàba zài kàn diànshì.', english: 'Dad is watching TV.' },
      ],
    },
    {
      id: 'hsk1-l07-v12', hanzi: '电影', pinyin: 'diānyǐng', english: 'movie; film', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v12-e01', hanzi: '这个电影很好看。', pinyin: 'Zhè ge diānyǐng hěn hǎkàn.', english: 'This movie is very good.' },
        { id: 'hsk1-l07-v12-e02', hanzi: '她喜欢看中国电影。', pinyin: 'Tā xǐhuan kàn Zhōngguó diānyǐng.', english: 'She likes watching Chinese movies.' },
      ],
    },
    {
      id: 'hsk1-l07-v13', hanzi: '事', pinyin: 'shì', english: 'thing; affair', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v13-e01', hanzi: '我这个星期事太多了。', pinyin: 'Wǒ zhè ge xīngqī shì tài duō le.', english: 'I have too many things to do this week.' },
        { id: 'hsk1-l07-v13-e02', hanzi: '他有很多事要忙。', pinyin: 'Tā yǒu hěn duō shì yào máng.', english: 'He has many things to busy himself with.' },
      ],
    },
    {
      id: 'hsk1-l07-v14', hanzi: '上课', pinyin: 'shàngkè', english: 'attend a class', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v14-e01', hanzi: '同学们在上课。', pinyin: 'Tóngxuémen zài shàngkè.', english: 'The classmates are in class.' },
        { id: 'hsk1-l07-v14-e02', hanzi: '我病了，不能去上课了。', pinyin: 'Wǒ bìng le, bù néng qù shàngkè le.', english: 'I’m ill — I can’t go to class.' },
      ],
    },
    {
      id: 'hsk1-l07-v15', hanzi: '呢', pinyin: 'ne', english: 'marker of a declarative sentence', partOfSpeech: 'part.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v15-e01', hanzi: '我在吃饭呢。', pinyin: 'Wǒ zài chīfàn ne.', english: 'I’m eating (right now).' },
        { id: 'hsk1-l07-v15-e02', hanzi: '外边下雨呢。', pinyin: 'Wàibian xià yǔ ne.', english: 'It’s raining outside.' },
      ],
    },
    {
      id: 'hsk1-l07-v16', hanzi: '半', pinyin: 'bàn', english: 'half', partOfSpeech: 'num.',
      examples: [
        { id: 'hsk1-l07-v16-e01', hanzi: '我吃了半个苹果。', pinyin: 'Wǒ chī le bàn gè píngguǒ.', english: 'I ate half an apple.' },
        { id: 'hsk1-l07-v16-e02', hanzi: '她半年没回家了。', pinyin: 'Tā bàn nián méi huí jiā le.', english: 'She hasn’t been home for half a year.' },
      ],
    },
    {
      id: 'hsk1-l07-v17', hanzi: '下课', pinyin: 'xiàkè', english: 'dismiss a class', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l07-v17-e01', hanzi: '下课了，我要去吃饭。', pinyin: 'Xiàkè le, wǒ yào qù chīfàn.', english: 'Class is over — I’m going to eat.' },
        { id: 'hsk1-l07-v17-e02', hanzi: '下课后我要和朋友看电影。', pinyin: 'Xiàkè hòu wǒ yào hé péngyou kàn diānyǐng.', english: 'After class I’m going to watch a movie with a friend.' },
      ],
    },
    {
      id: 'hsk1-l07-v18', hanzi: '在', pinyin: 'zài', english: 'be at/in/on', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l07-v18-e01', hanzi: '我在学校呢。', pinyin: 'Wǒ zài xuéxiào ne.', english: 'I’m at school.' },
        { id: 'hsk1-l07-v18-e02', hanzi: '我的手机在房间里。', pinyin: 'Wǒ de shǒujī zài fángjiān lǐ.', english: 'My phone is in the room.' },
        { id: 'hsk1-l07-v18-e03', hanzi: '你现在在家吗？', pinyin: 'Nǐ xiànzài zài jiā ma?', english: 'Are you at home now?' },
      ],
    },
    {
      id: 'hsk1-l07-v19', hanzi: '家', pinyin: 'jiā', english: 'home', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v19-e01', hanzi: '我星期五回家。', pinyin: 'Wǒ xīngqīwǔ huí jiā.', english: 'I go home on Fridays.' },
        { id: 'hsk1-l07-v19-e02', hanzi: '您家真漂亮。', pinyin: 'Nín jiā zhēn piàoliang.', english: 'Your home is really beautiful.' },
      ],
    },
    {
      id: 'hsk1-l07-v20', hanzi: '里', pinyin: 'li/lǐ', english: 'inner; inside', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v20-e01', hanzi: '学校里有很多学生。', pinyin: 'Xuéxiào lǐ yǒu hěn duō xuéshēng.', english: 'There are many students in the school.' },
        { id: 'hsk1-l07-v20-e02', hanzi: '小猫在房间里边呢。', pinyin: 'Xiǎo māo zài fángjiān lǐbian ne.', english: 'The kitten is inside the room.' },
      ],
    },
    {
      id: 'hsk1-l07-v21', hanzi: '晚上', pinyin: 'wǎnshang', english: 'evening', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v21-e01', hanzi: '晚上好！', pinyin: 'Wǎnshang hǎo!', english: 'Good evening!' },
        { id: 'hsk1-l07-v21-e02', hanzi: '晚上大家都在家里看电视。', pinyin: 'Wǎnshang dàjiā dōu zài jiā lǐ kàn diànshì.', english: 'In the evening everyone watches TV at home.' },
      ],
    },
    {
      id: 'hsk1-l07-v22', hanzi: '医院', pinyin: 'yīyuàn', english: 'hospital', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v22-e01', hanzi: '他生病去医院了。', pinyin: 'Tā shēng bìng qù yīyuàn le.', english: 'He fell ill and went to the hospital.' },
        { id: 'hsk1-l07-v22-e02', hanzi: '我爸爸在医院工作。', pinyin: 'Wǒ bàba zài yīyuàn gōngzuò.', english: 'My father works at the hospital.' },
      ],
    },
    {
      id: 'hsk1-l07-v23', hanzi: '上班', pinyin: 'shàngbān', english: 'go to work', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l07-v23-e01', hanzi: '爸爸妈妈上班，我上学。', pinyin: 'Bàba māma shàngbān, wǒ shàngxué.', english: 'Mom and Dad go to work; I go to school.' },
        { id: 'hsk1-l07-v23-e02', hanzi: '我生病了，没去上班。', pinyin: 'Wǒ shēng bìng le, méi qù shàngbān.', english: 'I was ill and didn’t go to work.' },
      ],
    },
    {
      id: 'hsk1-l07-v24', hanzi: '店', pinyin: 'diàn', english: 'shop; store', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v24-e01', hanzi: '你去菜店买些菜吧。', pinyin: 'Nǐ qù cài diàn mǎi xiē cài ba.', english: 'Go buy some vegetables at the grocery shop.' },
        { id: 'hsk1-l07-v24-e02', hanzi: '这家店卖电脑和手机。', pinyin: 'Zhè jiā diàn mài diànnǎo hé shǒujī.', english: 'This shop sells computers and phones.' },
      ],
    },
    {
      id: 'hsk1-l07-v25', hanzi: '菜', pinyin: 'cài', english: 'vegetable; greens', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v25-e01', hanzi: '你吃点儿菜吧。', pinyin: 'Nǐ chī diǎnr cài ba.', english: 'Have some vegetables.' },
        { id: 'hsk1-l07-v25-e02', hanzi: '我明天早上去店里买菜。', pinyin: 'Wǒ míngtiān zǎoshang qù diàn lǐ mǎi cài.', english: 'I’ll buy vegetables at the shop tomorrow morning.' },
      ],
    },
    {
      id: 'hsk1-l07-v26', hanzi: '分钟', pinyin: 'fēnzhōng', english: 'minute', partOfSpeech: 'm.', keyWord: true,
      examples: [
        { id: 'hsk1-l07-v26-e01', hanzi: '我还有十分钟能到。', pinyin: 'Wǒ hái yǒu shí fēnzhōng néng dào.', english: 'I can arrive in ten more minutes.' },
        { id: 'hsk1-l07-v26-e02', hanzi: '弟弟看了十分钟电视。', pinyin: 'Dìdi kàn le shí fēnzhōng diànshì.', english: 'Younger brother watched TV for ten minutes.' },
      ],
    },
    {
      id: 'hsk1-l07-v27', hanzi: '后', pinyin: 'hòu', english: 'after; later', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l07-v27-e01', hanzi: '我20分钟后到。', pinyin: 'Wǒ èrshí fēnzhōng hòu dào.', english: 'I’ll arrive in 20 minutes.' },
        { id: 'hsk1-l07-v27-e02', hanzi: '我坐在他后边。', pinyin: 'Wǒ zuò zài tā hòubian.', english: 'I sit behind him.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l07-s01', hanzi: '我不想去。', pinyin: 'Wǒ bù xiǎng qù.', english: 'I don’t want to go.' },
    { id: 'hsk1-l07-s02', hanzi: '妹妹很高兴。', pinyin: 'Mèimei hěn gāoxìng.', english: 'Younger sister is very happy.' },
    { id: 'hsk1-l07-s03', hanzi: '她上午十点半上课。', pinyin: 'Tā shàngwǔ shí diǎn bàn shàngkè.', english: 'She has class at 10:30 in the morning.' },
    { id: 'hsk1-l07-s04', hanzi: '我明天下午两点还上课呢。', pinyin: 'Wǒ míngtiān xiàwǔ liǎng diǎn hái shàngkè ne.', english: 'I still have class at 2 pm tomorrow.' },
    { id: 'hsk1-l07-s05', hanzi: '妹妹会做两个菜呢。', pinyin: 'Mèimei huì zuò liǎng gè cài ne.', english: 'Little sister can cook two dishes, you know.' },
    { id: 'hsk1-l07-s06', hanzi: '李文晚上还有事呢。', pinyin: 'Lǐ Wén wǎnshang hái yǒu shì ne.', english: 'Li Wen still has things to do in the evening.' },
  ],
  grammar: [
    {
      id: 'hsk1-l07-g01',
      title: { en: 'Expression of time (2): clock times & periods', zh: '时间的表达（2）' },
      focusHanzi: ['点', '分', '零', '上午', '中午', '下午', '晚上'],
      structure: '……点……（分） / ……点零……（分）',
      structureNegative: '上午/中午/下午/晚上 + 时间点',
      explanation: {
        en: 'From 小语讲堂: (1) specific times use 点 and 分 — for minutes under ten, 零 must be pronounced and cannot be omitted at exactly ten minutes; (2) time periods use 上午/中午/下午/晚上 before the specific time. (Tables: textbook P47.)',
        zh: '小语讲堂：（1）使用“点、分”表达时间点：……点……（分）；不足十分钟时“零”必须读出，整十分钟不能省。（2）使用“上午、中午、下午、晚上”等时间名词表达时间段：上午/中午/下午/晚上+时间点。详见课本P47。',
      },
      examples: [
        { id: 'hsk1-l07-d01-02', hanzi: '早上八点四十。', pinyin: 'Zǎoshang bā diǎn sìshí.', english: '8:40 in the morning.' },
        { id: 'hsk1-l07-d01-03', hanzi: '我上午十点十分有课。', pinyin: 'Wǒ shàngwǔ shí diǎn shí fēn yǒu kè.', english: 'I have class at 10:10 in the morning.' },
        { id: 'hsk1-l07-d03-03', hanzi: '我晚上六点半下班。', pinyin: 'Wǒ wǎnshang liù diǎn bàn xiàbān.', english: 'I finish work at 6:30 in the evening.' },
      ],
    },
    {
      id: 'hsk1-l07-g02',
      title: { en: 'The modal particle “吧” (1)', zh: '语气助词“吧”（1）' },
      focusHanzi: ['吧'],
      structure: '……吧。',
      explanation: {
        en: 'From 小语讲堂: “吧” is used at the end of a sentence to express suggestions, consultations, advice, or requests.',
        zh: '小语讲堂：“吧”表示建议、商量、劝告、请求。',
      },
      examples: [
        { id: 'hsk1-l07-d01-04', hanzi: '好的，我们下午两点见吧。', pinyin: 'Hǎo de, wǒmen xiàwǔ liǎng diǎn jiàn ba.', english: 'OK — let’s meet at 2 pm.' },
        { id: 'hsk1-l07-d03-05', hanzi: '好的，你去店里买些菜吧。', pinyin: 'Hǎo de, nǐ qù diàn lǐ mǎi xiē cài ba.', english: 'OK — go buy some vegetables at the shop.' },
        { id: 'hsk1-l07-v09-e03', hanzi: '我们现在走吧。', pinyin: 'Wǒmen xiànzài zǒu ba.', english: 'Let’s go now.' },
      ],
    },
    {
      id: 'hsk1-l07-g03',
      title: { en: 'Position of adverbs & time expressions as adverbials', zh: '副词、时间词语作状语的位置' },
      structure: '状语（副词/时间词） + 动词/形容词',
      explanation: {
        en: 'From 小语讲堂: in Chinese, when adverbs and time expressions function as adverbials, they are generally placed before verbs or adjectives.',
        zh: '小语讲堂：在汉语中，副词、时间词语作状语时，一般都要在动词或形容词前。',
      },
      examples: [
        { id: 'hsk1-l07-s01', hanzi: '我不想去。', pinyin: 'Wǒ bù xiǎng qù.', english: 'I don’t want to go.' },
        { id: 'hsk1-l07-s02', hanzi: '妹妹很高兴。', pinyin: 'Mèimei hěn gāoxìng.', english: 'Younger sister is very happy.' },
        { id: 'hsk1-l07-s03', hanzi: '她上午十点半上课。', pinyin: 'Tā shàngwǔ shí diǎn bàn shàngkè.', english: 'She has class at 10:30 in the morning.' },
      ],
    },
    {
      id: 'hsk1-l07-g04',
      title: { en: 'The modal particle “呢” (2)', zh: '语气助词“呢”（2）' },
      focusHanzi: ['呢'],
      structure: '……呢。',
      explanation: {
        en: 'From 小语讲堂: “呢” at the end of a declarative sentence indicates a confirmed fact.',
        zh: '小语讲堂：“……呢”表示确认的事实。',
      },
      examples: [
        { id: 'hsk1-l07-s04', hanzi: '我明天下午两点还上课呢。', pinyin: 'Wǒ míngtiān xiàwǔ liǎng diǎn hái shàngkè ne.', english: 'I still have class at 2 pm tomorrow.' },
        { id: 'hsk1-l07-s05', hanzi: '妹妹会做两个菜呢。', pinyin: 'Mèimei huì zuò liǎng gè cài ne.', english: 'Little sister can cook two dishes, you know.' },
        { id: 'hsk1-l07-s06', hanzi: '李文晚上还有事呢。', pinyin: 'Lǐ Wén wǎnshang hái yǒu shì ne.', english: 'Li Wen still has things to do in the evening.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l07-d01',
      title: { en: 'On the phone with Annie (Text 1)', zh: '现在几点' },
      context: { en: 'Bai Jiayue and Annie were talking on the phone.', zh: '白家月和安妮在打电话。' },
      speakers: [
        { id: 'A', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'B', name: '安妮 Ānnī', voice: 'female' },
      ],
      lines: [
        { id: 'hsk1-l07-d01-01', speakerId: 'A', hanzi: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', english: 'What time is it now?' },
        { id: 'hsk1-l07-d01-02', speakerId: 'B', hanzi: '早上八点四十。', pinyin: 'Zǎoshang bā diǎn sìshí.', english: '8:40 in the morning.' },
        { id: 'hsk1-l07-d01-03', speakerId: 'A', hanzi: '我上午十点十分有课。', pinyin: 'Wǒ shàngwǔ shí diǎn shí fēn yǒu kè.', english: 'I have class at 10:10 in the morning.' },
        { id: 'hsk1-l07-d01-04', speakerId: 'B', hanzi: '好的，我们下午两点见吧。', pinyin: 'Hǎo de, wǒmen xiàwǔ liǎng diǎn jiàn ba.', english: 'OK — let’s meet at 2 pm.' },
      ],
    },
    {
      id: 'hsk1-l07-d02',
      title: { en: 'An invitation (Text 2)', zh: '去看电影' },
      context: { en: 'On campus, Li Wen came across Bai Jiayue.', zh: '在校园里，李文遇到白家月。' },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l07-d02-01', speakerId: 'A', hanzi: '下午我想去电影院看电影，你去吗？', pinyin: 'Xiàwǔ wǒ xiǎng qù diānyǐngyuàn kàn diānyǐng, nǐ qù ma?', english: 'I want to go to the cinema this afternoon — are you going?' },
        { id: 'hsk1-l07-d02-02', speakerId: 'B', hanzi: '我不想去，下午还有事。', pinyin: 'Wǒ bù xiǎng qù, xiàwǔ hái yǒu shì.', english: 'I don’t want to go — I still have things to do this afternoon.' },
        { id: 'hsk1-l07-d02-03', speakerId: 'A', hanzi: '好的。明天呢？', pinyin: 'Hǎo de. Míngtiān ne?', english: 'OK. What about tomorrow?' },
        { id: 'hsk1-l07-d02-04', speakerId: 'B', hanzi: '我明天下午两点还上课呢，四点半下课。', pinyin: 'Wǒ míngtiān xiàwǔ liǎng diǎn hái shàngkè ne, sì diǎn bàn xiàkè.', english: 'I still have class at 2 pm tomorrow — class ends at 4:30.' },
      ],
    },
    {
      id: 'hsk1-l07-d03',
      title: { en: 'A call from the office (Text 3)', zh: '喂，你在哪儿呢' },
      context: { en: 'Wang Yixue was calling Liu Ming at the office.', zh: '王一雪在办公室给刘明打电话。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '刘明 Liú Míng', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l07-d03-01', speakerId: 'A', hanzi: '喂，你在哪儿呢？', pinyin: 'Wèi, nǐ zài nǎr ne?', english: 'Hello? Where are you?' },
        { id: 'hsk1-l07-d03-02', speakerId: 'B', hanzi: '我在家里呢。', pinyin: 'Wǒ zài jiā lǐ ne.', english: 'I’m at home.' },
        { id: 'hsk1-l07-d03-03', speakerId: 'A', hanzi: '我晚上六点半下班。', pinyin: 'Wǒ wǎnshang liù diǎn bàn xiàbān.', english: 'I finish work at 6:30 in the evening.' },
        { id: 'hsk1-l07-d03-04', speakerId: 'B', hanzi: '我八点去医院上班。', pinyin: 'Wǒ bā diǎn qù yīyuàn shàngbān.', english: 'I go to work at the hospital at eight.' },
        { id: 'hsk1-l07-d03-05', speakerId: 'A', hanzi: '好的，你去店里买些菜吧。', pinyin: 'Hǎo de, nǐ qù diàn lǐ mǎi xiē cài ba.', english: 'OK — go buy some vegetables at the shop.' },
        { id: 'hsk1-l07-d03-06', speakerId: 'B', hanzi: '好，我十分钟后去。', pinyin: 'Hǎo, wǒ shí fēnzhōng hòu qù.', english: 'OK — I’ll go in ten minutes.' },
      ],
    },
  ],
};

export default lesson07;
