/**
 * Lesson 14 — extracted from 《新HSK教程1》第14课 (New HSK Course 1, Lesson 14).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 14-2 / 14-4 / 14-6 with word-card examples,
 *    text contexts (p5/p23/p45), 小语讲堂 grammar blocks (p20/p21/p44),
 *    exercises (p19/p43/p67), pair-work activity (p69).
 *  - Textbook dialogue pages P104/P107/P109 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p6/p24/p46) corroborate the dialogues.
 *
 * The 离合词 card reuses cross-lesson clips that show separation (睡了一觉 /
 * 上了一年学) as its examples; its read-aloud page in the PDF is image-only.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson14: Lesson = {
  id: 'hsk1-l14',
  order: 14,
  title: { en: 'I watched a movie', zh: '我看了一个电影' },
  titlePinyin: 'Wǒ kànle yí gè diànyǐng',
  objectives: [
    { en: 'The aspect particle “了(2)”', zh: '动态助词“了（2）”' },
    { en: 'The scope adverb “都”', zh: '范围副词“都”' },
    { en: 'Separable words', zh: '离合词' },
    { en: 'To describe the learning process', zh: '描述学习情况' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Answer according to the text: What was everyone doing after the train departed?', zh: '根据课文内容回答问题：车开后，大家在做什么？' },
    { en: 'Answer according to the text: Why didn’t Chen Tianzhong see Ms. Wang?', zh: '根据课文内容回答问题：陈天中为什么没看见王老师？' },
    { en: 'Answer according to the text: Can Bai Jiayue write Chinese characters now?', zh: '根据课文内容回答问题：白家月会写汉字了吗？' },
    { en: 'Answer according to the text: Can Chen Tianzhong write Chinese characters now?', zh: '根据课文内容回答问题：陈天中会写汉字了吗？' },
    { en: 'Answer according to the text: Will both the daughter and the son start primary school next year?', zh: '根据课文内容回答问题：明年女儿和儿子都要上小学吗？' },
    { en: 'Answer according to the text: Will they be busy after starting school?', zh: '根据课文内容回答问题：上学后，他们忙不忙？' },
    { en: 'Pair work: talk about what you did last Saturday or Sunday.', zh: '双人活动：两人一组，说说上星期六或星期日你都做了什么。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l14-v01', hanzi: '上', pinyin: 'shàng', english: 'go up', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l14-v01-e01', hanzi: '我们什么时候上飞机？', pinyin: 'Wǒmen shénme shíhou shàng fēijī?', english: 'When do we board the plane?' },
        { id: 'hsk1-l14-v01-e02', hanzi: '上车后，我睡了一觉。', pinyin: 'Shàng chē hòu, wǒ shuì le yí jiào.', english: 'After getting in the car, I had a sleep.' },
      ],
    },
    {
      id: 'hsk1-l14-v02', hanzi: '火车', pinyin: 'huǒchē', english: 'train', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v02-e01', hanzi: '我们坐火车去北京吧。', pinyin: 'Wǒmen zuò huǒchē qù Běijīng ba.', english: 'Let’s take the train to Beijing.' },
        { id: 'hsk1-l14-v02-e02', hanzi: '你们的火车几点开？', pinyin: 'Nǐmen de huǒchē jǐ diǎn kāi?', english: 'What time does your train depart?' },
      ],
    },
    {
      id: 'hsk1-l14-v03', hanzi: '中午', pinyin: 'zhōngwǔ', english: 'noon', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v03-e01', hanzi: '今天中午真热！', pinyin: 'Jīntiān zhōngwǔ zhēn rè!', english: 'It’s really hot at noon today!' },
        { id: 'hsk1-l14-v03-e02', hanzi: '我们中午去北京饭店吃饭吧。', pinyin: 'Wǒmen zhōngwǔ qù Běijīng Fàndiàn chīfàn ba.', english: 'Let’s eat at the Beijing Restaurant at noon.' },
      ],
    },
    {
      id: 'hsk1-l14-v04', hanzi: '开', pinyin: 'kāi', english: '(of vehicles) depart; leave', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l14-v04-e01', hanzi: '看，火车开了。', pinyin: 'Kàn, huǒchē kāi le.', english: 'Look — the train has departed.' },
        { id: 'hsk1-l14-v04-e02', hanzi: '车什么时候开？', pinyin: 'Chē shénme shíhou kāi?', english: 'When does the vehicle leave?' },
      ],
    },
    {
      id: 'hsk1-l14-v05', hanzi: '有些', pinyin: 'yǒuxiē', english: '(indicating a part) some', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l14-v05-e01', hanzi: '有些学生在上课，有些在外面玩。', pinyin: 'Yǒuxiē xuéshēng zài shàngkè, yǒuxiē zài wàimian wán.', english: 'Some students are in class; some are playing outside.' },
        { id: 'hsk1-l14-v05-e02', hanzi: '有些人不喜欢看书，喜欢看电影。', pinyin: 'Yǒuxiē rén bù xǐhuan kànshū, xǐhuan kàn diànyǐng.', english: 'Some people don’t like reading — they like watching movies.' },
      ],
    },
    {
      id: 'hsk1-l14-v06', hanzi: '有的', pinyin: 'yǒude', english: 'some', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l14-v06-e01', hanzi: '有的人喜欢吃包子，有的人喜欢吃面条儿。', pinyin: 'Yǒude rén xǐhuan chī bāozi, yǒude rén xǐhuan chī miàntiáor.', english: 'Some people like buns; some like noodles.' },
        { id: 'hsk1-l14-v06-e02', hanzi: '有的小朋友在玩，有的在看书。', pinyin: 'Yǒude xiǎopéngyou zài wán, yǒude zài kànshū.', english: 'Some kids are playing; some are reading.' },
        { id: 'hsk1-l14-v06-e03', hanzi: '这些书有的还是新书呢。', pinyin: 'Zhèxiē shū yǒude hái shì xīn shū ne.', english: 'Some of these books are still new.' },
      ],
    },
    {
      id: 'hsk1-l14-v07', hanzi: '了', pinyin: 'le', english: 'used after a verb to indicate the completion of an action', partOfSpeech: 'part.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v07-e01', hanzi: '你们吃了饭再回家吧。', pinyin: 'Nǐmen chī le fàn zài huí jiā ba.', english: 'Eat first, then go home.' },
        { id: 'hsk1-l14-v07-e02', hanzi: '我买了一只小狗。', pinyin: 'Wǒ mǎi le yì zhī xiǎo gǒu.', english: 'I bought a puppy.' },
      ],
    },
    {
      id: 'hsk1-l14-v08', hanzi: '写', pinyin: 'xiě', english: 'write', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v08-e01', hanzi: '请在这里写你的名字。', pinyin: 'Qǐng zài zhèlǐ xiě nǐ de míngzi.', english: 'Please write your name here.' },
        { id: 'hsk1-l14-v08-e02', hanzi: '她会写一些汉字。', pinyin: 'Tā huì xiě yìxiē Hànzì.', english: 'She can write some Chinese characters.' },
      ],
    },
    {
      id: 'hsk1-l14-v09', hanzi: '都', pinyin: 'dōu', english: 'all; both', partOfSpeech: 'adv.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v09-e01', hanzi: '这个电影大家都觉得很好。', pinyin: 'Zhège diànyǐng dàjiā dōu juéde hěn hǎo.', english: 'Everyone thinks this movie is very good.' },
        { id: 'hsk1-l14-v09-e02', hanzi: '他们都是我的朋友。', pinyin: 'Tāmen dōu shì wǒ de péngyou.', english: 'They are all my friends.' },
      ],
    },
    {
      id: 'hsk1-l14-v10', hanzi: '听见', pinyin: 'tīngjiàn', english: 'hear', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l14-v10-e01', hanzi: '我说的话你听见了吗？对不起，我没听见。', pinyin: 'Wǒ shuō de huà nǐ tīngjiàn le ma? Duìbuqǐ, wǒ méi tīngjiàn.', english: 'A: Did you hear what I said? B: Sorry, I didn’t hear.' },
        { id: 'hsk1-l14-v10-e02', hanzi: '我听不见老师说的话。', pinyin: 'Wǒ tīng bú jiàn lǎoshī shuō de huà.', english: 'I can’t hear what the teacher says.' },
      ],
    },
    {
      id: 'hsk1-l14-v11', hanzi: '不要', pinyin: 'búyào', english: 'don’t', partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l14-v11-e01', hanzi: '不要唱歌了，爸爸在工作呢。', pinyin: 'Búyào chàng gē le, bàba zài gōngzuò ne.', english: 'Don’t sing — Dad is working.' },
        { id: 'hsk1-l14-v11-e02', hanzi: '你不要说了，我不想听。', pinyin: 'Nǐ búyào shuō le, wǒ bù xiǎng tīng.', english: 'Stop talking — I don’t want to listen.' },
      ],
    },
    {
      id: 'hsk1-l14-v12', hanzi: '说话', pinyin: 'shuōhuà', english: 'say; speak; talk', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v12-e01', hanzi: '我女儿两岁了，还不会说话呢。', pinyin: 'Wǒ nǚ’ér liǎng suì le, hái bú huì shuōhuà ne.', english: 'My daughter is two and still can’t talk.' },
        { id: 'hsk1-l14-v12-e02', hanzi: '昨天他和我说了很多话。', pinyin: 'Zuótiān tā hé wǒ shuō le hěn duō huà.', english: 'He talked with me a lot yesterday.' },
      ],
    },
    {
      id: 'hsk1-l14-v13', hanzi: '听', pinyin: 'tīng', english: 'listen to; hear', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v13-e01', hanzi: '她很喜欢听中文歌。', pinyin: 'Tā hěn xǐhuan tīng Zhōngwén gē.', english: 'She really likes listening to Chinese songs.' },
        { id: 'hsk1-l14-v13-e02', hanzi: '你听，火车来了。', pinyin: 'Nǐ tīng, huǒchē lái le.', english: 'Listen — the train is coming.' },
      ],
    },
    {
      id: 'hsk1-l14-v14', hanzi: '哪些', pinyin: 'nǎxiē', english: 'which', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l14-v14-e01', hanzi: '哪些书是你的？', pinyin: 'Nǎxiē shū shì nǐ de?', english: 'Which books are yours?' },
        { id: 'hsk1-l14-v14-e02', hanzi: '今天我们要做哪些事？', pinyin: 'Jīntiān wǒmen yào zuò nǎxiē shì?', english: 'Which things must we do today?' },
      ],
    },
    {
      id: 'hsk1-l14-v15', hanzi: '字', pinyin: 'zì', english: 'character; word', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v15-e01', hanzi: '我弟弟还不会写字。', pinyin: 'Wǒ dìdi hái bú huì xiě zì.', english: 'My younger brother still can’t write characters.' },
        { id: 'hsk1-l14-v15-e02', hanzi: '他写了20个字，想休息一下。', pinyin: 'Tā xiě le èrshí gè zì, xiǎng xiūxi yíxià.', english: 'He wrote 20 characters and wants a short break.' },
      ],
    },
    {
      id: 'hsk1-l14-v16', hanzi: '汉语', pinyin: 'Hànyǔ', english: 'Chinese language', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v16-e01', hanzi: '我喜欢学汉语。', pinyin: 'Wǒ xǐhuan xué Hànyǔ.', english: 'I like studying Chinese.' },
        { id: 'hsk1-l14-v16-e02', hanzi: '他是我们的汉语老师。', pinyin: 'Tā shì wǒmen de Hànyǔ lǎoshī.', english: 'He is our Chinese teacher.' },
      ],
    },
    {
      id: 'hsk1-l14-v17', hanzi: '汉字', pinyin: 'Hànzì', english: 'Chinese character', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v17-e01', hanzi: '我想学习写汉字。', pinyin: 'Wǒ xiǎng xuéxí xiě Hànzì.', english: 'I want to learn to write Chinese characters.' },
        { id: 'hsk1-l14-v17-e02', hanzi: '他觉得写汉字非常好玩。', pinyin: 'Tā juéde xiě Hànzì fēicháng hǎowán.', english: 'He finds writing Chinese characters great fun.' },
      ],
    },
    {
      id: 'hsk1-l14-v18', hanzi: '明年', pinyin: 'míngnián', english: 'next year', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v18-e01', hanzi: '明年哥哥上大学。', pinyin: 'Míngnián gēge shàng dàxué.', english: 'Elder brother starts university next year.' },
        { id: 'hsk1-l14-v18-e02', hanzi: '我们明年要去北京玩。', pinyin: 'Wǒmen míngnián yào qù Běijīng wán.', english: 'We are going to visit Beijing next year.' },
      ],
    },
    {
      id: 'hsk1-l14-v19', hanzi: '上', pinyin: 'shàng', english: 'begin to do sth at a fixed time', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l14-v19-e01', hanzi: '我八点上课。', pinyin: 'Wǒ bā diǎn shàngkè.', english: 'My class starts at eight.' },
        { id: 'hsk1-l14-v19-e02', hanzi: '弟弟明年上小学。', pinyin: 'Dìdi míngnián shàng xiǎoxué.', english: 'Younger brother starts primary school next year.' },
      ],
    },
    {
      id: 'hsk1-l14-v20', hanzi: '中学', pinyin: 'zhōngxué', english: 'middle school', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v20-e01', hanzi: '这是我的中学。', pinyin: 'Zhè shì wǒ de zhōngxué.', english: 'This is my middle school.' },
        { id: 'hsk1-l14-v20-e02', hanzi: '上中学后，姐姐中午不回家了。', pinyin: 'Shàng zhōngxué hòu, jiějie zhōngwǔ bù huí jiā le.', english: 'After starting middle school, elder sister doesn’t come home at noon.' },
      ],
    },
    {
      id: 'hsk1-l14-v21', hanzi: '小学', pinyin: 'xiǎoxué', english: 'primary school', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v21-e01', hanzi: '我爸爸是小学老师。', pinyin: 'Wǒ bàba shì xiǎoxué lǎoshī.', english: 'My father is a primary-school teacher.' },
        { id: 'hsk1-l14-v21-e02', hanzi: '我的小学很大、很漂亮。', pinyin: 'Wǒ de xiǎoxué hěn dà, hěn piàoliang.', english: 'My primary school is big and very pretty.' },
      ],
    },
    {
      id: 'hsk1-l14-v22', hanzi: '中学生', pinyin: 'zhōngxuéshēng', english: 'middle school student', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v22-e01', hanzi: '他儿子13岁，是中学生了。', pinyin: 'Tā érzi shísān suì, shì zhōngxuéshēng le.', english: 'His son is 13 — a middle-school student now.' },
        { id: 'hsk1-l14-v22-e02', hanzi: '这些中学生很喜欢学习。', pinyin: 'Zhèxiē zhōngxuéshēng hěn xǐhuan xuéxí.', english: 'These middle-school students really like studying.' },
      ],
    },
    {
      id: 'hsk1-l14-v23', hanzi: '小学生', pinyin: 'xiǎoxuéshēng', english: 'primary school student', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l14-v23-e01', hanzi: '他们都是小学生。', pinyin: 'Tāmen dōu shì xiǎoxuéshēng.', english: 'They are all primary-school students.' },
        { id: 'hsk1-l14-v23-e02', hanzi: '小学生要多读书。', pinyin: 'Xiǎoxuéshēng yào duō dúshū.', english: 'Primary pupils should read more.' },
      ],
    },
    {
      id: 'hsk1-l14-v24', hanzi: '上学', pinyin: 'shàngxué', english: 'start school; go to school', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l14-v24-e01', hanzi: '我今天生病了，不去上学。', pinyin: 'Wǒ jīntiān shēngbìng le, bú qù shàngxué.', english: 'I’m ill today — I’m not going to school.' },
        { id: 'hsk1-l14-v24-e02', hanzi: '妹妹上了一年学，学了很多东西。', pinyin: 'Mèimei shàng le yì nián xué, xué le hěn duō dōngxi.', english: 'Little sister has been at school a year and learned many things.' },
      ],
    },
    {
      id: 'hsk1-l14-v25', hanzi: '他们', pinyin: 'tāmen', english: 'they; them', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l14-v25-e01', hanzi: '他们都是爸爸的朋友。', pinyin: 'Tāmen dōu shì bàba de péngyou.', english: 'They are all Dad’s friends.' },
        { id: 'hsk1-l14-v25-e02', hanzi: '我昨天看见他们了。', pinyin: 'Wǒ zuótiān kànjiàn tāmen le.', english: 'I saw them yesterday.' },
      ],
    },
    {
      id: 'hsk1-l14-v26', hanzi: '她们', pinyin: 'tāmen', english: '(referring to female people) they; them', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l14-v26-e01', hanzi: '她们三个人是好朋友。', pinyin: 'Tāmen sān ge rén shì hǎo péngyou.', english: 'The three of them are good friends.' },
        { id: 'hsk1-l14-v26-e02', hanzi: '她们都喜欢听歌、看电影。', pinyin: 'Tāmen dōu xǐhuan tīng gē, kàn diànyǐng.', english: 'They all like listening to songs and watching movies.' },
      ],
    },
    {
      id: 'hsk1-l14-v27', hanzi: '它们', pinyin: 'tāmen', english: '(plural of 它) they; them; their', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l14-v27-e01', hanzi: '我家有一只猫和一只狗，我很喜欢它们。', pinyin: 'Wǒ jiā yǒu yì zhī māo hé yì zhī gǒu, wǒ hěn xǐhuan tāmen.', english: 'We have a cat and a dog — I like them very much.' },
        { id: 'hsk1-l14-v27-e02', hanzi: '它们都在椅子上睡觉呢。', pinyin: 'Tāmen dōu zài yǐzi shang shuìjiào ne.', english: 'They are both sleeping on the chair.' },
      ],
    },
    {
      id: 'hsk1-l14-v28', hanzi: '晚', pinyin: 'wǎn', english: 'late', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l14-v28-e01', hanzi: '太晚了，我们回家吧。', pinyin: 'Tài wǎn le, wǒmen huí jiā ba.', english: 'It’s too late — let’s go home.' },
        { id: 'hsk1-l14-v28-e02', hanzi: '对不起，我今天来晚了。', pinyin: 'Duìbuqǐ, wǒ jīntiān lái wǎn le.', english: 'Sorry — I came late today.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l14-s01', hanzi: '我看了一个电影。', pinyin: 'Wǒ kànle yí gè diànyǐng.', english: 'I watched a movie.' },
    { id: 'hsk1-l14-s02', hanzi: '我买了一个新电脑。', pinyin: 'Wǒ mǎile yí gè xīn diànnǎo.', english: 'I bought a new computer.' },
    { id: 'hsk1-l14-s03', hanzi: '我昨天没去商店买东西。', pinyin: 'Wǒ zuótiān méi qù shāngdiàn mǎi dōngxi.', english: 'I didn’t go to the shop to buy things yesterday.' },
    { id: 'hsk1-l14-s04', hanzi: '我们都会写了。', pinyin: 'Wǒmen dōu huì xiě le.', english: 'We can all write them now.' },
    { id: 'hsk1-l14-s05', hanzi: '我和我的朋友们都去。', pinyin: 'Wǒ hé wǒ de péngyoumen dōu qù.', english: 'My friends and I are all going.' },
    { id: 'hsk1-l14-s06', hanzi: '同学们都没听见。', pinyin: 'Tóngxuémen dōu méi tīngjiàn.', english: 'The classmates all didn’t hear.' },
  ],
  grammar: [
    {
      id: 'hsk1-l14-g01',
      title: { en: 'The aspect particle “了 (2)”', zh: '动态助词“了(2)”' },
      focusHanzi: ['了', '没'],
      structure: '动词 + 了',
      structureNegative: '没 + 动词',
      explanation: {
        en: 'From 小语讲堂: Verb+了 indicates that an action has occurred or been completed; negation uses 没+Verb.',
        zh: '小语讲堂：动词+了，表示动作行为已经发生或完成。表示否定：没+动词。',
      },
      examples: [
        { id: 'hsk1-l14-s01', hanzi: '我看了一个电影。', pinyin: 'Wǒ kànle yí gè diànyǐng.', english: 'I watched a movie.' },
        { id: 'hsk1-l14-s02', hanzi: '我买了一个新电脑。', pinyin: 'Wǒ mǎile yí gè xīn diànnǎo.', english: 'I bought a new computer.' },
        { id: 'hsk1-l14-s03', hanzi: '我昨天没去商店买东西。', pinyin: 'Wǒ zuótiān méi qù shāngdiàn mǎi dōngxi.', english: 'I didn’t go to the shop to buy things yesterday.' },
      ],
    },
    {
      id: 'hsk1-l14-g02',
      title: { en: 'Separable words (1)', zh: '离合词（1）' },
      focusHanzi: ['上课', '下课', '上班', '下班', '说话', '读书', '睡觉', '看病', '生病'],
      structure: '上课、下课、上班、下班、说话、读书、睡觉、看病、生病',
      explanation: {
        en: 'From 小语讲堂: these verbal structures can be combined or separated — combined they function as single words; with elements inserted between their components they become phrases. When split, the insertable elements are limited.',
        zh: '小语讲堂：“上课、下课、上班、下班、说话、读书、睡觉、看病、生病”等是一类特殊的动词结构，可分可合：合在一起时是词，中间加其他成分则变成短语。离合词分离时，可插入的成分有限。',
      },
      examples: [
        { id: 'hsk1-l14-v01-e02', hanzi: '上车后，我睡了一觉。', pinyin: 'Shàng chē hòu, wǒ shuì le yí jiào.', english: 'After getting in the car, I had a sleep.' },
        { id: 'hsk1-l14-v24-e02', hanzi: '妹妹上了一年学，学了很多东西。', pinyin: 'Mèimei shàng le yì nián xué, xué le hěn duō dōngxi.', english: 'Little sister has been at school a year and learned many things.' },
      ],
    },
    {
      id: 'hsk1-l14-g03',
      title: { en: 'The scope adverb “都”', zh: '范围副词“都”' },
      focusHanzi: ['都'],
      structure: '总括对象 + 都 + 动词',
      structureNegative: '总括对象 + 都 + 没/不 + 动词',
      explanation: {
        en: 'From 小语讲堂: the scope adverb 都 means “all/in general”; the object being generalized is placed BEFORE 都, and when negating, the negative word is placed AFTER 都.',
        zh: '小语讲堂：范围副词“都”表示全部、总括，总括的对象在“都”前。否定时，否定词在“都”后。',
      },
      examples: [
        { id: 'hsk1-l14-s04', hanzi: '我们都会写了。', pinyin: 'Wǒmen dōu huì xiě le.', english: 'We can all write them now.' },
        { id: 'hsk1-l14-s05', hanzi: '我和我的朋友们都去。', pinyin: 'Wǒ hé wǒ de péngyoumen dōu qù.', english: 'My friends and I are all going.' },
        { id: 'hsk1-l14-s06', hanzi: '同学们都没听见。', pinyin: 'Tóngxuémen dōu méi tīngjiàn.', english: 'The classmates all didn’t hear.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l14-d01',
      title: { en: 'The school trip (Text 1)', zh: '课外旅行' },
      context: { en: 'After class, Bai Jiayue and Chen Tianzhong were talking about their last school trip in the classroom.', zh: '在教室里，下课后，白家月和陈天中在谈论上一次课外旅行。' },
      speakers: [
        { id: 'A', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'B', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l14-d01-01', speakerId: 'A', hanzi: '你们上火车后看见王老师了吗？', pinyin: 'Nǐmen shàng huǒchē hòu kànjiàn Wáng lǎoshī le ma?', english: 'After you got on the train, did you see Ms. Wang?' },
        { id: 'hsk1-l14-d01-02', speakerId: 'B', hanzi: '没看见。中午车开后，有些人在看书，有些人睡觉了。', pinyin: 'Méi kànjiàn. Zhōngwǔ chē kāi hòu, yǒuxiē rén zài kànshū, yǒuxiē rén shuìjiào le.', english: 'No. After the train left at noon, some people were reading, some fell asleep.' },
        { id: 'hsk1-l14-d01-03', speakerId: 'A', hanzi: '你呢？', pinyin: 'Nǐ ne?', english: 'And you?' },
        { id: 'hsk1-l14-d01-04', speakerId: 'B', hanzi: '我看了一个电影。', pinyin: 'Wǒ kànle yí gè diànyǐng.', english: 'I watched a movie.' },
      ],
    },
    {
      id: 'hsk1-l14-d02',
      title: { en: 'In class (Text 2)', zh: '会写汉字了吗' },
      context: { en: 'In class, Wang Yifei was asking the students about their learning progress.', zh: '在课堂上，王一飞询问学生们的学习情况。' },
      speakers: [
        { id: 'A', name: '王一飞 Wáng Yīfēi', voice: 'female' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'C', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l14-d02-01', speakerId: 'A', hanzi: '你们会说汉语了，也会写汉字了吗？', pinyin: 'Nǐmen huì shuō Hànyǔ le, yě huì xiě Hànzì le ma?', english: 'You can speak Chinese now — can you write Chinese characters too?' },
        { id: 'hsk1-l14-d02-02', speakerId: 'B', hanzi: '我们都会写了。', pinyin: 'Wǒmen dōu huì xiě le.', english: 'We can all write them now.' },
        { id: 'hsk1-l14-d02-03', speakerId: 'C', hanzi: '老师，我听不见。', pinyin: 'Lǎoshī, wǒ tīng bú jiàn.', english: 'Teacher, I can’t hear.' },
        { id: 'hsk1-l14-d02-04', speakerId: 'A', hanzi: '请大家不要说话！请听老师的问题：你们都会写哪些汉字了？', pinyin: 'Qǐng dàjiā búyào shuōhuà! Qǐng tīng lǎoshī de wèntí: Nǐmen dōu huì xiě nǎxiē Hànzì le?', english: 'Everyone, no talking! Listen to the teacher’s question: which characters can you all write now?' },
        { id: 'hsk1-l14-d02-05', speakerId: 'C', hanzi: '我会写这些字了，您看！', pinyin: 'Wǒ huì xiě zhèxiē zì le, nín kàn!', english: 'I can write these characters now — look!' },
      ],
    },
    {
      id: 'hsk1-l14-d03',
      title: { en: 'The kids start school (Text 3)', zh: '孩子上学' },
      context: { en: 'At home, Liu Ming and Wang Yixue were talking about their children’s school admission.', zh: '在家里，刘明和王一雪在谈论孩子的升学情况。' },
      speakers: [
        { id: 'A', name: '刘明 Liú Míng', voice: 'male2' },
        { id: 'B', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
      ],
      lines: [
        { id: 'hsk1-l14-d03-01', speakerId: 'A', hanzi: '明年女儿上中学。', pinyin: 'Míngnián nǚ’ér shàng zhōngxué.', english: 'Next year our daughter starts middle school.' },
        { id: 'hsk1-l14-d03-02', speakerId: 'B', hanzi: '对。儿子也上小学了。', pinyin: 'Duì. Érzi yě shàng xiǎoxué le.', english: 'Right. Our son has started primary school too.' },
        { id: 'hsk1-l14-d03-03', speakerId: 'A', hanzi: '我们家有了一个中学生。', pinyin: 'Wǒmen jiā yǒule yí gè zhōngxuéshēng.', english: 'Our family has a middle-school student now.' },
        { id: 'hsk1-l14-d03-04', speakerId: 'B', hanzi: '还有了一个小学生。', pinyin: 'Hái yǒule yí gè xiǎoxuéshēng.', english: 'And a primary-school student too.' },
        { id: 'hsk1-l14-d03-05', speakerId: 'A', hanzi: '上学后，他们都忙了。', pinyin: 'Shàngxué hòu, tāmen dōu máng le.', english: 'After starting school, they’ve all become busy.' },
        { id: 'hsk1-l14-d03-06', speakerId: 'B', hanzi: '是的。太晚了，睡觉吧。', pinyin: 'Shì de. Tài wǎn le, shuìjiào ba.', english: 'Yes. It’s too late — let’s sleep.' },
      ],
    },
  ],
};

export default lesson14;
