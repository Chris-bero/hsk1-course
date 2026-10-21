/**
 * Lesson 15 — extracted from 《新HSK教程1》第15课 (New HSK Course 1, Lesson 15).
 * FINAL LESSON — completes the 15-lesson course.
 * Sources:
 *  - PDF: objectives (p3), new-word lists 15-2 / 15-4 / 15-6 with word-card examples,
 *    text contexts (p5/p14/p26), 小语讲堂 grammar block (p13),
 *    exercises (p7/p28), role-play activity (p48).
 *  - Textbook dialogue pages P113/P115/P117 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p6/p15/p27) corroborate the dialogues.
 *
 * Voice note: Text 3 has three female speakers; with only two working female
 * neural voices, 安妮 uses female2 (same as 白家月, never adjacent in this
 * dialogue). Her Lesson 3 clips were regenerated to keep one voice per character.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson15: Lesson = {
  id: 'hsk1-l15',
  order: 15,
  title: { en: 'See you at Daxing Airport!', zh: '大兴机场见！' },
  titlePinyin: 'Dàxīng Jīchǎng jiàn!',
  objectives: [
    { en: 'To express travel intentions and plans', zh: '表达旅行意愿、计划' },
    { en: 'The coordinate compound sentence “……，还/也……”', zh: '并列复句“……，还/也……”' },
    { en: 'Chinese dining culture and hospitality etiquette', zh: '中国餐桌文化、待客礼仪' },
    { en: 'Beijing, the capital of China', zh: '中国的首都——北京' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Answer according to the text: Which dish does Bai Jiayue like?', zh: '根据课文内容回答问题：白家月爱吃哪个菜？' },
    { en: 'Answer according to the text: Is Li Wen’s cooking delicious or not?', zh: '根据课文内容回答问题：李文做饭好吃不好吃？' },
    { en: 'Answer according to the text: Where is Daxing Airport?', zh: '根据课文内容回答问题：大兴机场在哪儿？' },
    { en: 'Answer according to the text: Can Ms. Wang’s sister pick up Bai Jiayue and Annie?', zh: '根据课文内容回答问题：王老师的姐姐可以去接白家月和安妮吗？' },
    { en: 'Role-play: three students play Li Wen, Chen Tianzhong and Bai Jiayue — Li Wen invites them over and they cook Chinese food together.', zh: '角色扮演：三个人分别扮演李文、陈天中和白家月，李文邀请陈天中和白家月做客，一起做中国菜。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l15-v01', hanzi: '爱', pinyin: 'ài', english: 'like; be fond of', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v01-e01', hanzi: '你爱看什么电影？', pinyin: 'Nǐ ài kàn shénme diànyǐng?', english: 'What movies do you like watching?' },
        { id: 'hsk1-l15-v01-e02', hanzi: '姐姐很爱学习。', pinyin: 'Jiějie hěn ài xuéxí.', english: 'Elder sister loves studying.' },
      ],
    },
    {
      id: 'hsk1-l15-v02', hanzi: '哪个', pinyin: 'nǎge', english: 'which', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l15-v02-e01', hanzi: '这两个手机，你想买哪个？', pinyin: 'Zhè liǎng gè shǒujī, nǐ xiǎng mǎi nǎge?', english: 'Of these two phones, which do you want to buy?' },
        { id: 'hsk1-l15-v02-e02', hanzi: '哪件衣服是你的？', pinyin: 'Nǎ jiàn yīfu shì nǐ de?', english: 'Which piece of clothing is yours?' },
      ],
    },
    {
      id: 'hsk1-l15-v03', hanzi: '去年', pinyin: 'qùnián', english: 'last year', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l15-v03-e01', hanzi: '去年我还在上中学。', pinyin: 'Qùnián wǒ hái zài shàng zhōngxué.', english: 'Last year I was still in middle school.' },
        { id: 'hsk1-l15-v03-e02', hanzi: '那是去年的事了。', pinyin: 'Nà shì qùnián de shì le.', english: 'That was last year’s business.' },
      ],
    },
    {
      id: 'hsk1-l15-v04', hanzi: '男朋友', pinyin: 'nánpéngyou', english: 'boyfriend', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l15-v04-e01', hanzi: '她的男朋友是医生。', pinyin: 'Tā de nánpéngyou shì yīshēng.', english: 'Her boyfriend is a doctor.' },
        { id: 'hsk1-l15-v04-e02', hanzi: '我和我男朋友是中学同学。', pinyin: 'Wǒ hé wǒ nánpéngyou shì zhōngxué tóngxué.', english: 'My boyfriend and I were middle-school classmates.' },
      ],
    },
    {
      id: 'hsk1-l15-v05', hanzi: '几', pinyin: 'jǐ', english: 'a few; several', partOfSpeech: 'num.',
      examples: [
        { id: 'hsk1-l15-v05-e01', hanzi: '几天前我看见他了。', pinyin: 'Jǐ tiān qián wǒ kànjiàn tā le.', english: 'I saw him a few days ago.' },
        { id: 'hsk1-l15-v05-e02', hanzi: '我想去书店买几本书。', pinyin: 'Wǒ xiǎng qù shūdiàn mǎi jǐ běn shū.', english: 'I want to buy a few books at the bookstore.' },
      ],
    },
    {
      id: 'hsk1-l15-v06', hanzi: '年', pinyin: 'nián', english: 'year', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l15-v06-e01', hanzi: '你来中国几年了？', pinyin: 'Nǐ lái Zhōngguó jǐ nián le?', english: 'How many years have you been in China?' },
        { id: 'hsk1-l15-v06-e02', hanzi: '他学习中文两年了。', pinyin: 'Tā xuéxí Zhōngwén liǎng nián le.', english: 'He has been studying Chinese for two years.' },
      ],
    },
    {
      id: 'hsk1-l15-v07', hanzi: '好玩儿', pinyin: 'hǎowánr', english: 'fun; interesting', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l15-v07-e01', hanzi: '我觉得这里不太好玩儿。', pinyin: 'Wǒ juéde zhèlǐ bú tài hǎowánr.', english: 'I don’t find this place very fun.' },
        { id: 'hsk1-l15-v07-e02', hanzi: '北京好玩儿吗？', pinyin: 'Běijīng hǎowánr ma?', english: 'Is Beijing fun?' },
      ],
    },
    {
      id: 'hsk1-l15-v08', hanzi: '西安', pinyin: 'Xī’ān', english: 'Xi’an',
      examples: [
      ],
    },
    {
      id: 'hsk1-l15-v09', hanzi: '北京', pinyin: 'Běijīng', english: 'Beijing',
      examples: [
      ],
    },
    {
      id: 'hsk1-l15-v10', hanzi: '飞机', pinyin: 'fēijī', english: 'plane', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v10-e01', hanzi: '我们坐飞机去北京吧。', pinyin: 'Wǒmen zuò fēijī qù Běijīng ba.', english: 'Let’s fly to Beijing.' },
        { id: 'hsk1-l15-v10-e02', hanzi: '在飞机上，我认识了一个中国朋友。', pinyin: 'Zài fēijī shang, wǒ rènshile yí gè Zhōngguó péngyou.', english: 'On the plane I met a Chinese friend.' },
      ],
    },
    {
      id: 'hsk1-l15-v11', hanzi: '要', pinyin: 'yào', english: 'need; take', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l15-v11-e01', hanzi: '你做饭要几个鸡蛋？', pinyin: 'Nǐ zuò fàn yào jǐ gè jīdàn?', english: 'How many eggs do you need for the cooking?' },
        { id: 'hsk1-l15-v11-e02', hanzi: '你买电脑要多少钱？', pinyin: 'Nǐ mǎi diànnǎo yào duōshao qián?', english: 'How much does the computer cost you?' },
        { id: 'hsk1-l15-v11-e03', hanzi: '我们开车去西安要六个小时。', pinyin: 'Wǒmen kāichē qù Xī’ān yào liù gè xiǎoshí.', english: 'Driving to Xi’an takes us six hours.' },
      ],
    },
    {
      id: 'hsk1-l15-v12', hanzi: '小时', pinyin: 'xiǎoshí', english: 'hour', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v12-e01', hanzi: '我们两个小时后在学校书店见。', pinyin: 'Wǒmen liǎng gè xiǎoshí hòu zài xuéxiào shūdiàn jiàn.', english: 'Let’s meet at the school bookstore in two hours.' },
        { id: 'hsk1-l15-v12-e02', hanzi: '我今天上了四个小时的课。', pinyin: 'Wǒ jīntiān shàngle sì gè xiǎoshí de kè.', english: 'I had four hours of classes today.' },
      ],
    },
    {
      id: 'hsk1-l15-v13', hanzi: '家人', pinyin: 'jiārén', english: 'family (member)', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l15-v13-e01', hanzi: '我爱我的家人。', pinyin: 'Wǒ ài wǒ de jiārén.', english: 'I love my family.' },
        { id: 'hsk1-l15-v13-e02', hanzi: '星期天我想和家人去外边玩。', pinyin: 'Xīngqītiān wǒ xiǎng hé jiārén qù wàibian wán.', english: 'On Sunday I want to go out with my family.' },
      ],
    },
    {
      id: 'hsk1-l15-v14', hanzi: '时间', pinyin: 'shíjiān', english: '(duration of) time', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v14-e01', hanzi: '我现在很忙，没有时间。', pinyin: 'Wǒ xiànzài hěn máng, méiyǒu shíjiān.', english: 'I’m very busy now — I have no time.' },
        { id: 'hsk1-l15-v14-e02', hanzi: '你在这家公司工作多长时间了？', pinyin: 'Nǐ zài zhè jiā gōngsī gōngzuò duō cháng shíjiān le?', english: 'How long have you worked at this company?' },
      ],
    },
    {
      id: 'hsk1-l15-v15', hanzi: '机场', pinyin: 'jīchǎng', english: 'airport', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v15-e01', hanzi: '我们去机场要多长时间？', pinyin: 'Wǒmen qù jīchǎng yào duō cháng shíjiān?', english: 'How long does it take us to get to the airport?' },
        { id: 'hsk1-l15-v15-e02', hanzi: '明天早上我要去机场接朋友。', pinyin: 'Míngtiān zǎoshang wǒ yào qù jīchǎng jiē péngyou.', english: 'Tomorrow morning I’m going to the airport to pick up a friend.' },
      ],
    },
    {
      id: 'hsk1-l15-v16', hanzi: '接', pinyin: 'jiē', english: 'meet; welcome', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v16-e01', hanzi: '妈妈来学校接我回家。', pinyin: 'Māma lái xuéxiào jiē wǒ huí jiā.', english: 'Mom comes to school to fetch me home.' },
        { id: 'hsk1-l15-v16-e02', hanzi: '下午四点，你可以去接一下王先生吗？', pinyin: 'Xiàwǔ sì diǎn, nǐ kěyǐ qù jiē yíxià Wáng xiānsheng ma?', english: 'At 4 pm, could you go pick up Mr. Wang?' },
      ],
    },
    {
      id: 'hsk1-l15-v17', hanzi: '住', pinyin: 'zhù', english: 'live; stay', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l15-v17-e01', hanzi: '我们要在这里住三天。', pinyin: 'Wǒmen yào zài zhèlǐ zhù sān tiān.', english: 'We will stay here for three days.' },
        { id: 'hsk1-l15-v17-e02', hanzi: '你现在住在哪儿？', pinyin: 'Nǐ xiànzài zhù zài nǎr?', english: 'Where do you live now?' },
      ],
    },
    {
      id: 'hsk1-l15-v18', hanzi: '早', pinyin: 'zǎo', english: 'early', partOfSpeech: 'adj.', keyWord: true,
      examples: [
        { id: 'hsk1-l15-v18-e01', hanzi: '我们早点儿去机场吧。', pinyin: 'Wǒmen zǎodiǎnr qù jīchǎng ba.', english: 'Let’s go to the airport a bit earlier.' },
        { id: 'hsk1-l15-v18-e02', hanzi: '时间还早呢，我们再睡半个小时吧。', pinyin: 'Shíjiān hái zǎo ne, wǒmen zài shuì bàn gè xiǎoshí ba.', english: 'It’s still early — let’s sleep another half hour.' },
      ],
    },
    {
      id: 'hsk1-l15-v19', hanzi: '那', pinyin: 'nà', english: 'then', partOfSpeech: 'conj.',
      examples: [
        { id: 'hsk1-l15-v19-e01', hanzi: '妈妈，我写了一个小时的字了。那休息一下吧。', pinyin: 'Māma, wǒ xiěle yí gè xiǎoshí de zì le. Nà xiūxi yíxià ba.', english: 'A: Mom, I’ve been writing for an hour. B: Then take a break.' },
        { id: 'hsk1-l15-v19-e02', hanzi: '下雨了。那我们在家里玩。', pinyin: 'Xià yǔ le. Nà wǒmen zài jiā lǐ wán.', english: 'A: It’s raining. B: Then let’s play at home.' },
      ],
    },
    {
      id: 'hsk1-l15-v20', hanzi: '大兴机场', pinyin: 'Dàxīng Jīchǎng', english: 'Daxing Airport',
      examples: [
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l15-s01', hanzi: '我喜欢这个，也喜欢那个。', pinyin: 'Wǒ xǐhuan zhège, yě xǐhuan nàge.', english: 'I like this one, and I like that one too.' },
    { id: 'hsk1-l15-s02', hanzi: '王老师是北京人，李文也是北京人。', pinyin: 'Wáng lǎoshī shì Běijīng rén, Lǐ Wén yě shì Běijīng rén.', english: 'Teacher Wang is from Beijing, and Li Wen is from Beijing too.' },
    { id: 'hsk1-l15-s03', hanzi: '我喜欢喝中国茶，还喜欢吃中国菜。', pinyin: 'Wǒ xǐhuan hē Zhōngguó chá, hái xǐhuan chī Zhōngguó cài.', english: 'I like drinking Chinese tea, and I also like eating Chinese food.' },
  ],
  grammar: [
    {
      id: 'hsk1-l15-g01',
      title: { en: 'Coordinate compound sentence “……, 还/也……”', zh: '并列复句“……，还/也……”' },
      focusHanzi: ['还', '也'],
      structure: '……，还/也……',
      explanation: {
        en: 'From 小语讲堂: a coordinate compound sentence consists of two or more clauses that are logically related and structurally parallel; this volume covers the “……, 还/也……” pattern.',
        zh: '小语讲堂：并列复句由两个或两个以上逻辑关联、结构对称的小句构成。本册学习并列复句“……，还/也……”。',
      },
      examples: [
        { id: 'hsk1-l15-s01', hanzi: '我喜欢这个，也喜欢那个。', pinyin: 'Wǒ xǐhuan zhège, yě xǐhuan nàge.', english: 'I like this one, and I like that one too.' },
        { id: 'hsk1-l15-s02', hanzi: '王老师是北京人，李文也是北京人。', pinyin: 'Wáng lǎoshī shì Běijīng rén, Lǐ Wén yě shÌ Běijīng rén.', english: 'Teacher Wang is from Beijing, and Li Wen is from Beijing too.' },
        { id: 'hsk1-l15-s03', hanzi: '我喜欢喝中国茶，还喜欢吃中国菜。', pinyin: 'Wǒ xǐhuan hē Zhōngguó chá, hái xǐhuan chī Zhōngguó cài.', english: 'I like drinking Chinese tea, and I also like eating Chinese food.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l15-d01',
      title: { en: 'Tasting Chinese food (Text 1)', zh: '品尝中餐' },
      context: { en: 'At Li Wen’s home, Li Wen invited friends, including Chen Tianzhong and Bai Jiayue, to taste Chinese food.', zh: '在李文家，李文邀请陈天中、白家月等朋友品尝中餐。' },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'C', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l15-d01-01', speakerId: 'A', hanzi: '你们爱吃哪个菜？', pinyin: 'Nǐmen ài chī nǎge cài?', english: 'Which dish do you all love?' },
        { id: 'hsk1-l15-d01-02', speakerId: 'B', hanzi: '我喜欢这个，也喜欢那个。', pinyin: 'Wǒ xǐhuan zhège, yě xǐhuan nàge.', english: 'I like this one, and I like that one too.' },
        { id: 'hsk1-l15-d01-03', speakerId: 'C', hanzi: '这些菜都好吃，还很好看。', pinyin: 'Zhèxiē cài dōu hǎochī, hái hěn hǎkàn.', english: 'These dishes are all tasty — and very good-looking.' },
        { id: 'hsk1-l15-d01-04', speakerId: 'A', hanzi: '我爱吃中国菜，也喜欢做。大家多吃点儿。', pinyin: 'Wǒ ài chī Zhōngguó cài, yě xǐhuan zuò. Dàjiā duō chī diǎnr.', english: 'I love Chinese food and I like cooking it too. Everyone, eat more!' },
      ],
    },
    {
      id: 'hsk1-l15-d02',
      title: { en: 'Holiday plans (Text 2)', zh: '假期计划' },
      context: { en: 'At Li Wen’s home, everyone was talking about their holiday plans while eating.', zh: '在李文家，大家边吃饭边谈论假期计划。' },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '安妮 Ānnī', voice: 'female2' },
        { id: 'C', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l15-d02-01', speakerId: 'A', hanzi: '你们都想去哪儿？', pinyin: 'Nǐmen dōu xiǎng qù nǎr?', english: 'Where do you all want to go?' },
        { id: 'hsk1-l15-d02-02', speakerId: 'B', hanzi: '去年我和男朋友去了西安，今年我想去北京。', pinyin: 'Qùnián wǒ hé nánpéngyou qùle Xī’ān, jīnnián wǒ xiǎng qù Běijīng.', english: 'Last year my boyfriend and I went to Xi’an; this year I want to go to Beijing.' },
        { id: 'hsk1-l15-d02-03', speakerId: 'C', hanzi: '前几年我去了西安，非常好玩儿。今年我也想去北京。', pinyin: 'Qián jǐ nián wǒ qùle Xī’ān, fēicháng hǎowánr. Jīnnián wǒ yě xiǎng qù Běijīng.', english: 'A few years ago I went to Xi’an — great fun. This year I also want to go to Beijing.' },
        { id: 'hsk1-l15-d02-04', speakerId: 'A', hanzi: '我和王老师都是北京人，北京非常漂亮。', pinyin: 'Wǒ hé Wáng lǎoshī dōu shì Běijīng rén, Běijīng fēicháng piàoliang.', english: 'Teacher Wang and I are both Beijing people — Beijing is extremely beautiful.' },
      ],
    },
    {
      id: 'hsk1-l15-d03',
      title: { en: 'See you at Daxing Airport (Text 3)', zh: '去北京旅游' },
      context: { en: 'Outside the classroom, Bai Jiayue, Annie and Ms. Wang were talking about traveling to Beijing.', zh: '在教室外，白家月、安妮和王老师在谈论去北京旅游的事。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'C', name: '安妮 Ānnī', voice: 'female' },
      ],
      lines: [
        { id: 'hsk1-l15-d03-01', speakerId: 'A', hanzi: '你们的飞机到北京要几个小时？', pinyin: 'Nǐmen de fēijī dào Běijīng yào jǐ gè xiǎoshí?', english: 'How many hours does your flight to Beijing take?' },
        { id: 'hsk1-l15-d03-02', speakerId: 'B', hanzi: '九个小时。', pinyin: 'Jiǔ gè xiǎoshí.', english: 'Nine hours.' },
        { id: 'hsk1-l15-d03-03', speakerId: 'A', hanzi: '我家人都在北京，星期天我姐姐也有时间，她可以去机场接你们，你们也可以住我家。', pinyin: 'Wǒ jiārén dōu zài Běijīng, Xīngqītiān wǒ jiějie yě yǒu shíjiān, tā kěyǐ qù jīchǎng jiē nǐmen, nǐmen yě kěyǐ zhù wǒ jiā.', english: 'My family are all in Beijing; on Sunday my sister has time too — she can meet you at the airport, and you can stay at my place.' },
        { id: 'hsk1-l15-d03-04', speakerId: 'C', hanzi: '我们星期日早上八点到大兴机场，早不早？', pinyin: 'Wǒmen Xīngqīrì zǎoshang bā diǎn dào Dàxīng Jīchǎng, zǎo bu zǎo?', english: 'We arrive at Daxing Airport at 8 on Sunday morning — is that early?' },
        { id: 'hsk1-l15-d03-05', speakerId: 'A', hanzi: '不早。', pinyin: 'Bù zǎo.', english: 'Not early.' },
        { id: 'hsk1-l15-d03-06', speakerId: 'B', hanzi: '谢谢老师！那我们和您姐姐在大兴机场见！', pinyin: 'Xièxie lǎoshī! Nà wǒmen hé nín jiějie zài Dàxīng Jīchǎng jiàn!', english: 'Thank you, teacher! Then we’ll meet your sister at Daxing Airport!' },
      ],
    },
  ],
};

export default lesson15;
