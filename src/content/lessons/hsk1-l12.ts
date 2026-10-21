/**
 * Lesson 12 — extracted from 《新HSK教程1》第12课 (New HSK Course 1, Lesson 12).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 12-2 / 12-4 / 12-6 with word-card examples,
 *    text contexts (p5/p27/p42), 小语讲堂 grammar blocks (p25/p26/p41),
 *    exercises (p24/p40/p61), role-play activity (p63).
 *  - Textbook dialogue pages P87/P89/P91 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p6/p28/p43) corroborate the dialogues.
 *
 * Voice note: 胡医生 uses a distinct third male voice (male3) because he now
 * shares Text 3 with 杨同乐; his Lesson 8 clips were regenerated to match.
 * The 一点儿 card's "=" equivalences use audioText overrides for clean TTS.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson12: Lesson = {
  id: 'hsk1-l12',
  order: 12,
  title: { en: 'It snowed yesterday', zh: '昨天下雪了' },
  titlePinyin: 'Zuótiān xià xuě le',
  objectives: [
    { en: 'To describe weather conditions', zh: '描述天气情况' },
    { en: 'To describe the medical condition', zh: '描述病情' },
    { en: 'The modal particle “了(1)”', zh: '语气助词“了（1）”' },
    { en: 'The “太……了” pattern', zh: '“太……了”格式' },
    { en: 'The benefits of “drinking some warm water”', zh: '“多喝热水”的好处' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: How was the weather yesterday?', zh: '根据课文内容回答问题：昨天天气怎么样？' },
    { en: 'Answer according to the text: What did Yang Tongle do yesterday?', zh: '根据课文内容回答问题：杨同乐昨天做什么了？' },
    { en: 'Answer according to the text: Is Yang Tongle sick?', zh: '根据课文内容回答问题：杨同乐生病了吗？' },
    { en: 'Answer according to the text: What should Yang Tongle do at home after seeing the doctor?', zh: '根据课文内容回答问题：看病后，杨同乐回家要做什么？' },
    { en: 'Role-play: one student plays the doctor, the other the patient who sees the doctor.', zh: '角色扮演：两人一组，一个人扮演医生，另一个人扮演病人，病人来看病。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l12-v01', hanzi: '天气', pinyin: 'tiānqì', english: 'weather', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v01-e01', hanzi: '今天天气怎么样？今天天气不太好。', pinyin: 'Jīntiān tiānqì zěnmeyàng? Jīntiān tiānqì bú tài hǎo.', english: 'A: How’s the weather today? B: Not too good today.' },
        { id: 'hsk1-l12-v01-e02', hanzi: '今天是个好天气。', pinyin: 'Jīntiān shì gè hǎo tiānqì.', english: 'Today is a day of good weather.' },
      ],
    },
    {
      id: 'hsk1-l12-v02', hanzi: '这里', pinyin: 'zhèlǐ', english: 'here', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l12-v02-e01', hanzi: '我们可以在这里买些水果。', pinyin: 'Wǒmen kěyǐ zài zhèlǐ mǎi xiē shuǐguǒ.', english: 'We can buy some fruit here.' },
        { id: 'hsk1-l12-v02-e02', hanzi: '你喜欢这里吗？', pinyin: 'Nǐ xǐhuan zhèlǐ ma?', english: 'Do you like it here?' },
      ],
    },
    {
      id: 'hsk1-l12-v03', hanzi: '天', pinyin: 'tiān', english: 'weather', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l12-v03-e01', hanzi: '今天的天不好。', pinyin: 'Jīntiān de tiān bù hǎo.', english: 'Today’s weather is bad.' },
        { id: 'hsk1-l12-v03-e02', hanzi: '明天是好天吗？', pinyin: 'Míngtiān shì hǎo tiān ma?', english: 'Will tomorrow be a fine day?' },
      ],
    },
    {
      id: 'hsk1-l12-v04', hanzi: '下雨', pinyin: 'xià yǔ', english: 'rain', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v04-e01', hanzi: '下雨了，太冷了。', pinyin: 'Xià yǔ le, tài lěng le.', english: 'It’s raining — so cold.' },
        { id: 'hsk1-l12-v04-e02', hanzi: '这里很少下雨。', pinyin: 'Zhèlǐ hěn shǎo xià yǔ.', english: 'It rarely rains here.' },
      ],
    },
    {
      id: 'hsk1-l12-v05', hanzi: '了', pinyin: 'le', english: 'used at the end of a sentence to indicate a change of situation or state', partOfSpeech: 'part.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v05-e01', hanzi: '她去上海了。', pinyin: 'Tā qù Shànghǎi le.', english: 'She has gone to Shanghai.' },
        { id: 'hsk1-l12-v05-e02', hanzi: '我生病了，不能去北京了。', pinyin: 'Wǒ shēngbìng le, bù néng qù Běijīng le.', english: 'I’ve fallen ill — I can’t go to Beijing anymore.' },
        { id: 'hsk1-l12-v05-e03', hanzi: '哥哥是大学生了，妹妹还是小学生。', pinyin: 'Gēge shì dàxuéshēng le, mèimei hái shì xiǎoxuéshēng.', english: 'Big brother is a university student now; little sister is still a primary pupil.' },
      ],
    },
    {
      id: 'hsk1-l12-v06', hanzi: '雨', pinyin: 'yǔ', english: 'rain', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l12-v06-e01', hanzi: '外面下大雨呢。', pinyin: 'Wàimian xià dà yǔ ne.', english: 'It’s raining hard outside.' },
        { id: 'hsk1-l12-v06-e02', hanzi: '雨天你坐出租车去上班吧。', pinyin: 'Yǔtiān nǐ zuò chūzūchē qù shàngbān ba.', english: 'On rainy days, take a taxi to work.' },
      ],
    },
    {
      id: 'hsk1-l12-v07', hanzi: '有点儿', pinyin: 'yǒudiǎnr', english: 'rather; a bit', partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l12-v07-e01', hanzi: '今天的天有点儿不好。', pinyin: 'Jīntiān de tiān yǒudiǎnr bù hǎo.', english: 'The weather is a bit bad today.' },
        { id: 'hsk1-l12-v07-e02', hanzi: '我有点儿冷。', pinyin: 'Wǒ yǒudiǎnr lěng.', english: 'I’m a bit cold.' },
      ],
    },
    {
      id: 'hsk1-l12-v08', hanzi: '觉得', pinyin: 'juéde', english: 'feel', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v08-e01', hanzi: '你觉得我做的菜怎么样？', pinyin: 'Nǐ juéde wǒ zuò de cài zěnmeyàng?', english: 'What do you think of my cooking?' },
        { id: 'hsk1-l12-v08-e02', hanzi: '他觉得这儿的茶不好喝。', pinyin: 'Tā juéde zhèr de chá bù hǎohē.', english: 'He feels the tea here isn’t good.' },
      ],
    },
    {
      id: 'hsk1-l12-v09', hanzi: '冷', pinyin: 'lěng', english: 'cold', partOfSpeech: 'adj.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v09-e01', hanzi: '今天太冷了！', pinyin: 'Jīntiān tài lěng le!', english: 'It’s too cold today!' },
        { id: 'hsk1-l12-v09-e02', hanzi: '昨天下雪了，非常冷。', pinyin: 'Zuótiān xià xuě le, fēicháng lěng.', english: 'It snowed yesterday — extremely cold.' },
      ],
    },
    {
      id: 'hsk1-l12-v10', hanzi: '下', pinyin: 'xià', english: '(of rain, snow, etc.) come down; fall', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v10-e01', hanzi: '昨天下雨了。', pinyin: 'Zuótiān xià yǔ le.', english: 'It rained yesterday.' },
        { id: 'hsk1-l12-v10-e02', hanzi: '明天下雪，你多穿点儿。', pinyin: 'Míngtiān xià xuě, nǐ duō chuān diǎnr.', english: 'It will snow tomorrow — wear more clothes.' },
      ],
    },
    {
      id: 'hsk1-l12-v11', hanzi: '雪', pinyin: 'xuě', english: 'snow', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v11-e01', hanzi: '我喜欢下雪天。', pinyin: 'Wǒ xǐhuan xià xuě tiān.', english: 'I like snowy days.' },
        { id: 'hsk1-l12-v11-e02', hanzi: '下大雪了，弟弟很高兴。', pinyin: 'Xià dà xuě le, dìdi hěn gāoxìng.', english: 'It’s snowing heavily — younger brother is very happy.' },
      ],
    },
    {
      id: 'hsk1-l12-v12', hanzi: '来', pinyin: 'lái', english: 'come', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v12-e01', hanzi: '他来中国一年了。', pinyin: 'Tā lái Zhōngguó yì nián le.', english: 'He has been in China for a year.' },
        { id: 'hsk1-l12-v12-e02', hanzi: '我朋友晚上来我家吃饭。', pinyin: 'Wǒ péngyou wǎnshang lái wǒ jiā chī fàn.', english: 'My friend is coming to my home for dinner in the evening.' },
      ],
    },
    {
      id: 'hsk1-l12-v13', hanzi: '公司', pinyin: 'gōngsī', english: 'company', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l12-v13-e01', hanzi: '我们公司不大。', pinyin: 'Wǒmen gōngsī bù dà.', english: 'Our company is not big.' },
        { id: 'hsk1-l12-v13-e02', hanzi: '我在这家公司工作五年了。', pinyin: 'Wǒ zài zhè jiā gōngsī gōngzuò wǔ nián le.', english: 'I have worked at this company for five years.' },
      ],
    },
    {
      id: 'hsk1-l12-v14', hanzi: '生病', pinyin: 'shēngbìng', english: 'fall ill', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v14-e01', hanzi: '我生病了，不能和你去看电影了。', pinyin: 'Wǒ shēngbìng le, bù néng hé nǐ qù kàn diānyǐng le.', english: 'I’ve fallen ill — I can’t go to the movies with you.' },
        { id: 'hsk1-l12-v14-e02', hanzi: '你昨天没来学校，生病了吗？', pinyin: 'Nǐ zuótiān méi lái xuéxiào, shēngbìng le ma?', english: 'You didn’t come to school yesterday — were you ill?' },
      ],
    },
    {
      id: 'hsk1-l12-v15', hanzi: '看病', pinyin: 'kànbìng', english: '(of a patient) see a doctor', partOfSpeech: 'v.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v15-e01', hanzi: '我下午去医院看病。', pinyin: 'Wǒ xiàwǔ qù yīyuàn kànbìng.', english: 'I’m going to the hospital to see a doctor this afternoon.' },
        { id: 'hsk1-l12-v15-e02', hanzi: '妈妈生病了，现在要去看病。', pinyin: 'Māma shēngbìng le, xiànzài yào qù kànbìng.', english: 'Mom is ill — we need to take her to the doctor now.' },
      ],
    },
    {
      id: 'hsk1-l12-v16', hanzi: '病', pinyin: 'bìng', english: 'fall ill', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v16-e01', hanzi: '你病了吗？', pinyin: 'Nǐ bìng le ma?', english: 'Are you ill?' },
        { id: 'hsk1-l12-v16-e02', hanzi: '他今天病了，不能去上学了。', pinyin: 'Tā jīntiān bìng le, bù néng qù shàngxué le.', english: 'He is ill today — he can’t go to school.' },
      ],
    },
    {
      id: 'hsk1-l12-v17', hanzi: '一点儿', pinyin: 'yìdiǎnr', english: '① some ② a bit; a little', partOfSpeech: 'num.-m.',
      examples: [
        { id: 'hsk1-l12-v17-e01', hanzi: '你吃一点儿水果吧。= 你吃点儿水果吧。', pinyin: 'Nǐ chī yìdiǎnr shuǐguǒ ba. = Nǐ chī diǎnr shuǐguǒ ba.', english: 'Have some fruit.', audioText: '你吃一点儿水果吧。' },
        { id: 'hsk1-l12-v17-e02', hanzi: '太贵了，便宜一点儿吧。= 太贵了，便宜点儿吧。', pinyin: 'Tài guì le, piányi yìdiǎnr ba. = Tài guì le, piányi diǎnr ba.', english: 'Too expensive — make it a bit cheaper.', audioText: '太贵了，便宜一点儿吧。' },
      ],
    },
    {
      id: 'hsk1-l12-v18', hanzi: '药', pinyin: 'yào', english: 'medicine', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l12-v18-e01', hanzi: '弟弟病了，我去买点儿药。', pinyin: 'Dìdi bìng le, wǒ qù mǎi diǎnr yào.', english: 'Little brother is ill — I’ll go buy some medicine.' },
        { id: 'hsk1-l12-v18-e02', hanzi: '医生说这个药要吃两个星期。', pinyin: 'Yīshēng shuō zhè ge yào yào chī liǎng gè xīngqī.', english: 'The doctor says this medicine must be taken for two weeks.' },
      ],
    },
    {
      id: 'hsk1-l12-v19', hanzi: '天', pinyin: 'tiān', english: 'day', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l12-v19-e01', hanzi: '明天我要去北京。去几天？', pinyin: 'Míngtiān wǒ yào qù Běijīng. Qù jǐ tiān?', english: 'A: I’m going to Beijing tomorrow. B: For how many days?' },
        { id: 'hsk1-l12-v19-e02', hanzi: '今天是我上大学的第一天。', pinyin: 'Jīntiān shì wǒ shàng dàxúe de dì-yī tiān.', english: 'Today is my first day at university.' },
      ],
    },
    {
      id: 'hsk1-l12-v20', hanzi: '回', pinyin: 'huí', english: 'return; go back', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v20-e01', hanzi: '他晚上不回学校了。', pinyin: 'Tā wǎnshang bù huí xuéxiào le.', english: 'He isn’t going back to school in the evening.' },
        { id: 'hsk1-l12-v20-e02', hanzi: '他今年八月回国。', pinyin: 'Tā jīnnián bā yuè huí guó.', english: 'He returns to his home country this August.' },
      ],
    },
    {
      id: 'hsk1-l12-v21', hanzi: '再', pinyin: 'zài', english: 'then; only then', partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l12-v21-e01', hanzi: '你们吃了饭再回家吧。', pinyin: 'Nǐmen chī le fàn zài huí jiā ba.', english: 'Eat first, then go home.' },
        { id: 'hsk1-l12-v21-e02', hanzi: '你打电话问一下再去吧。', pinyin: 'Nǐ dǎ diànhuà wèn yíxià zài qù ba.', english: 'Call and ask first, then go.' },
      ],
    },
    {
      id: 'hsk1-l12-v22', hanzi: '喝', pinyin: 'hē', english: 'drink', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l12-v22-e01', hanzi: '她喜欢喝中国茶。', pinyin: 'Tā xǐhuan hē Zhōngguó chá.', english: 'She likes drinking Chinese tea.' },
        { id: 'hsk1-l12-v22-e02', hanzi: '天气太热了，多喝点儿水吧。', pinyin: 'Tiānqì tài rè le, duō hē diǎnr shuǐ ba.', english: 'The weather is too hot — drink some more water.' },
      ],
    },
    {
      id: 'hsk1-l12-v23', hanzi: '热', pinyin: 'rè', english: 'hot; warm', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l12-v23-e01', hanzi: '今天天气不太热。', pinyin: 'Jīntiān tiānqì bù tài rè.', english: 'The weather isn’t too hot today.' },
        { id: 'hsk1-l12-v23-e02', hanzi: '昨天很热。', pinyin: 'Zuótiān hěn rè.', english: 'Yesterday was very hot.' },
      ],
    },
    {
      id: 'hsk1-l12-v24', hanzi: '水', pinyin: 'shuǐ', english: 'water', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l12-v24-e01', hanzi: '请问，有热水吗？', pinyin: 'Qǐngwèn, yǒu rè shuǐ ma?', english: 'Excuse me, do you have hot water?' },
        { id: 'hsk1-l12-v24-e02', hanzi: '正在喝水的那个人是谁？', pinyin: 'Zhèngzài hē shuǐ de nà ge rén shì shéi?', english: 'Who is that person drinking water right now?' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l12-s01', hanzi: '下雨了。', pinyin: 'Xià yǔ le.', english: 'It’s raining.' },
    { id: 'hsk1-l12-s02', hanzi: '下雪了。', pinyin: 'Xià xuě le.', english: 'It’s snowing.' },
    { id: 'hsk1-l12-s03', hanzi: '上课了。', pinyin: 'Shàngkè le.', english: 'Class is starting.' },
    { id: 'hsk1-l12-s04', hanzi: '真漂亮！', pinyin: 'Zhēn piàoliang!', english: 'So pretty!' },
    { id: 'hsk1-l12-s05', hanzi: '十二点了，吃午饭吧。', pinyin: 'Shí’èr diǎn le, chī wǔfàn ba.', english: 'It’s twelve — let’s have lunch.' },
    { id: 'hsk1-l12-s06', hanzi: '弟弟起床了吗？没起床呢。', pinyin: 'Dìdi qǐchuáng le ma? Méi qǐchuáng ne.', english: 'A: Has little brother gotten up? B: Not up yet.' },
    { id: 'hsk1-l12-s07', hanzi: '太冷了！', pinyin: 'Tài lěng le!', english: 'Too cold!' },
    { id: 'hsk1-l12-s08', hanzi: '这个杯子太小了。', pinyin: 'Zhè ge bēizi tài xiǎo le.', english: 'This cup is too small.' },
    { id: 'hsk1-l12-s09', hanzi: '我们今天太高兴了！', pinyin: 'Wǒmen jīntiān tài gāoxìng le!', english: 'We are so happy today!' },
  ],
  grammar: [
    {
      id: 'hsk1-l12-g01',
      title: { en: 'Non-subject-predicate sentences', zh: '非主谓句' },
      structure: '词/短语成句（不分主语和谓语）',
      explanation: {
        en: 'From 小语讲堂: non-subject-predicate sentences are composed of words or phrases without distinct subjects and predicates — commonly used in colloquial speech.',
        zh: '小语讲堂：非主谓句是由词或短语构成、不分主语和谓语的句子，口语中常用。',
      },
      examples: [
        { id: 'hsk1-l12-s01', hanzi: '下雨了。', pinyin: 'Xià yǔ le.', english: 'It’s raining.' },
        { id: 'hsk1-l12-s02', hanzi: '下雪了。', pinyin: 'Xià xuě le.', english: 'It’s snowing.' },
        { id: 'hsk1-l12-s03', hanzi: '上课了。', pinyin: 'Shàngkè le.', english: 'Class is starting.' },
        { id: 'hsk1-l12-s04', hanzi: '真漂亮！', pinyin: 'Zhēn piàoliang!', english: 'So pretty!' },
        { id: 'hsk1-l03-d02-03', hanzi: '对不起！', pinyin: 'Duìbuqǐ!', english: 'Sorry!' },
        { id: 'hsk1-l03-d02-04', hanzi: '没关系！', pinyin: 'Méi guānxi!', english: 'That’s all right!' },
      ],
    },
    {
      id: 'hsk1-l12-g02',
      title: { en: 'The modal particle “了 (1)”', zh: '语气助词“了(1)”' },
      focusHanzi: ['了', '没'],
      structure: '句子/停顿 + 了（变化/新情况）',
      structureNegative: '否定回答：没……（句末不用“了”）',
      explanation: {
        en: 'From 小语讲堂: the modal particle 了(1) is placed at the end of a sentence (or at a pause) to indicate a change or a new situation. Negative responses use 没 and omit the final 了: 没下雨 → 下雨了。',
        zh: '小语讲堂：语气助词“了(1)”位于句子末尾或句中停顿的地方，表示有变化或出现新情况。否定回答时用“没”，句子末尾不用“了”：没下雨→下雨了。',
      },
      examples: [
        { id: 'hsk1-l12-s01', hanzi: '下雨了。', pinyin: 'Xià yǔ le.', english: 'It’s raining.' },
        { id: 'hsk1-l12-s05', hanzi: '十二点了，吃午饭吧。', pinyin: 'Shí’èr diǎn le, chī wǔfàn ba.', english: 'It’s twelve — let’s have lunch.' },
        { id: 'hsk1-l12-s06', hanzi: '弟弟起床了吗？没起床呢。', pinyin: 'Dìdi qǐchuáng le ma? Méi qǐchuáng ne.', english: 'A: Has little brother gotten up? B: Not up yet.' },
      ],
    },
    {
      id: 'hsk1-l12-g03',
      title: { en: 'The “太……了” pattern', zh: '“太……了”格式' },
      focusHanzi: ['太', '了'],
      structure: '太 + 形容词/动词 + 了',
      explanation: {
        en: 'From 小语讲堂: the “太……了” pattern expresses a very high or intense degree of exclamation.',
        zh: '小语讲堂：“太……了”用于感叹程度很高或很深。',
      },
      examples: [
        { id: 'hsk1-l12-s07', hanzi: '太冷了！', pinyin: 'Tài lěng le!', english: 'Too cold!' },
        { id: 'hsk1-l12-s08', hanzi: '这个杯子太小了。', pinyin: 'Zhè ge bēizi tài xiǎo le.', english: 'This cup is too small.' },
        { id: 'hsk1-l12-s09', hanzi: '我们今天太高兴了！', pinyin: 'Wǒmen jīntiān tài gāoxìng le!', english: 'We are so happy today!' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l12-d01',
      title: { en: 'Weather on the phone (Text 1)', zh: '天气怎么样' },
      context: { en: 'Wang Yixue was calling Wang Yifei to ask about the situation on her end.', zh: '王一雪给王一飞打电话，询问王一飞那边的情况。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '王一飞 Wáng Yīfēi', voice: 'female' },
      ],
      lines: [
        { id: 'hsk1-l12-d01-01', speakerId: 'A', hanzi: '今天天气怎么样？', pinyin: 'Jīntiān tiānqì zěnmeyàng?', english: 'How’s the weather today?' },
        { id: 'hsk1-l12-d01-02', speakerId: 'B', hanzi: '这里的天不太好，下雨了。', pinyin: 'Zhèlǐ de tiān bù tài hǎo, xià yǔ le.', english: 'The weather here isn’t too good — it’s raining.' },
        { id: 'hsk1-l12-d01-03', speakerId: 'A', hanzi: '雨大吗？', pinyin: 'Yǔ dà ma?', english: 'Is the rain heavy?' },
        { id: 'hsk1-l12-d01-04', speakerId: 'B', hanzi: '有点儿大，我觉得很冷。', pinyin: 'Yǒudiǎnr dà, wǒ juéde hěn lěng.', english: 'A bit heavy — I feel very cold.' },
      ],
    },
    {
      id: 'hsk1-l12-d02',
      title: { en: 'In the elevator (Text 2)', zh: '昨天下雪了' },
      context: { en: 'In the company elevator, Wang Yixue and Yang Tongle were chatting.', zh: '在公司电梯里，王一雪和杨同乐在聊天儿。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '杨同乐 Yáng Tónglè', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l12-d02-01', speakerId: 'A', hanzi: '昨天下雪了。', pinyin: 'Zuótiān xià xuě le.', english: 'It snowed yesterday.' },
        { id: 'hsk1-l12-d02-02', speakerId: 'B', hanzi: '是的，太冷了。', pinyin: 'Shì de, tài lěng le.', english: 'Yes — it was so cold.' },
        { id: 'hsk1-l12-d02-03', speakerId: 'A', hanzi: '你昨天没来公司，生病了？', pinyin: 'Nǐ zuótiān méi lái gōngsī, shēngbìng le?', english: 'You didn’t come to the company yesterday — were you ill?' },
        { id: 'hsk1-l12-d02-04', speakerId: 'B', hanzi: '对，我昨天去医院看病了。', pinyin: 'Duì, wǒ zuótiān qù yīyuàn kànbìng le.', english: 'Yes — I went to the hospital to see a doctor yesterday.' },
      ],
    },
    {
      id: 'hsk1-l12-d03',
      title: { en: 'Seeing the doctor (Text 3)', zh: '看病' },
      context: { en: 'Yesterday at the hospital, the doctor examined Yang Tongle.', zh: '昨天在医院，医生给杨同乐看病。' },
      speakers: [
        { id: 'A', name: '杨同乐 Yáng Tónglè', voice: 'male' },
        { id: 'B', name: '胡医生 Hú yīshēng', voice: 'male3' },
      ],
      lines: [
        { id: 'hsk1-l12-d03-01', speakerId: 'A', hanzi: '医生，我病了。', pinyin: 'Yīshēng, wǒ bìng le.', english: 'Doctor — I’m ill.' },
        { id: 'hsk1-l12-d03-02', speakerId: 'B', hanzi: '我看看。你觉得怎么样？', pinyin: 'Wǒ kànkan. Nǐ juéde zěnmeyàng?', english: 'Let me take a look. How do you feel?' },
        { id: 'hsk1-l12-d03-03', speakerId: 'A', hanzi: '我很冷。', pinyin: 'Wǒ hěn lěng.', english: 'I feel very cold.' },
        { id: 'hsk1-l12-d03-04', speakerId: 'B', hanzi: '好的，吃一点儿药，今天休息半天吧。', pinyin: 'Hǎo de, chī yìdiǎnr yào, jīntiān xiūxi bàntiān ba.', english: 'OK — take a little medicine and rest for half a day today.' },
        { id: 'hsk1-l12-d03-05', speakerId: 'A', hanzi: '好的。', pinyin: 'Hǎo de.', english: 'All right.' },
        { id: 'hsk1-l12-d03-06', speakerId: 'B', hanzi: '回家后再喝些热水。', pinyin: 'Huí jiā hòu zài hē xiē rè shuǐ.', english: 'And drink some hot water after you get home.' },
      ],
    },
  ],
};

export default lesson12;
