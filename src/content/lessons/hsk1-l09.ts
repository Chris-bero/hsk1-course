/**
 * Lesson 9 — extracted from 《新HSK教程1》第9课 (New HSK Course 1, Lesson 9).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 9-2 / 9-4 / 9-6 with word-card examples,
 *    text contexts (p5/p18/p34), 小语讲堂 grammar blocks (p16/p17/p33),
 *    exercises (p15/p32/p56), role-play activity (p58).
 *  - Textbook dialogue pages P62/P64/P65 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p19/p35) corroborate the dialogues.
 *
 * All three grammar cards are the book's own 小语讲堂 content; read-aloud lines
 * live in `sentences` and are reused by the grammar cards. The 书 word card
 * misprints its pinyin as "běn" in the PDF; corrected to shū here.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson09: Lesson = {
  id: 'hsk1-l09',
  order: 9,
  title: { en: 'I’ll be studying at school tomorrow morning', zh: '我明天上午在学校学习' },
  titlePinyin: 'Wǒ míngtiān shàngwǔ zài xuéxiào xuéxí',
  objectives: [
    { en: 'Existential sentences (1)', zh: '存现句（1）' },
    { en: 'Sequence of time and location expressions when they co-occur', zh: '时间词语和处所词语同现时的顺序' },
    { en: 'The word “第”', zh: '“第”' },
    { en: 'Leisure activities of contemporary Chinese people', zh: '当代中国人的休闲活动' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: Whose book is on the chair?', zh: '根据课文内容回答问题：椅子上的书是谁的？' },
    { en: 'Answer according to the text: Where will Chen Tianzhong be studying tomorrow morning?', zh: '根据课文内容回答问题：陈天中明天上午在哪儿学习？' },
    { en: 'Answer according to the text: What will Yang Tongle do on Saturday?', zh: '根据课文内容回答问题：杨同乐星期六做什么？' },
    { en: 'Answer according to the text: What will Wang Yixue do on Saturday?', zh: '根据课文内容回答问题：王一雪星期六做什么？' },
    { en: 'Role-play: one student plays Bai Jiayue, the other plays Chen Tianzhong — create a dialogue referring to the three texts in this lesson.', zh: '角色扮演：两人一组，一个人扮演白家月，另一个人扮演陈天中，仿照本课三篇课文的内容对话。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l09-v01', hanzi: '前边', pinyin: 'qiánbian', english: 'front', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v01-e01', hanzi: '我在他们前边。', pinyin: 'Wǒ zài tāmen qiánbian.', english: 'I am in front of them.' },
        { id: 'hsk1-l09-v01-e02', hanzi: '超市前边是一家书店。', pinyin: 'Chāoshì qiánbian shì yì jiā shūdiàn.', english: 'In front of the supermarket is a bookstore.' },
      ],
    },
    {
      id: 'hsk1-l09-v02', hanzi: '边', pinyin: 'bian/biān', english: 'indicating locality/edge; side', partOfSpeech: 'suf./n.',
      examples: [
        { id: 'hsk1-l09-v02-e01', hanzi: '你后边是谁？', pinyin: 'Nǐ hòubian shì shéi?', english: 'Who is behind you?' },
        { id: 'hsk1-l09-v02-e02', hanzi: '桌子有四条边。', pinyin: 'Zhuōzi yǒu sì tiáo biān.', english: 'The table has four edges.' },
      ],
    },
    {
      id: 'hsk1-l09-v03', hanzi: '家', pinyin: 'jiā', english: 'for families or enterprises', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l09-v03-e01', hanzi: '那是一家新书店。', pinyin: 'Nà shì yì jiā xīn shūdiàn.', english: 'That is a new bookstore.' },
        { id: 'hsk1-l09-v03-e02', hanzi: '你想去哪家店？', pinyin: 'Nǐ xiǎng qù nǎ jiā diàn?', english: 'Which shop do you want to go to?' },
      ],
    },
    {
      id: 'hsk1-l09-v04', hanzi: '那个', pinyin: 'nàge', english: 'that', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l09-v04-e01', hanzi: '那个人我认识。', pinyin: 'Nà ge rén wǒ rènshi.', english: 'I know that person.' },
        { id: 'hsk1-l09-v04-e02', hanzi: '我觉得那个菜非常好吃。', pinyin: 'Wǒ juéde nà ge cài fēicháng hǎochī.', english: 'I think that dish is extremely delicious.' },
      ],
    },
    {
      id: 'hsk1-l09-v05', hanzi: '外边', pinyin: 'wàibian', english: 'outside', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v05-e01', hanzi: '外边在下雨。', pinyin: 'Wàibian zài xià yǔ.', english: 'It is raining outside.' },
        { id: 'hsk1-l09-v05-e02', hanzi: '你学了30分钟了，看看外边吧。', pinyin: 'Nǐ xué le sānshí fēnzhōng le, kànkan wàibian ba.', english: 'You’ve studied for 30 minutes — take a look outside.' },
      ],
    },
    {
      id: 'hsk1-l09-v06', hanzi: '椅子', pinyin: 'yǐzi', english: 'chair', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l09-v06-e01', hanzi: '小猫在椅子上睡觉。', pinyin: 'Xiǎo māo zài yǐzi shang shuìjiào.', english: 'The kitten is sleeping on the chair.' },
        { id: 'hsk1-l09-v06-e02', hanzi: '椅子下边有一本书。', pinyin: 'Yǐzi xiàbian yǒu yì běn shū.', english: 'There is a book under the chair.' },
      ],
    },
    {
      id: 'hsk1-l09-v07', hanzi: '上', pinyin: 'shang/shàng', english: 'used after a noun, indicating position/higher position', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l09-v07-e01', hanzi: '书上的这些字，你认识哪个？', pinyin: 'Shū shang de zhè xiē zì, nǐ rènshi nǎ ge?', english: 'Of these characters in the book, which do you know?' },
        { id: 'hsk1-l09-v07-e02', hanzi: '桌子上面有什么？', pinyin: 'Zhuōzi shàngmiàn yǒu shénme?', english: 'What is on top of the table?' },
      ],
    },
    {
      id: 'hsk1-l09-v08', hanzi: '本', pinyin: 'běn', english: 'for books', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l09-v08-e01', hanzi: '今天发了七本书。', pinyin: 'Jīntiān fā le qī běn shū.', english: 'Seven books were handed out today.' },
        { id: 'hsk1-l09-v08-e02', hanzi: '我喜欢读这本书。', pinyin: 'Wǒ xǐhuan dú zhè běn shū.', english: 'I like reading this book.' },
      ],
    },
    {
      id: 'hsk1-l09-v09', hanzi: '书', pinyin: 'shū', english: 'book', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v09-e01', hanzi: '人要多看书。', pinyin: 'Rén yào duō kàn shū.', english: 'People should read many books.' },
        { id: 'hsk1-l09-v09-e02', hanzi: '我上午在家读书。', pinyin: 'Wǒ shàngwǔ zài jiā dú shū.', english: 'I read books at home in the morning.' },
      ],
    },
    {
      id: 'hsk1-l09-v10', hanzi: '那', pinyin: 'nà', english: 'that', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l09-v10-e01', hanzi: '那是什么？', pinyin: 'Nà shì shénme?', english: 'What is that?' },
        { id: 'hsk1-l09-v10-e02', hanzi: '那只小狗真好看！', pinyin: 'Nà zhī xiǎo gǒu zhēn hǎokàn!', english: 'That puppy is really cute!' },
      ],
    },
    {
      id: 'hsk1-l09-v11', hanzi: '第', pinyin: 'dì', english: 'marker of ordinal numbers', partOfSpeech: 'pref.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v11-e01', hanzi: '你看的第一本中文书是什么书？', pinyin: 'Nǐ kàn de dì-yī běn Zhōngwén shū shì shénme shū?', english: 'What was the first Chinese book you read?' },
        { id: 'hsk1-l09-v11-e02', hanzi: '我是第一！', pinyin: 'Wǒ shì dì-yī!', english: 'I am number one!' },
      ],
    },
    {
      id: 'hsk1-l09-v12', hanzi: '学习', pinyin: 'xuéxí', english: 'study; learn', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v12-e01', hanzi: '我要好好学习。', pinyin: 'Wǒ yào hǎohao xuéxí.', english: 'I must study hard.' },
        { id: 'hsk1-l09-v12-e02', hanzi: '他想学习中文。', pinyin: 'Tā xiǎng xuéxí Zhōngwén.', english: 'He wants to study Chinese.' },
      ],
    },
    {
      id: 'hsk1-l09-v13', hanzi: '做', pinyin: 'zuò', english: 'do; engage in', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l09-v13-e01', hanzi: '爸爸在做早饭。', pinyin: 'Bàba zài zuò zǎofàn.', english: 'Dad is making breakfast.' },
        { id: 'hsk1-l09-v13-e02', hanzi: '我有很多事要做。', pinyin: 'Wǒ yǒu hěn duō shì yào zuò.', english: 'I have many things to do.' },
      ],
    },
    {
      id: 'hsk1-l09-v14', hanzi: '白天', pinyin: 'báitiān', english: 'day; daytime', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l09-v14-e01', hanzi: '今天白天我都在家。', pinyin: 'Jīntiān báitiān wǒ dōu zài jiā.', english: 'I am at home all day today.' },
        { id: 'hsk1-l09-v14-e02', hanzi: '人们白天工作，晚上休息。', pinyin: 'Rénmen báitiān gōngzuò, wǎnshang xiūxi.', english: 'People work by day and rest at night.' },
      ],
    },
    {
      id: 'hsk1-l09-v15', hanzi: '读书', pinyin: 'dúshū', english: 'read a book', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l09-v15-e01', hanzi: '星期天我要去书店读书。', pinyin: 'Xīngqītiān wǒ yào qù shūdiàn dú shū.', english: 'On Sunday I will read at the bookstore.' },
        { id: 'hsk1-l09-v15-e02', hanzi: '妹妹非常喜欢读书。', pinyin: 'Mèimei fēicháng xǐhuan dú shū.', english: 'Younger sister really likes reading.' },
      ],
    },
    {
      id: 'hsk1-l09-v16', hanzi: '和', pinyin: 'hé', english: 'with', partOfSpeech: 'prep.',
      examples: [
        { id: 'hsk1-l09-v16-e01', hanzi: '我和你去吧。', pinyin: 'Wǒ hé nǐ qù ba.', english: 'Let me go with you.' },
        { id: 'hsk1-l09-v16-e02', hanzi: '我喜欢和我家的小狗玩。', pinyin: 'Wǒ xǐhuan hé wǒ jiā de xiǎo gǒu wán.', english: 'I like playing with our puppy.' },
      ],
    },
    {
      id: 'hsk1-l09-v17', hanzi: '朋友', pinyin: 'péngyou', english: 'friend', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v17-e01', hanzi: '我们是好朋友。', pinyin: 'Wǒmen shì hǎo péngyou.', english: 'We are good friends.' },
        { id: 'hsk1-l09-v17-e02', hanzi: '他的朋友很多。', pinyin: 'Tā de péngyou hěn duō.', english: 'He has many friends.' },
      ],
    },
    {
      id: 'hsk1-l09-v18', hanzi: '唱', pinyin: 'chàng', english: 'sing', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l09-v18-e01', hanzi: '她会唱很多中文歌。', pinyin: 'Tā huì chàng hěn duō Zhōngwén gē.', english: 'She can sing many Chinese songs.' },
        { id: 'hsk1-l09-v18-e02', hanzi: '王老师唱歌很好听。', pinyin: 'Wáng lǎoshī chàng gē hěn hǎotīng.', english: 'Teacher Wang sings very beautifully.' },
      ],
    },
    {
      id: 'hsk1-l09-v19', hanzi: '歌', pinyin: 'gē', english: 'song', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l09-v19-e01', hanzi: '妹妹喜欢唱歌。', pinyin: 'Mèimei xǐhuan chàng gē.', english: 'Younger sister likes singing.' },
        { id: 'hsk1-l09-v19-e02', hanzi: '我喜欢听法语歌。', pinyin: 'Wǒ xǐhuan tīng Fǎyǔ gē.', english: 'I like listening to French songs.' },
      ],
    },
    {
      id: 'hsk1-l09-v20', hanzi: '好听', pinyin: 'hǎotīng', english: 'pleasant to hear', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l09-v20-e01', hanzi: '他唱歌很好听。', pinyin: 'Tā chàng gē hěn hǎotīng.', english: 'He sings beautifully.' },
        { id: 'hsk1-l09-v20-e02', hanzi: '她说话真好听。', pinyin: 'Tā shuōhuà zhēn hǎotīng.', english: 'Her way of speaking is really pleasant.' },
      ],
    },
    {
      id: 'hsk1-l09-v21', hanzi: '电视', pinyin: 'diànshì', english: 'television', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l09-v21-e01', hanzi: '妹妹要看电视。', pinyin: 'Mèimei yào kàn diànshì.', english: 'Younger sister wants to watch TV.' },
        { id: 'hsk1-l09-v21-e02', hanzi: '我们去买新电视吧。', pinyin: 'Wǒmen qù mǎi xīn diànshì ba.', english: 'Let’s go buy a new TV.' },
      ],
    },
    {
      id: 'hsk1-l09-v22', hanzi: '狗', pinyin: 'gǒu', english: 'dog', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l09-v22-e01', hanzi: '我们都喜欢小狗。', pinyin: 'Wǒmen dōu xǐhuan xiǎo gǒu.', english: 'We all like puppies.' },
        { id: 'hsk1-l09-v22-e02', hanzi: '我家有一只狗。', pinyin: 'Wǒ jiā yǒu yì zhī gǒu.', english: 'My family has a dog.' },
      ],
    },
    {
      id: 'hsk1-l09-v23', hanzi: '玩', pinyin: 'wán', english: 'play; have fun', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l09-v23-e01', hanzi: '我喜欢玩电脑。', pinyin: 'Wǒ xǐhuan wán diànnǎo.', english: 'I like using the computer for fun.' },
        { id: 'hsk1-l09-v23-e02', hanzi: '回家后我和小狗玩了20分钟。', pinyin: 'Huí jiā hòu wǒ hé xiǎo gǒu wán le èrshí fēnzhōng.', english: 'After getting home I played with the puppy for 20 minutes.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l09-s01', hanzi: '电影院前边是一家超市。', pinyin: 'Diānyǐngyuàn qiánbian shì yì jiā chāoshì.', english: 'In front of the cinema is a supermarket.' },
    { id: 'hsk1-l09-s02', hanzi: '电影院前边不是超市。', pinyin: 'Diānyǐngyuàn qiánbian bù shì chāoshì.', english: 'In front of the cinema is not a supermarket.' },
    { id: 'hsk1-l09-s03', hanzi: '桌子上没有小猫。', pinyin: 'Zhuōzi shang méiyǒu xiǎo māo.', english: 'There is no kitten on the table.' },
    { id: 'hsk1-l09-s04', hanzi: '我们七点在电影院外边见。', pinyin: 'Wǒmen qī diǎn zài diānyǐngyuàn wàibian jiàn.', english: 'We meet outside the cinema at seven.' },
    { id: 'hsk1-l09-s05', hanzi: '安妮下午在家里学中文。', pinyin: 'Ānnī xiàwǔ zài jiā lǐ xué Zhōngwén.', english: 'Annie studies Chinese at home in the afternoon.' },
    { id: 'hsk1-l09-s06', hanzi: '陈天中明天中午在学校吃午饭。', pinyin: 'Chén Tiānzhōng míngtiān zhōngwǔ zài xuéxiào chī wǔfàn.', english: 'Chen Tianzhong eats lunch at school tomorrow at noon.' },
    { id: 'hsk1-l09-s07', hanzi: '第一，第二，第三', pinyin: 'Dì-yī, dì-èr, dì-sān', english: 'first, second, third' },
    { id: 'hsk1-l09-s08', hanzi: '第一个，第二个，第一本', pinyin: 'Dì-yī gè, dì-èr gè, dì-yī běn', english: 'the first one, the second one, the first volume' },
    { id: 'hsk1-l09-s09', hanzi: '第一个学生，第一本书', pinyin: 'Dì-yī gè xuéshēng, dì-yī běn shū', english: 'the first student, the first book' },
  ],
  grammar: [
    {
      id: 'hsk1-l09-g01',
      title: { en: 'Existential sentences (1)', zh: '存现句（1）' },
      focusHanzi: ['有', '是', '没有', '不是'],
      structure: '处所/位置 + 有/是 + 人/物',
      structureNegative: '处所/位置 + 没有/不是 + 人/物（不用数量词语）',
      explanation: {
        en: 'From 小语讲堂: existential sentences indicate the existence of someone or something in a specific place, generally marked by “有” or “是”. When negating, no numeral-measure word phrase is used before the object.',
        zh: '小语讲堂：存现句是表示某个地方或位置存在某人或某物的句子，一般以“有”或“是”为标记。否定时，宾语前不能使用数量词语。',
      },
      examples: [
        { id: 'hsk1-l09-d01-01', hanzi: '学校前边有一家电影院。', pinyin: 'Xuéxiào qiánbian yǒu yì jiā diānyǐngyuàn.', english: 'There is a cinema in front of the school.' },
        { id: 'hsk1-l09-s01', hanzi: '电影院前边是一家超市。', pinyin: 'Diānyǐngyuàn qiánbian shì yì jiā chāoshì.', english: 'In front of the cinema is a supermarket.' },
        { id: 'hsk1-l09-s02', hanzi: '电影院前边不是超市。', pinyin: 'Diānyǐngyuàn qiánbian bù shì chāoshì.', english: 'In front of the cinema is not a supermarket.' },
        { id: 'hsk1-l09-s03', hanzi: '桌子上没有小猫。', pinyin: 'Zhuōzi shang méiyǒu xiǎo māo.', english: 'There is no kitten on the table.' },
      ],
    },
    {
      id: 'hsk1-l09-g02',
      title: { en: 'Sequence of time and location adverbials', zh: '时间词语和处所词语同时作状语的顺序' },
      focusHanzi: ['时间词语', '处所词语'],
      structure: '时间词语 + 处所词语 + 动词',
      explanation: {
        en: 'From 小语讲堂: when time and location expressions function as adverbials simultaneously, the time expression precedes the location expression.',
        zh: '小语讲堂：时间词语和处所词语同时作状语时，时间词语要在处所词语前。',
      },
      examples: [
        { id: 'hsk1-l09-s04', hanzi: '我们七点在电影院外边见。', pinyin: 'Wǒmen qī diǎn zài diānyǐngyuàn wàibian jiàn.', english: 'We meet outside the cinema at seven.' },
        { id: 'hsk1-l09-s05', hanzi: '安妮下午在家里学中文。', pinyin: 'Ānnī xiàwǔ zài jiā lǐ xué Zhōngwén.', english: 'Annie studies Chinese at home in the afternoon.' },
        { id: 'hsk1-l09-s06', hanzi: '陈天中明天中午在学校吃午饭。', pinyin: 'Chén Tiānzhōng míngtiān zhōngwǔ zài xuéxiào chī wǔfàn.', english: 'Chen Tianzhong eats lunch at school tomorrow at noon.' },
      ],
    },
    {
      id: 'hsk1-l09-g03',
      title: { en: '“第” indicating ordinal numbers', zh: '表示序数的“第”' },
      focusHanzi: ['第'],
      structure: '第 + 数词 (+ 量词 (+ 名词))',
      explanation: {
        en: 'From 小语讲堂: “第” precedes cardinal numbers to indicate ordinal numbers: 第+numeral; 第+numeral+measure word+(noun).',
        zh: '小语讲堂：“第”位于整数的数词前，表示序数：第+数词；第+数词+量词+(名词)。',
      },
      examples: [
        { id: 'hsk1-l09-s07', hanzi: '第一，第二，第三', pinyin: 'Dì-yī, dì-èr, dì-sān', english: 'first, second, third' },
        { id: 'hsk1-l09-s08', hanzi: '第一个，第二个，第一本', pinyin: 'Dì-yī gè, dì-èr gè, dì-yī běn', english: 'the first one, the second one, the first volume' },
        { id: 'hsk1-l09-s09', hanzi: '第一个学生，第一本书', pinyin: 'Dì-yī gè xuéshēng, dì-yī běn shū', english: 'the first student, the first book' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l09-d01',
      title: { en: 'A cinema plan (Text 1)', zh: '学校前边的电影院' },
      context: { en: 'On campus, Li Wen and Bai Jiayue were chatting.', zh: '在校园里，李文和白家月在聊天儿。' },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l09-d01-01', speakerId: 'A', hanzi: '学校前边有一家电影院。', pinyin: 'Xuéxiào qiánbian yǒu yì jiā diānyǐngyuàn.', english: 'There is a cinema in front of the school.' },
        { id: 'hsk1-l09-d01-02', speakerId: 'B', hanzi: '对。我们晚上去那个电影院看电影吧。', pinyin: 'Duì. Wǒmen wǎnshang qù nàge diānyǐngyuàn kàn diānyǐng ba.', english: 'Right. Let’s go to that cinema tonight to watch a movie.' },
        { id: 'hsk1-l09-d01-03', speakerId: 'A', hanzi: '好！我们七点在电影院外边见，好吗？', pinyin: 'Hǎo! Wǒmen qī diǎn zài diānyǐngyuàn wàibian jiàn, hǎo ma?', english: 'Great! Let’s meet outside the cinema at seven — OK?' },
        { id: 'hsk1-l09-d01-04', speakerId: 'B', hanzi: '好的，晚上七点见！', pinyin: 'Hǎo de, wǎnshang qī diǎn jiàn!', english: 'OK — see you at seven tonight!' },
      ],
    },
    {
      id: 'hsk1-l09-d02',
      title: { en: 'Whose book? (Text 2)', zh: '椅子上的书' },
      context: { en: 'After class, Bai Jiayue and Chen Tianzhong were talking in the classroom.', zh: '在教室里，下课后，白家月和陈天中在对话。' },
      speakers: [
        { id: 'A', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'B', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l09-d02-01', speakerId: 'A', hanzi: '椅子上有一本中文书，那是谁的书？', pinyin: 'Yǐzi shang yǒu yì běn Zhōngwén shū, nà shì shéi de shū?', english: 'There is a Chinese book on the chair — whose book is that?' },
        { id: 'hsk1-l09-d02-02', speakerId: 'B', hanzi: '是我的书，谢谢。这是我的第二本中文书。', pinyin: 'Shì wǒ de shū, xièxie. Zhè shì wǒ de dì-èr běn Zhōngwén shū.', english: 'It’s my book, thank you. This is my second Chinese book.' },
        { id: 'hsk1-l09-d02-03', speakerId: 'A', hanzi: '不客气。你明天上午在哪儿？', pinyin: 'Bù kèqi. Nǐ míngtiān shàngwǔ zài nǎr?', english: 'You’re welcome. Where will you be tomorrow morning?' },
        { id: 'hsk1-l09-d02-04', speakerId: 'B', hanzi: '我明天上午在学校学习。', pinyin: 'Wǒ míngtiān shàngwǔ zài xuéxiào xuéxí.', english: 'I’ll be studying at school tomorrow morning.' },
      ],
    },
    {
      id: 'hsk1-l09-d03',
      title: { en: 'Weekend life (Text 3)', zh: '星期六做什么' },
      context: { en: 'In the office, Wang Yixue and Yang Tongle were talking about their weekend lives during a break.', zh: '在办公室里，休息时，王一雪和杨同乐谈论周末生活。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '杨同乐 Yáng Tónglè', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l09-d03-01', speakerId: 'A', hanzi: '明天星期六，你做什么？', pinyin: 'Míngtiān Xīngqīliù, nǐ zuò shénme?', english: 'Tomorrow is Saturday — what will you do?' },
        { id: 'hsk1-l09-d03-02', speakerId: 'B', hanzi: '我白天在家里读书，晚上和朋友们去外边唱歌。', pinyin: 'Wǒ báitiān zài jiā lǐ dú shū, wǎnshang hé péngyoumen qù wàibian chàng gē.', english: 'During the day I read at home; in the evening I go out singing with friends.' },
        { id: 'hsk1-l09-d03-03', speakerId: 'A', hanzi: '你唱歌很好听。', pinyin: 'Nǐ chàng gē hěn hǎotīng.', english: 'You sing very beautifully.' },
        { id: 'hsk1-l09-d03-04', speakerId: 'B', hanzi: '谢谢！您星期六做什么？', pinyin: 'Xièxie! Nín Xīngqīliù zuò shénme?', english: 'Thanks! What will you do on Saturday?' },
        { id: 'hsk1-l09-d03-05', speakerId: 'A', hanzi: '我在家里做饭、看电视，和孩子们、小狗玩。', pinyin: 'Wǒ zài jiā lǐ zuò fàn, kàn diànshì, hé háizimen, xiǎo gǒu wán.', english: 'I cook at home, watch TV, and play with the children and the puppy.' },
        { id: 'hsk1-l09-d03-06', speakerId: 'B', hanzi: '我也有一只小狗。', pinyin: 'Wǒ yě yǒu yì zhī xiǎo gǒu.', english: 'I also have a puppy.' },
      ],
    },
  ],
};

export default lesson09;
