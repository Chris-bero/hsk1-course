/**
 * Lesson 13 — extracted from 《新HSK教程1》第13课 (New HSK Course 1, Lesson 13).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 13-2 / 13-4 / 13-6 with word-card examples,
 *    text contexts (p5/p21/p45), 小语讲堂 grammar blocks (p19/p20/p44),
 *    exercises (p18/p43/p53), role-play activity (p55).
 *  - Textbook dialogue pages P96/P98/P100 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p6/p22/p46) corroborate the dialogues.
 *
 * The two 服务员 speakers are distinct characters (waitress in Text 2, waiter in
 * Text 3) with distinct voices; neither shares a voice with their scene partner.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson13: Lesson = {
  id: 'hsk1-l13',
  order: 13,
  title: { en: 'I’ll have a cup of tea, please', zh: '请给我一杯茶' },
  titlePinyin: 'Qǐng gěi wǒ yì bēi chá',
  objectives: [
    { en: 'Double-object sentences (1)', zh: '双宾语句（1）' },
    { en: 'The modal verb “可以”', zh: '能愿动词“可以”' },
    { en: 'The “Verb+一下” structure', zh: '“动词+一下”结构' },
    { en: 'Common expressions for ordering food', zh: '点餐常用语' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Answer according to the text: What other questions does Bai Jiayue have?', zh: '根据课文内容回答问题：白家月还有什么问题？' },
    { en: 'Answer according to the text: What does Ms. Wang say to Bai Jiayue?', zh: '根据课文内容回答问题：王老师对白家月说什么了？' },
    { en: 'Answer according to the text: What does the waitress ask Wang Yixue?', zh: '根据课文内容回答问题：服务员问王一雪什么问题了？' },
    { en: 'Answer according to the text: Has Wang Yixue had breakfast?', zh: '根据课文内容回答问题：王一雪吃早饭了吗？' },
    { en: 'Answer according to the text: How many jiaozi does Liu Ming want?', zh: '根据课文内容回答问题：刘明想要多少个饺子？' },
    { en: 'Answer according to the text: Does Liu Ming order rice?', zh: '根据课文内容回答问题：刘明要米饭了吗？' },
    { en: 'Role-play: in groups of three, one plays the waiter/waitress and two play customers ordering in a café.', zh: '角色扮演：三人一组，一个人扮演服务员，两个人扮演顾客，表演在咖啡馆点餐。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l13-v01', hanzi: '可以', pinyin: 'kěyǐ', english: 'can; may', partOfSpeech: 'mod.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v01-e01', hanzi: '妈妈，我们现在可以吃饭了吗？', pinyin: 'Māma, wǒmen xiànzài kěyǐ chīfàn le ma?', english: 'Mom, can we eat now?' },
        { id: 'hsk1-l13-v01-e02', hanzi: '我可以坐在这儿吗？可以，你坐吧。', pinyin: 'Wǒ kěyǐ zuò zài zhèr ma? Kěyǐ, nǐ zuò ba.', english: 'A: May I sit here? B: Yes, please sit.' },
      ],
    },
    {
      id: 'hsk1-l13-v02', hanzi: '再', pinyin: 'zài', english: 'once more; again', partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l13-v02-e01', hanzi: '我想再吃一个苹果。', pinyin: 'Wǒ xiǎng zài chī yí gè píngguǒ.', english: 'I want to eat one more apple.' },
        { id: 'hsk1-l13-v02-e02', hanzi: '妈妈，再给我读一本书吧。', pinyin: 'Māma, zài gěi wǒ dú yì běn shū ba.', english: 'Mom, read me one more book.' },
      ],
    },
    {
      id: 'hsk1-l13-v03', hanzi: '问题', pinyin: 'wèntí', english: 'question; problem', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v03-e01', hanzi: '你有问题可以来问我。', pinyin: 'Nǐ yǒu wèntí kěyǐ lái wèn wǒ.', english: 'If you have questions, you may come ask me.' },
        { id: 'hsk1-l13-v03-e02', hanzi: '我有很多问题要问老师。', pinyin: 'Wǒ yǒu hěn duō wèntí yào wèn lǎoshī.', english: 'I have many questions to ask the teacher.' },
      ],
    },
    {
      id: 'hsk1-l13-v04', hanzi: '卖', pinyin: 'mài', english: 'sell', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l13-v04-e01', hanzi: '那边在卖什么东西？', pinyin: 'Nàbiān zài mài shénme dōngxi?', english: 'What are they selling over there?' },
        { id: 'hsk1-l13-v04-e02', hanzi: '他在一家商店卖水果。', pinyin: 'Tā zài yì jiā shāngdiàn mài shuǐguǒ.', english: 'He sells fruit at a shop.' },
      ],
    },
    {
      id: 'hsk1-l13-v05', hanzi: '打电话', pinyin: 'dǎ diànhuà', english: 'make a phone call; call', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l13-v05-e01', hanzi: '老师在打电话呢。', pinyin: 'Lǎoshī zài dǎ diànhuà ne.', english: 'The teacher is on the phone.' },
        { id: 'hsk1-l13-v05-e02', hanzi: '昨天我给妈妈打了一个电话。', pinyin: 'Zuótiān wǒ gěi māma dǎ le yí gè diànhuà.', english: 'I called Mom yesterday.' },
      ],
    },
    {
      id: 'hsk1-l13-v06', hanzi: '一下', pinyin: 'yíxià', english: '(after a verb) one time; once', partOfSpeech: 'num.-m.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v06-e01', hanzi: '你看一下时间，现在几点了？', pinyin: 'Nǐ kàn yíxià shíjiān, xiànzài jǐ diǎn le?', english: 'Take a look at the time — what time is it now?' },
        { id: 'hsk1-l13-v06-e02', hanzi: '我们休息一下吧。', pinyin: 'Wǒmen xiūxi yíxià ba.', english: 'Let’s take a short break.' },
      ],
    },
    {
      id: 'hsk1-l13-v07', hanzi: '服务员', pinyin: 'fúwùyuán', english: 'attendant; waiter; waitress', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v07-e01', hanzi: '我是这个饭馆的服务员。', pinyin: 'Wǒ shì zhè ge fànguǎn de fúwùyuán.', english: 'I am the waiter of this restaurant.' },
        { id: 'hsk1-l13-v07-e02', hanzi: '我想找一下这里的服务员。', pinyin: 'Wǒ xiǎng zhǎo yíxià zhèlǐ de fúwùyuán.', english: 'I’d like to find the attendant here.' },
      ],
    },
    {
      id: 'hsk1-l13-v08', hanzi: '女士', pinyin: 'nǚshì', english: 'lady; madam', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v08-e01', hanzi: '王女士是我的大学同学。', pinyin: 'Wáng nǚshì shì wǒ de dàxúe tóngxué.', english: 'Ms. Wang is my university classmate.' },
        { id: 'hsk1-l13-v08-e02', hanzi: '女士们、先生们，大家好！', pinyin: 'Nǚshìmen, xiānshengmen, dàjiā hǎo!', english: 'Ladies and gentlemen, hello everyone!' },
      ],
    },
    {
      id: 'hsk1-l13-v09', hanzi: '请', pinyin: 'qǐng', english: 'please', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v09-e01', hanzi: '您请坐，请喝茶。', pinyin: 'Nín qǐng zuò, qǐng hē chá.', english: 'Please be seated, please have some tea.' },
        { id: 'hsk1-l13-v09-e02', hanzi: '请给我一杯热水，谢谢。', pinyin: 'Qǐng gěi wǒ yì bēi rè shuǐ, xièxie.', english: 'Please give me a cup of hot water, thank you.' },
      ],
    },
    {
      id: 'hsk1-l13-v10', hanzi: '坐', pinyin: 'zuò', english: 'sit', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l13-v10-e01', hanzi: '我们坐在那边吧。', pinyin: 'Wǒmen zuò zài nàbiān ba.', english: 'Let’s sit over there.' },
        { id: 'hsk1-l13-v10-e02', hanzi: '她坐在我前边。', pinyin: 'Tā zuò zài wǒ qiánbian.', english: 'She sits in front of me.' },
      ],
    },
    {
      id: 'hsk1-l13-v11', hanzi: '给', pinyin: 'gěi', english: 'give', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v11-e01', hanzi: '给你一个苹果。', pinyin: 'Gěi nǐ yí gè píngguǒ.', english: 'Here — an apple for you.' },
        { id: 'hsk1-l13-v11-e02', hanzi: '哥哥给了我一个新电脑。', pinyin: 'Gēge gěi le wǒ yí gè xīn diànnǎo.', english: 'My elder brother gave me a new computer.' },
      ],
    },
    {
      id: 'hsk1-l13-v12', hanzi: '杯', pinyin: 'bēi', english: 'cup; glass', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v12-e01', hanzi: '我想要一杯茶。', pinyin: 'Wǒ xiǎng yào yì bēi chá.', english: 'I’d like a cup of tea.' },
        { id: 'hsk1-l13-v12-e02', hanzi: '今天早上我喝了一杯牛奶。', pinyin: 'Jīntiān zǎoshang wǒ hē le yì bēi niúnǎi.', english: 'This morning I drank a glass of milk.' },
      ],
    },
    {
      id: 'hsk1-l13-v13', hanzi: '要', pinyin: 'yào', english: 'demand; ask for', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v13-e01', hanzi: '我要一杯热水，谢谢。', pinyin: 'Wǒ yào yì bēi rè shuǐ, xièxie.', english: 'I’d like a cup of hot water, thanks.' },
        { id: 'hsk1-l13-v13-e02', hanzi: '儿子想要一个新手机。', pinyin: 'Érzi xiǎng yào yí gè xīn shǒujī.', english: 'My son wants a new phone.' },
      ],
    },
    {
      id: 'hsk1-l13-v14', hanzi: '早饭', pinyin: 'zǎofàn', english: 'breakfast', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v14-e01', hanzi: '你吃早饭了吗？', pinyin: 'Nǐ chī zǎofàn le ma?', english: 'Have you had breakfast?' },
        { id: 'hsk1-l13-v14-e02', hanzi: '今天学校的早饭很好吃。', pinyin: 'Jīntiān xuéxiào de zǎofàn hěn hǎochī.', english: 'Today’s school breakfast is very tasty.' },
      ],
    },
    {
      id: 'hsk1-l13-v15', hanzi: '这个', pinyin: 'zhège', english: 'this', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l13-v15-e01', hanzi: '这个房间真大！', pinyin: 'Zhè ge fángjiān zhēn dà!', english: 'This room is really big!' },
        { id: 'hsk1-l13-v15-e02', hanzi: '我喜欢这个杯子。', pinyin: 'Wǒ xǐhuan zhè ge bēizi.', english: 'I like this cup.' },
      ],
    },
    {
      id: 'hsk1-l13-v16', hanzi: '面包', pinyin: 'miànbāo', english: 'bread', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v16-e01', hanzi: '我想再吃一块面包。', pinyin: 'Wǒ xiǎng zài chī yí kuài miànbāo.', english: 'I’d like to eat one more piece of bread.' },
        { id: 'hsk1-l13-v16-e02', hanzi: '您做的面包真好吃！', pinyin: 'Nín zuò de miànbāo zhēn hǎochī!', english: 'The bread you make is really delicious!' },
      ],
    },
    {
      id: 'hsk1-l13-v17', hanzi: '鸡蛋', pinyin: 'jīdàn', english: '(hen’s) egg', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v17-e01', hanzi: '我昨天在超市买了三斤鸡蛋。', pinyin: 'Wǒ zuótiān zài chāoshì mǎi le sān jīn jīdàn.', english: 'I bought three jin of eggs at the supermarket yesterday.' },
        { id: 'hsk1-l13-v17-e02', hanzi: '我的早饭是两个鸡蛋、一杯牛奶、一块面包。', pinyin: 'Wǒ de zǎofàn shì liǎng gè jīdàn, yì bēi niúnǎi, yí kuài miànbāo.', english: 'My breakfast is two eggs, a glass of milk and a piece of bread.' },
      ],
    },
    {
      id: 'hsk1-l13-v18', hanzi: '先生', pinyin: 'xiānsheng', english: 'gentleman; sir', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l13-v18-e01', hanzi: '先生，请坐。', pinyin: 'Xiānsheng, qǐng zuò.', english: 'Sir, please be seated.' },
        { id: 'hsk1-l13-v18-e02', hanzi: '李先生今天没上班，您明天再打电话吧。', pinyin: 'Lǐ xiānsheng jīntiān méi shàngbān, nín míngtiān zài dǎ diànhuà ba.', english: 'Mr. Li isn’t at work today — please call again tomorrow.' },
      ],
    },
    {
      id: 'hsk1-l13-v19', hanzi: '一半', pinyin: 'yíbàn', english: 'one half; half', partOfSpeech: 'num.',
      examples: [
        { id: 'hsk1-l13-v19-e01', hanzi: '这个面包我吃了一半。', pinyin: 'Zhè ge miànbāo wǒ chī le yíbàn.', english: 'I ate half of this bread.' },
        { id: 'hsk1-l13-v19-e02', hanzi: '这个苹果我们一人一半吧。', pinyin: 'Zhè ge píngguǒ wǒmen yì rén yíbàn ba.', english: 'Let’s split this apple half each.' },
      ],
    },
    {
      id: 'hsk1-l13-v20', hanzi: '茶', pinyin: 'chá', english: 'tea', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l13-v20-e01', hanzi: '很多中国人喜欢喝茶。', pinyin: 'Hěn duō Zhōngguó rén xǐhuan hē chá.', english: 'Many Chinese people like drinking tea.' },
        { id: 'hsk1-l13-v20-e02', hanzi: '桌子上有一杯热茶。', pinyin: 'Zhuōzi shang yǒu yì bēi rè chá.', english: 'There is a cup of hot tea on the table.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l13-s01', hanzi: '我可以再问您一个问题吗？', pinyin: 'Wǒ kěyǐ zài wèn nín yí gè wèntí ma?', english: 'May I ask you one more question?' },
    { id: 'hsk1-l13-s02', hanzi: '你们可以看这本书。', pinyin: 'Nǐmen kěyǐ kàn zhè běn shū.', english: 'You may look at this book.' },
    { id: 'hsk1-l13-s03', hanzi: '我可以坐吗？可以，请坐！', pinyin: 'Wǒ kěyǐ zuò ma? Kěyǐ, qǐng zuò!', english: 'A: May I sit? B: Yes — please sit!' },
    { id: 'hsk1-l13-s04', hanzi: '你可以打电话问一下。', pinyin: 'Nǐ kěyǐ dǎ diànhuà wèn yíxià.', english: 'You can call and ask.' },
    { id: 'hsk1-l13-s05', hanzi: '请休息一下。', pinyin: 'Qǐng xiūxi yíxià.', english: 'Please rest a bit.' },
    { id: 'hsk1-l13-s06', hanzi: '你看一下吧。', pinyin: 'Nǐ kàn yíxià ba.', english: 'Take a look.' },
    { id: 'hsk1-l13-s07', hanzi: '请给我一杯牛奶。', pinyin: 'Qǐng gěi wǒ yì bēi niúnǎi.', english: 'Please give me a cup of milk.' },
    { id: 'hsk1-l13-s08', hanzi: '白家月给安妮一个苹果。', pinyin: 'Bái Jiāyuè gěi Ānnī yí gè píngguǒ.', english: 'Bai Jiayue gives Annie an apple.' },
    { id: 'hsk1-l13-s09', hanzi: '我问老师两个问题。', pinyin: 'Wǒ wèn lǎoshī liǎng gè wèntí.', english: 'I ask the teacher two questions.' },
  ],
  grammar: [
    {
      id: 'hsk1-l13-g01',
      title: { en: 'The modal verb “可以”', zh: '能愿动词“可以”' },
      focusHanzi: ['可以'],
      structure: '可以 + 动词',
      explanation: {
        en: 'From 小语讲堂: 可以 + verb indicates possibility, capability, or permission.',
        zh: '小语讲堂：可以+动词，表示可能、能够或许可。',
      },
      examples: [
        { id: 'hsk1-l13-s01', hanzi: '我可以再问您一个问题吗？', pinyin: 'Wǒ kěyǐ zài wèn nín yí gè wèntí ma?', english: 'May I ask you one more question?' },
        { id: 'hsk1-l13-s02', hanzi: '你们可以看这本书。', pinyin: 'Nǐmen kěyǐ kàn zhè běn shū.', english: 'You may look at this book.' },
        { id: 'hsk1-l13-s03', hanzi: '我可以坐吗？可以，请坐！', pinyin: 'Wǒ kěyǐ zuò ma? Kěyǐ, qǐng zuò!', english: 'A: May I sit? B: Yes — please sit!' },
      ],
    },
    {
      id: 'hsk1-l13-g02',
      title: { en: 'The “Verb+一下” structure', zh: '“动词+一下”结构' },
      focusHanzi: ['一下'],
      structure: '动词 + 一下',
      explanation: {
        en: 'From 小语讲堂: in this lesson, “Verb+一下” indicates that an action is performed as a quick attempt or is brief.',
        zh: '小语讲堂：本课“动词+一下”结构表示做一次或试着做，动作时间短。',
      },
      examples: [
        { id: 'hsk1-l13-s04', hanzi: '你可以打电话问一下。', pinyin: 'Nǐ kěyǐ dǎ diànhuà wèn yíxià.', english: 'You can call and ask.' },
        { id: 'hsk1-l13-s05', hanzi: '请休息一下。', pinyin: 'Qǐng xiūxi yíxià.', english: 'Please rest a bit.' },
        { id: 'hsk1-l13-s06', hanzi: '你看一下吧。', pinyin: 'Nǐ kàn yíxià ba.', english: 'Take a look.' },
      ],
    },
    {
      id: 'hsk1-l13-g03',
      title: { en: 'Double-object sentences (1)', zh: '双宾语句（1）' },
      focusHanzi: ['给', '问'],
      structure: '动词（给/问） + 宾语1 + 宾语2',
      explanation: {
        en: 'From 小语讲堂: a double-object sentence is one where a verb takes two objects; this volume focuses on those formed with 给 and 问.',
        zh: '小语讲堂：双宾语句是一个动词带两个宾语的句子。本册学习“给、问”构成的双宾语句。',
      },
      examples: [
        { id: 'hsk1-l13-s07', hanzi: '请给我一杯牛奶。', pinyin: 'Qǐng gěi wǒ yì bēi niúnǎi.', english: 'Please give me a cup of milk.' },
        { id: 'hsk1-l13-s08', hanzi: '白家月给安妮一个苹果。', pinyin: 'Bái Jiāyuè gěi Ānnī yí gè píngguǒ.', english: 'Bai Jiayue gives Annie an apple.' },
        { id: 'hsk1-l13-s09', hanzi: '我问老师两个问题。', pinyin: 'Wǒ wèn lǎoshī liǎng gè wèntí.', english: 'I ask the teacher two questions.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l13-d01',
      title: { en: 'One more question (Text 1)', zh: '再问一个问题' },
      context: { en: 'In the classroom, after class, Bai Jiayue asked Ms. Wang a question.', zh: '教室里，下课后，白家月问王老师问题。' },
      speakers: [
        { id: 'A', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'B', name: '王一飞 Wáng Yīfēi', voice: 'female' },
      ],
      lines: [
        { id: 'hsk1-l13-d01-01', speakerId: 'A', hanzi: '王老师，我可以再问您一个问题吗？', pinyin: 'Wáng lǎoshī, wǒ kěyǐ zài wèn nín yí gè wèntí ma?', english: 'Ms. Wang, may I ask you one more question?' },
        { id: 'hsk1-l13-d01-02', speakerId: 'B', hanzi: '可以。你有什么问题？', pinyin: 'Kěyǐ. Nǐ yǒu shénme wèntí?', english: 'Yes — what question do you have?' },
        { id: 'hsk1-l13-d01-03', speakerId: 'A', hanzi: '那个小店卖不卖手机？', pinyin: 'Nàge xiǎo diàn mài bu mài shǒujī?', english: 'Does that little shop sell cell phones?' },
        { id: 'hsk1-l13-d01-04', speakerId: 'B', hanzi: '我不知道。你可以打电话问一下。', pinyin: 'Wǒ bù zhīdào. Nǐ kěyǐ dǎ diànhuà wèn yíxià.', english: 'I don’t know — you can call and ask.' },
      ],
    },
    {
      id: 'hsk1-l13-d02',
      title: { en: 'Breakfast at the café (Text 2)', zh: '咖啡馆早餐' },
      context: { en: 'In the café, Wang Yixue wanted to have breakfast.', zh: '在咖啡馆里，王一雪想吃早餐。' },
      speakers: [
        { id: 'A', name: '服务员 fúwùyuán', voice: 'female' },
        { id: 'B', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
      ],
      lines: [
        { id: 'hsk1-l13-d02-01', speakerId: 'A', hanzi: '女士，请坐！您喝什么？', pinyin: 'Nǚshì, qǐng zuò! Nín hē shénme?', english: 'Madam, please be seated! What will you drink?' },
        { id: 'hsk1-l13-d02-02', speakerId: 'B', hanzi: '我看一下。请给我一杯牛奶。', pinyin: 'Wǒ kàn yíxià. Qǐng gěi wǒ yì bēi niúnǎi.', english: 'Let me see. A cup of milk, please.' },
        { id: 'hsk1-l13-d02-03', speakerId: 'A', hanzi: '好的。您还要什么？', pinyin: 'Hǎo de. Nín hái yào shénme?', english: 'Certainly. Anything else?' },
        { id: 'hsk1-l13-d02-04', speakerId: 'B', hanzi: '我还没吃早饭，再要这个面包和鸡蛋吧。', pinyin: 'Wǒ hái méi chī zǎofàn, zài yào zhè ge miànbāo hé jīdàn ba.', english: 'I haven’t had breakfast yet — I’ll also take this bread and egg.' },
      ],
    },
    {
      id: 'hsk1-l13-d03',
      title: { en: 'Ordering at the restaurant (Text 3)', zh: '点餐' },
      context: { en: 'In the restaurant, Liu Ming was ordering food.', zh: '在餐馆里，刘明在点餐。' },
      speakers: [
        { id: 'A', name: '服务员 fúwùyuán', voice: 'male' },
        { id: 'B', name: '刘明 Liú Míng', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l13-d03-01', speakerId: 'A', hanzi: '先生，请坐！您要什么？', pinyin: 'Xiānsheng, qǐng zuò! Nín yào shénme?', english: 'Sir, please be seated! What would you like?' },
        { id: 'hsk1-l13-d03-02', speakerId: 'B', hanzi: '我要一斤饺子。', pinyin: 'Wǒ yào yì jīn jiǎozi.', english: 'I’ll have one jin of jiaozi.' },
        { id: 'hsk1-l13-d03-03', speakerId: 'A', hanzi: '好的。一斤饺子四十个。', pinyin: 'Hǎo de. Yì jīn jiǎozi sìshí gè.', english: 'Certainly. One jin of jiaozi is 40 pieces.' },
        { id: 'hsk1-l13-d03-04', speakerId: 'B', hanzi: '40个太多了，我要一半吧。', pinyin: 'Sìshí gè tài duō le, wǒ yào yíbàn ba.', english: '40 is too many — I’ll take half.' },
        { id: 'hsk1-l13-d03-05', speakerId: 'A', hanzi: '半斤20个。您想喝什么？', pinyin: 'Bàn jīn èrshí gè. Nín xiǎng hē shénme?', english: 'Half a jin is 20. What would you like to drink?' },
        { id: 'hsk1-l13-d03-06', speakerId: 'B', hanzi: '请给我一杯茶吧。', pinyin: 'Qǐng gěi wǒ yì bēi chá ba.', english: 'A cup of tea, please.' },
      ],
    },
  ],
};

export default lesson13;
