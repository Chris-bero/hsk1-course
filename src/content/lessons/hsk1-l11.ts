/**
 * Lesson 11 — extracted from 《新HSK教程1》第11课 (New HSK Course 1, Lesson 11).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 11-2 / 11-4 / 11-6 with word-card examples,
 *    text contexts (p5/p20/p36), 小语讲堂 grammar blocks (p19/p34–35/p61),
 *    exercises (p18/p33/p60), classroom activity (p63).
 *  - Textbook dialogue pages P79/P81/P83 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p21/p37) corroborate the dialogues.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson11: Lesson = {
  id: 'hsk1-l11',
  order: 11,
  title: { en: 'I’m studying at university', zh: '我读大学呢' },
  titlePinyin: 'Wǒ dú dàxué ne',
  objectives: [
    { en: 'To express actions in progress', zh: '表达正在做的事情' },
    { en: 'The affirmative-negative question pattern', zh: '正反问格式' },
    { en: 'The modal verb “要”', zh: '能愿动词“要”' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: Has the younger brother gotten up yet?', zh: '根据课文内容回答问题：弟弟起床没起床？' },
    { en: 'Answer according to the text: What is the younger brother going to do today?', zh: '根据课文内容回答问题：弟弟今天要做什么？' },
    { en: 'Pair work: take turns asking and answering whether you are going to do something.', zh: '双人一组：两人一组，互相问答做不做某事。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l11-v01', hanzi: '时候', pinyin: 'shíhou', english: '(a point in) time', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v01-e01', hanzi: '你什么时候回家？', pinyin: 'Nǐ shénme shíhou huí jiā?', english: 'When are you going home?' },
        { id: 'hsk1-l11-v01-e02', hanzi: '你什么时候下课？', pinyin: 'Nǐ shénme shíhou xiàkè?', english: 'When does your class end?' },
      ],
    },
    {
      id: 'hsk1-l11-v02', hanzi: '饭店', pinyin: 'fàndiàn', english: 'restaurant', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v02-e01', hanzi: '那家饭店的菜不好吃。', pinyin: 'Nà jiā fàndiàn de cài bù hǎochī.', english: 'The food at that restaurant isn’t tasty.' },
        { id: 'hsk1-l11-v02-e02', hanzi: '学校外面有很多饭店。', pinyin: 'Xuéxiào wàimian yǒu hěn duō fàndiàn.', english: 'There are many restaurants outside the school.' },
      ],
    },
    {
      id: 'hsk1-l11-v03', hanzi: '知道', pinyin: 'zhīdào', english: 'know; realize', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l11-v03-e01', hanzi: '我不知道你的衣服在哪儿。', pinyin: 'Wǒ bù zhīdào nǐ de yīfu zài nǎr.', english: 'I don’t know where your clothes are.' },
        { id: 'hsk1-l11-v03-e02', hanzi: '你知不知道我要去北京？', pinyin: 'Nǐ zhī bu zhīdào wǒ yào qù Běijīng?', english: 'Do you know that I’m going to Beijing?' },
      ],
    },
    {
      id: 'hsk1-l11-v04', hanzi: '正在', pinyin: 'zhèngzài', english: 'in the process of', partOfSpeech: 'adv.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v04-e01', hanzi: '弟弟正在睡觉呢。', pinyin: 'Dìdi zhèngzài shuìjiào ne.', english: 'Younger brother is sleeping right now.' },
        { id: 'hsk1-l11-v04-e02', hanzi: '我打电话的时候，她正在开车。', pinyin: 'Wǒ dǎ diànhuà de shíhou, tā zhèngzài kāichē.', english: 'When I called, she was driving.' },
      ],
    },
    {
      id: 'hsk1-l11-v05', hanzi: '找', pinyin: 'zhǎo', english: 'look for', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l11-v05-e01', hanzi: '老师有事找你。', pinyin: 'Lǎoshī yǒu shì zhǎo nǐ.', english: 'The teacher is looking for you about something.' },
        { id: 'hsk1-l11-v05-e02', hanzi: '你再找找，我昨天还看见它在房间里呢。', pinyin: 'Nǐ zài zhǎozhao, wǒ zuótiān hái kànjiàn tā zài fángjiān lǐ ne.', english: 'Look again — I still saw it in the room yesterday.' },
      ],
    },
    {
      id: 'hsk1-l11-v06', hanzi: '开车', pinyin: 'kāichē', english: 'drive (a vehicle)', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l11-v06-e01', hanzi: '我不会开车。', pinyin: 'Wǒ bú huì kāichē.', english: 'I can’t drive.' },
        { id: 'hsk1-l11-v06-e02', hanzi: '你开车上班吗？', pinyin: 'Nǐ kāichē shàngbān ma?', english: 'Do you drive to work?' },
        { id: 'hsk1-l11-v06-e03', hanzi: '你开了三个小时车了，休息一下吧。', pinyin: 'Nǐ kāi le sān gè xiǎoshí chē le, xiūxi yíxià ba.', english: 'You’ve driven for three hours — take a rest.' },
      ],
    },
    {
      id: 'hsk1-l11-v07', hanzi: '车', pinyin: 'chē', english: 'vehicle', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v07-e01', hanzi: '今天我想坐车上学。', pinyin: 'Jīntiān wǒ xiǎng zuò chē shàngxué.', english: 'Today I want to go to school by car.' },
        { id: 'hsk1-l11-v07-e02', hanzi: '爸爸想买新车。', pinyin: 'Bàba xiǎng mǎi xīn chē.', english: 'Dad wants to buy a new car.' },
      ],
    },
    {
      id: 'hsk1-l11-v08', hanzi: '在', pinyin: 'zài', english: 'used to indicate an action in progress', partOfSpeech: 'adv.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v08-e01', hanzi: '我和女朋友在看电影。', pinyin: 'Wǒ hé nǚ péngyou zài kàn diānyǐng.', english: 'My girlfriend and I are watching a movie.' },
        { id: 'hsk1-l11-v08-e02', hanzi: '爸爸在开车，不能打电话。', pinyin: 'Bàba zài kāichē, bù néng dǎ diànhuà.', english: 'Dad is driving — he can’t take calls.' },
      ],
    },
    {
      id: 'hsk1-l11-v09', hanzi: '读', pinyin: 'dú', english: 'attend school; study', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v09-e01', hanzi: '我妹妹正在读小学。', pinyin: 'Wǒ mèimei zhèngzài dú xiǎoxué.', english: 'My younger sister is attending primary school.' },
        { id: 'hsk1-l11-v09-e02', hanzi: '你现在读大学吗？', pinyin: 'Nǐ xiànzài dú dàxúe ma?', english: 'Are you attending university now?' },
      ],
    },
    {
      id: 'hsk1-l11-v10', hanzi: '大学', pinyin: 'dàxúe', english: 'university; college', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v10-e01', hanzi: '他是大学老师。', pinyin: 'Tā shì dàxúe lǎoshī.', english: 'He is a university teacher.' },
        { id: 'hsk1-l11-v10-e02', hanzi: '我在北京大学学中文。', pinyin: 'Wǒ zài Běijīng Dàxúe xué Zhōngwén.', english: 'I study Chinese at Peking University.' },
      ],
    },
    {
      id: 'hsk1-l11-v11', hanzi: '大学生', pinyin: 'dàxúeshēng', english: 'college/university student', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v11-e01', hanzi: '她哥哥是大学生。', pinyin: 'Tā gēge shì dàxúeshēng.', english: 'Her elder brother is a university student.' },
        { id: 'hsk1-l11-v11-e02', hanzi: '大学生学习忙不忙？', pinyin: 'Dàxúeshēng xuéxí máng bu máng?', english: 'Are university students busy with their studies?' },
      ],
    },
    {
      id: 'hsk1-l11-v12', hanzi: '学', pinyin: 'xué', english: 'study; learn', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l11-v12-e01', hanzi: '妹妹在学写字。', pinyin: 'Mèimei zài xué xiězì.', english: 'Younger sister is learning to write characters.' },
        { id: 'hsk1-l11-v12-e02', hanzi: '我想学中文，你呢？', pinyin: 'Wǒ xiǎng xué Zhōngwén, nǐ ne?', english: 'I want to study Chinese — how about you?' },
      ],
    },
    {
      id: 'hsk1-l11-v13', hanzi: '医', pinyin: 'yī', english: 'medicine', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v13-e01', hanzi: '读大学的时候，他学医。', pinyin: 'Dú dàxúe de shíhou, tā xué yī.', english: 'When he was at university, he studied medicine.' },
        { id: 'hsk1-l11-v13-e02', hanzi: '学医的大学生非常忙。', pinyin: 'Xué yī de dàxúeshēng fēicháng máng.', english: 'Medical students are extremely busy.' },
      ],
    },
    {
      id: 'hsk1-l11-v14', hanzi: '弟弟', pinyin: 'dìdi', english: 'younger brother', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v14-e01', hanzi: '我弟弟今年十岁了。', pinyin: 'Wǒ dìdi jīnnián shí suì le.', english: 'My younger brother is ten this year.' },
        { id: 'hsk1-l11-v14-e02', hanzi: '这是我弟弟的房间。', pinyin: 'Zhè shì wǒ dìdi de fángjiān.', english: 'This is my younger brother’s room.' },
      ],
    },
    {
      id: 'hsk1-l11-v15', hanzi: '起床', pinyin: 'qǐchuáng', english: 'get up; get out of bed', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v15-e01', hanzi: '起床吧，中午十二点了。', pinyin: 'Qǐchuáng ba, zhōngwǔ shí’èr diǎn le.', english: 'Get up — it’s twelve noon.' },
        { id: 'hsk1-l11-v15-e02', hanzi: '弟弟不想起床，还睡呢。', pinyin: 'Dìdi bù xiǎng qǐchuáng, hái shuì ne.', english: 'Younger brother doesn’t want to get up — he’s still sleeping.' },
      ],
    },
    {
      id: 'hsk1-l11-v16', hanzi: '睡觉', pinyin: 'shuìjiào', english: 'sleep', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l11-v16-e01', hanzi: '我昨天晚上没睡觉。', pinyin: 'Wǒ zuótiān wǎnshang méi shuìjiào.', english: 'I didn’t sleep last night.' },
        { id: 'hsk1-l11-v16-e02', hanzi: '我在车上睡了一觉。', pinyin: 'Wǒ zài chē shang shuì le yí jiào.', english: 'I had a sleep in the car.' },
        { id: 'hsk1-l11-v16-e03', hanzi: '爸爸昨晚睡了个好觉。', pinyin: 'Bàba zuówǎn shuì le gè hǎo jiào.', english: 'Dad had a good sleep last night.' },
      ],
    },
    {
      id: 'hsk1-l11-v17', hanzi: '睡', pinyin: 'shuì', english: 'sleep', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l11-v17-e01', hanzi: '小孩子要早睡。', pinyin: 'Xiǎo háizi yào zǎo shuì.', english: 'Children should sleep early.' },
        { id: 'hsk1-l11-v17-e02', hanzi: '睡吧，很晚了。', pinyin: 'Shuì ba, hěn wǎn le.', english: 'Go to sleep — it’s very late.' },
      ],
    },
    {
      id: 'hsk1-l11-v18', hanzi: '那里', pinyin: 'nàlǐ', english: 'there; that place', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l11-v18-e01', hanzi: '你去那里找他吧。', pinyin: 'Nǐ qù nàlǐ zhǎo tā ba.', english: 'Go look for him over there.' },
        { id: 'hsk1-l11-v18-e02', hanzi: '学校外面有一家超市，那里有很多东西。', pinyin: 'Xuéxiào wàimian yǒu yì jiā chāoshì, nàlǐ yǒu hěn duō dōngxi.', english: 'There’s a supermarket outside the school — it has many things.' },
      ],
    },
    {
      id: 'hsk1-l11-v19', hanzi: '哪里', pinyin: 'nǎlǐ', english: 'where', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l11-v19-e01', hanzi: '妈妈在哪里？', pinyin: 'Māma zài nǎlǐ?', english: 'Where is Mom?' },
        { id: 'hsk1-l11-v19-e02', hanzi: '你要去哪里？', pinyin: 'Nǐ yào qù nǎlǐ?', english: 'Where do you want to go?' },
      ],
    },
    {
      id: 'hsk1-l11-v20', hanzi: '昨天', pinyin: 'zuótiān', english: 'yesterday', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v20-e01', hanzi: '昨天我没看见你。', pinyin: 'Zuótiān wǒ méi kànjiàn nǐ.', english: 'I didn’t see you yesterday.' },
        { id: 'hsk1-l11-v20-e02', hanzi: '她昨天没来上课。', pinyin: 'Tā zuótiān méi lái shàngkè.', english: 'She didn’t come to class yesterday.' },
      ],
    },
    {
      id: 'hsk1-l11-v21', hanzi: '问', pinyin: 'wèn', english: 'ask', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v21-e01', hanzi: '请问，校医院在哪里？', pinyin: 'Qǐngwèn, xiào yīyuàn zài nǎlǐ?', english: 'Excuse me, where is the campus clinic?' },
        { id: 'hsk1-l11-v21-e02', hanzi: '您好，我想问一个问题。', pinyin: 'Nín hǎo, wǒ xiǎng wèn yí gè wèntí.', english: 'Hello — I’d like to ask a question.' },
      ],
    },
    {
      id: 'hsk1-l11-v22', hanzi: '对', pinyin: 'duì', english: 'to; towards', partOfSpeech: 'prep.',
      examples: [
        { id: 'hsk1-l11-v22-e01', hanzi: '我有事对你说。', pinyin: 'Wǒ yǒu shì duì nǐ shuō.', english: 'I have something to tell you.' },
        { id: 'hsk1-l11-v22-e02', hanzi: '我男朋友对我很好。', pinyin: 'Wǒ nán péngyou duì wǒ hěn hǎo.', english: 'My boyfriend is very good to me.' },
      ],
    },
    {
      id: 'hsk1-l11-v23', hanzi: '说', pinyin: 'shuō', english: 'speak; talk; say', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v23-e01', hanzi: '她会说中文。', pinyin: 'Tā huì shuō Zhōngwén.', english: 'She can speak Chinese.' },
        { id: 'hsk1-l11-v23-e02', hanzi: '听了她的话，我不知道说什么。', pinyin: 'Tīng le tā de huà, wǒ bù zhīdào shuō shénme.', english: 'After her words, I don’t know what to say.' },
      ],
    },
    {
      id: 'hsk1-l11-v24', hanzi: '要', pinyin: 'yào', english: 'want; wish', partOfSpeech: 'mod.', keyWord: true,
      examples: [
        { id: 'hsk1-l11-v24-e01', hanzi: '晚上我要和朋友去唱歌。', pinyin: 'Wǎnshang wǒ yào hé péngyou qù chàng gē.', english: 'In the evening I’m going singing with friends.' },
        { id: 'hsk1-l11-v24-e02', hanzi: '我要去书店买一本书。', pinyin: 'Wǒ yào qù shūdiàn mǎi yì běn shū.', english: 'I want to buy a book at the bookstore.' },
      ],
    },
    {
      id: 'hsk1-l11-v25', hanzi: '小朋友', pinyin: 'xiǎpéngyǒu', english: 'child; kid', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l11-v25-e01', hanzi: '小朋友，请你不要说话。', pinyin: 'Xiǎpéngyǒu, qǐng nǐ búyào shuōhuà.', english: 'Child, please don’t talk.' },
        { id: 'hsk1-l11-v25-e02', hanzi: '小朋友们都喜欢来这里玩。', pinyin: 'Xiǎpéngyoumen dōu xǐhuan lái zhèlǐ wán.', english: 'The kids all like coming here to play.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l11-s01', hanzi: '它是不是在超市后边？', pinyin: 'Tā shì bu shì zài chāoshì hòubian?', english: 'Is it behind the supermarket?' },
    { id: 'hsk1-l11-s02', hanzi: '你去没去学校？', pinyin: 'Nǐ qù méi qù xuéxiào?', english: 'Did you go to school or not?' },
    { id: 'hsk1-l11-s03', hanzi: '这件衣服好看不好看？', pinyin: 'Zhè jiàn yīfu hǎkàn bu hǎkàn?', english: 'Is this piece of clothing good-looking or not?' },
    { id: 'hsk1-l11-s04', hanzi: '学生们在/正在上课呢。', pinyin: 'Xuéshēngmen zài/zhèngzài shàngkè ne.', english: 'The students are in class.', audioText: '学生们正在上课呢。' },
    { id: 'hsk1-l11-s05', hanzi: '我们读书呢。', pinyin: 'Wǒmen dú shū ne.', english: 'We are reading.' },
    { id: 'hsk1-l11-s06', hanzi: '他今天要和小朋友玩。', pinyin: 'Tā jīntiān yào hé xiǎpéngyǒu wán.', english: 'He is going to play with the kids today.' },
    { id: 'hsk1-l11-s07', hanzi: '妈妈要去超市。', pinyin: 'Māma yào qù chāoshì.', english: 'Mom is going to the supermarket.' },
    { id: 'hsk1-l11-s08', hanzi: '白家月要在家里学中文。', pinyin: 'Bái Jiāyuè yào zài jiā lǐ xué Zhōngwén.', english: 'Bai Jiayue is going to study Chinese at home.' },
  ],
  grammar: [
    {
      id: 'hsk1-l11-g01',
      title: { en: 'Affirmative-negative questions (A-not-A)', zh: '正反问格式' },
      focusHanzi: ['不', '没'],
      structure: '动词 + 不/没 + 动词',
      structureNegative: '形容词 + 不 + 形容词',
      explanation: {
        en: 'From 小语讲堂: affirmative-negative questions use Verb+不/没+Verb (e.g. 它是不是在超市后边? 你去没去学校?) and Adjective+不+Adjective (e.g. 这件衣服好看不好看?).',
        zh: '小语讲堂：动词+不/没+动词，如“它是不是在超市后边？你去没去学校？”；形容词+不+形容词，如“这件衣服好看不好看？”',
      },
      examples: [
        { id: 'hsk1-l11-s01', hanzi: '它是不是在超市后边？', pinyin: 'Tā shì bu shì zài chāoshì hòubian?', english: 'Is it behind the supermarket?' },
        { id: 'hsk1-l11-s02', hanzi: '你去没去学校？', pinyin: 'Nǐ qù méi qù xuéxiào?', english: 'Did you go to school or not?' },
        { id: 'hsk1-l11-s03', hanzi: '这件衣服好看不好看？', pinyin: 'Zhè jiàn yīfu hǎkàn bu hǎkàn?', english: 'Is this piece of clothing good-looking or not?' },
      ],
    },
    {
      id: 'hsk1-l11-g02',
      title: { en: 'Temporal adverbs “在/正在”', zh: '时间副词“在/正在”' },
      focusHanzi: ['在', '正在', '呢'],
      structure: '在/正在 + 动词 (+ 呢) / 动词 + 呢',
      structureNegative: '否定回答：没(有)',
      explanation: {
        en: 'From 小语讲堂: the temporal adverbs 在/正在 are placed before a verb, expressing that an action is ongoing or a situation is continuing. Three forms: (1) 在/正在+Verb; (2) 在/正在+Verb+呢; (3) Verb+呢. Negative responses use 没(有).',
        zh: '小语讲堂：时间副词“在/正在”位于动词前，表示动作正在进行或情况在继续。本课有三种形式：(1)在/正在+动词；(2)在/正在+动词+呢；(3)动词+呢。否定回答时用“没(有)”。',
      },
      examples: [
        { id: 'hsk1-l11-d02-01', hanzi: '你还在读大学吗？', pinyin: 'Nǐ hái zài dú dàxúe ma?', english: 'Are you still studying at university?' },
        { id: 'hsk1-l11-s04', hanzi: '学生们在/正在上课呢。', pinyin: 'Xuéshēngmen zài/zhèngzài shàngkè ne.', english: 'The students are in class.', audioText: '学生们正在上课呢。' },
        { id: 'hsk1-l11-s05', hanzi: '我们读书呢。', pinyin: 'Wǒmen dú shū ne.', english: 'We are reading.' },
      ],
    },
    {
      id: 'hsk1-l11-g03',
      title: { en: 'The modal verb “要”', zh: '能愿动词“要”' },
      focusHanzi: ['要'],
      structure: '要 + 动词',
      explanation: {
        en: 'From 小语讲堂: 要 + verb indicates the desire or intention to do something.',
        zh: '小语讲堂：要+动词，表示想做、打算做。',
      },
      examples: [
        { id: 'hsk1-l11-s06', hanzi: '他今天要和小朋友玩。', pinyin: 'Tā jīntiān yào hé xiǎpéngyǒu wán.', english: 'He is going to play with the kids today.' },
        { id: 'hsk1-l11-s07', hanzi: '妈妈要去超市。', pinyin: 'Māma yào qù chāoshì.', english: 'Mom is going to the supermarket.' },
        { id: 'hsk1-l11-s08', hanzi: '白家月要在家里学中文。', pinyin: 'Bái Jiāyuè yào zài jiā lǐ xué Zhōngwén.', english: 'Bai Jiayue is going to study Chinese at home.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l11-d01',
      title: { en: 'Looking for the restaurant (Text 1)', zh: '找饭店' },
      context: { en: 'On the road, while Li Wen was looking for the restaurant, Wang Yifei called him.', zh: '在路上，李文在找饭店，王一飞给他打电话。' },
      speakers: [
        { id: 'A', name: '王一飞 Wáng Yīfēi', voice: 'female' },
        { id: 'B', name: '李文 Lǐ Wén', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l11-d01-01', speakerId: 'A', hanzi: '喂，李文，你什么时候能到饭店？', pinyin: 'Wèi, Lǐ Wén, nǐ shénme shíhou néng dào fàndiàn?', english: 'Hello? Li Wen — when can you get to the restaurant?' },
        { id: 'hsk1-l11-d01-02', speakerId: 'B', hanzi: '还不知道，正在找呢。它是不是在超市后边？', pinyin: 'Hái bù zhīdào, zhèngzài zhǎo ne. Tā shì bu shì zài chāoshì hòubian?', english: 'Not sure yet — I’m still looking. Isn’t it behind the supermarket?' },
        { id: 'hsk1-l11-d01-03', speakerId: 'A', hanzi: '是的。你开车没开车？', pinyin: 'Shì de. Nǐ kāichē méi kāichē?', english: 'Yes it is. Did you drive or not?' },
        { id: 'hsk1-l11-d01-04', speakerId: 'B', hanzi: '我没开车，坐车呢。', pinyin: 'Wǒ méi kāichē, zuò chē ne.', english: 'I didn’t drive — I’m riding in a car.' },
      ],
    },
    {
      id: 'hsk1-l11-d02',
      title: { en: 'Catching up at the restaurant (Text 2)', zh: '读大学呢' },
      context: { en: 'After meeting at the restaurant, Wang Yifei and Li Wen were chatting.', zh: '在饭店里，王一飞和李文见面后聊天儿。' },
      speakers: [
        { id: 'A', name: '王一飞 Wáng Yīfēi', voice: 'female' },
        { id: 'B', name: '李文 Lǐ Wén', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l11-d02-01', speakerId: 'A', hanzi: '你还在读大学吗？', pinyin: 'Nǐ hái zài dú dàxúe ma?', english: 'Are you still studying at university?' },
        { id: 'hsk1-l11-d02-02', speakerId: 'B', hanzi: '对，我读大学呢，还是大学生。', pinyin: 'Duì, wǒ dú dàxúe ne, hái shì dàxúeshēng.', english: 'Yes — I’m at university, still a college student.' },
        { id: 'hsk1-l11-d02-03', speakerId: 'A', hanzi: '你们学习忙不忙？', pinyin: 'Nǐmen xuéxí máng bu máng?', english: 'Are you (all) busy with your studies?' },
        { id: 'hsk1-l11-d02-04', speakerId: 'B', hanzi: '非常忙，我学医，我们的课很多。', pinyin: 'Fēicháng máng, wǒ xué yī, wǒmen de kè hěn duō.', english: 'Extremely busy — I study medicine; we have many courses.' },
      ],
    },
    {
      id: 'hsk1-l11-d03',
      title: { en: 'Saturday morning (Text 3)', zh: '弟弟起床没起床' },
      context: { en: 'On Saturday morning, Liu Ming was going to the hospital to work overtime. Before leaving, he talked with his daughter.', zh: '星期六早上，刘明要去医院加班，出门前和女儿对话。' },
      speakers: [
        { id: 'A', name: '刘明 Liú Míng', voice: 'male2' },
        { id: 'B', name: '刘小雪 Liú Xiǎoxuě', voice: 'girl' },
      ],
      lines: [
        { id: 'hsk1-l11-d03-01', speakerId: 'A', hanzi: '弟弟起床没起床呢？', pinyin: 'Dìdi qǐchuáng méi qǐchuáng ne?', english: 'Has little brother gotten up yet?' },
        { id: 'hsk1-l11-d03-02', speakerId: 'B', hanzi: '没起床呢，还在睡觉。', pinyin: 'Méi qǐchuáng ne, hái zài shuìjiào.', english: 'Not up yet — he’s still sleeping.' },
        { id: 'hsk1-l11-d03-03', speakerId: 'A', hanzi: '还睡呢？他今天去不去那里？', pinyin: 'Hái shuì ne? Tā jīntiān qù bu qù nàlǐ?', english: 'Still sleeping? Is he going there today or not?' },
        { id: 'hsk1-l11-d03-04', speakerId: 'B', hanzi: '去哪里？', pinyin: 'Qù nǎlǐ?', english: 'Going where?' },
        { id: 'hsk1-l11-d03-05', speakerId: 'A', hanzi: '去超市。', pinyin: 'Qù chāoshì.', english: 'To the supermarket.' },
        { id: 'hsk1-l11-d03-06', speakerId: 'B', hanzi: '我昨天问他，他对我说，他不去，他今天要和小朋友玩。', pinyin: 'Wǒ zuótiān wèn tā, tā duì wǒ shuō, tā bù qù, tā jīntiān yào hé xiǎpéngyǒu wán.', english: 'I asked him yesterday — he told me he’s not going; he’s playing with the kids today.' },
      ],
    },
  ],
};

export default lesson11;
