/**
 * Lesson 6 — extracted from 《新HSK教程1》第6课 (New HSK Course 1, Lesson 6).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 6-2 / 6-4 / 6-6 with word-card examples,
 *    text contexts (p5/p13/p34), 小语讲堂 grammar blocks (p33/p56–57/p58),
 *    exercises (p12/p32/p36), classroom activity (p60).
 *  - Textbook dialogue pages P36/P37/P39 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p14/p35) corroborate the dialogues.
 *
 * Deviations (flagged in the extraction report):
 *  - v03-e02 displays the book's masked number (+86 135××××1160) but its AUDIO
 *    uses the unmasked number spoken in Text 1 (audioText override), so the
 *    TTS never reads "××××".
 *  - Child speakers 刘小雪/刘小雪 use child neural voices (girl/boy hints).
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson06: Lesson = {
  id: 'hsk1-l06',
  order: 6,
  title: { en: "What's your cell phone number?", zh: '你的手机号是多少？' },
  titlePinyin: 'Nǐ de shǒujīhào shì duōshao?',
  objectives: [
    { en: 'Cell phone numbers', zh: '手机号码' },
    { en: 'Serial verb sentences (1)', zh: '连动句（1）' },
    { en: 'The modal verb “想”', zh: '能愿动词“想”' },
    { en: 'The interrogative pronoun “怎么”', zh: '疑问代词“怎么”' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: Are the steamed stuffed buns at Xi’an Restaurant delicious?', zh: '根据课文内容回答问题：西安饭店的包子好吃吗？' },
    { en: 'Answer according to the text: How will they go to Xi’an Restaurant?', zh: '根据课文内容回答问题：他们怎么去西安饭店？' },
    { en: 'Pair work: fill in what you would have for breakfast on Monday, Tuesday and Saturday, then share your answers.', zh: '双人活动：两人一组，填写星期一、星期二和星期六早饭吃什么，填好后分享。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l06-v01',
      hanzi: '手机',
      pinyin: 'shǒujī',
      english: 'cell phone',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v01-e01', hanzi: '我喜欢我的新手机。', pinyin: 'Wǒ xǐhuan wǒ de xīn shǒujī.', english: 'I like my new cell phone.' },
        { id: 'hsk1-l06-v01-e02', hanzi: '这个手机很好看。', pinyin: 'Zhège shǒujī hěn hǎokàn.', english: 'This cell phone is very good-looking.' },
      ],
    },
    {
      id: 'hsk1-l06-v02',
      hanzi: '电话',
      pinyin: 'diànhuà',
      english: 'telephone (set); (telephone/phone) call',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l06-v02-e01', hanzi: '他正在打电话呢。', pinyin: 'Tā zhèngzài dǎ diànhuà ne.', english: 'He is on the phone right now.' },
        { id: 'hsk1-l06-v02-e02', hanzi: '我们在电话里说吧。', pinyin: 'Wǒmen zài diànhuà lǐ shuō ba.', english: 'Let’s talk on the phone.' },
      ],
    },
    {
      id: 'hsk1-l06-v03',
      hanzi: '号',
      pinyin: 'hào',
      english: 'number',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v03-e01', hanzi: '你知道他的电话号吗？', pinyin: 'Nǐ zhīdào tā de diànhuà hào ma?', english: 'Do you know his phone number?' },
        {
          id: 'hsk1-l06-v03-e02',
          hanzi: '我的手机号是+86 135××××1160。',
          pinyin: 'Wǒ de shǒujīhào shì +86 135××××1160.',
          english: 'My cell phone number is +86 135××××1160.',
          audioText: '我的手机号是+86 13552721160。',
        },
      ],
    },
    {
      id: 'hsk1-l06-v04',
      hanzi: '明天',
      pinyin: 'míngtiān',
      english: 'tomorrow',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v04-e01', hanzi: '明天我休息，不工作。', pinyin: 'Míngtiān wǒ xiūxi, bù gōngzuò.', english: 'Tomorrow I rest — I don’t work.' },
        { id: 'hsk1-l06-v04-e02', hanzi: '你明天去哪儿？', pinyin: 'Nǐ míngtiān qù nǎr?', english: 'Where are you going tomorrow?' },
      ],
    },
    {
      id: 'hsk1-l06-v05',
      hanzi: '去',
      pinyin: 'qù',
      english: 'go to',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v05-e01', hanzi: '你明天去公司吗？', pinyin: 'Nǐ míngtiān qù gōngsī ma?', english: 'Are you going to the company tomorrow?' },
        { id: 'hsk1-l06-v05-e02', hanzi: '我去学校。', pinyin: 'Wǒ qù xuéxiào.', english: 'I go to school.' },
      ],
    },
    {
      id: 'hsk1-l06-v06',
      hanzi: '哪儿',
      pinyin: 'nǎr',
      english: 'where',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l06-v06-e01', hanzi: '你们去哪儿玩？', pinyin: 'Nǐmen qù nǎr wán?', english: 'Where are you (all) going to hang out?' },
        { id: 'hsk1-l06-v06-e02', hanzi: '你家在哪儿？', pinyin: 'Nǐ jiā zài nǎr?', english: 'Where is your home?' },
      ],
    },
    {
      id: 'hsk1-l06-v07',
      hanzi: '想',
      pinyin: 'xiǎng',
      english: 'want; would like',
      partOfSpeech: 'mod.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v07-e01', hanzi: '我想看电影。', pinyin: 'Wǒ xiǎng kàn diànyǐng.', english: 'I want to watch a movie.' },
        { id: 'hsk1-l06-v07-e02', hanzi: '你想吃面条儿吗？', pinyin: 'Nǐ xiǎng chī miàntiáor ma?', english: 'Do you want to eat noodles?' },
      ],
    },
    {
      id: 'hsk1-l06-v08',
      hanzi: '超市',
      pinyin: 'chāoshì',
      english: 'supermarket',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v08-e01', hanzi: '妈妈去超市买菜。', pinyin: 'Māma qù chāoshì mǎi cài.', english: 'Mom goes to the supermarket to buy groceries.' },
        { id: 'hsk1-l06-v08-e02', hanzi: '超市里有很多东西。', pinyin: 'Chāoshì lǐ yǒu hěn duō dōngxi.', english: 'There are many things in the supermarket.' },
      ],
    },
    {
      id: 'hsk1-l06-v09',
      hanzi: '买',
      pinyin: 'mǎi',
      english: 'buy',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v09-e01', hanzi: '我买了一个新手机。', pinyin: 'Wǒ mǎi le yí gè xīn shǒujī.', english: 'I bought a new cell phone.' },
        { id: 'hsk1-l06-v09-e02', hanzi: '妹妹在买衣服。', pinyin: 'Mèimei zài mǎi yīfu.', english: 'Younger sister is buying clothes.' },
      ],
    },
    {
      id: 'hsk1-l06-v10',
      hanzi: '东西',
      pinyin: 'dōngxi',
      english: 'thing',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l06-v10-e01', hanzi: '这是什么东西？', pinyin: 'Zhè shì shénme dōngxi?', english: 'What is this thing?' },
        { id: 'hsk1-l06-v10-e02', hanzi: '我去超市买东西。', pinyin: 'Wǒ qù chāoshì mǎi dōngxi.', english: 'I go to the supermarket to buy things.' },
      ],
    },
    {
      id: 'hsk1-l06-v11',
      hanzi: '些',
      pinyin: 'xiē',
      english: 'some; a few',
      partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l06-v11-e01', hanzi: '你吃些苹果吧。', pinyin: 'Nǐ chī xiē píngguǒ ba.', english: 'Have some apples.' },
        { id: 'hsk1-l06-v11-e02', hanzi: '面条儿里放些菜吧。', pinyin: 'Miàntiáor lǐ fàng xiē cài ba.', english: 'Put some vegetables in the noodles.' },
      ],
    },
    {
      id: 'hsk1-l06-v12',
      hanzi: '牛奶',
      pinyin: 'niúnǎi',
      english: '(cow’s) milk',
      partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l06-v12-e01', hanzi: '牛奶很好喝。', pinyin: 'Niúnǎi hěn hǎohē.', english: 'Milk is very good to drink.' },
        { id: 'hsk1-l06-v12-e02', hanzi: '我妹妹爱喝牛奶。', pinyin: 'Wǒ mèimei ài hē niúnǎi.', english: 'My younger sister loves drinking milk.' },
      ],
    },
    {
      id: 'hsk1-l06-v13', hanzi: '吃', pinyin: 'chī', english: 'eat; have', partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v13-e01', hanzi: '姐姐在吃饭。', pinyin: 'Jiějie zài chīfàn.', english: 'Elder sister is eating.' },
        { id: 'hsk1-l06-v13-e02', hanzi: '我喜欢吃水果。', pinyin: 'Wǒ xǐhuan chī shuǐguǒ.', english: 'I like eating fruit.' },
      ],
    },
    {
      id: 'hsk1-l06-v14', hanzi: '晚饭', pinyin: 'wǎnfàn', english: 'dinner; supper', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l06-v14-e01', hanzi: '我们家六点吃晚饭。', pinyin: 'Wǒmen jiā liù diǎn chī wǎnfàn.', english: 'Our family eats dinner at six.' },
        { id: 'hsk1-l06-v14-e02', hanzi: '晚饭你想吃什么？', pinyin: 'Wǎnfàn nǐ xiǎng chī shénme?', english: 'What do you want for dinner?' },
      ],
    },
    {
      id: 'hsk1-l06-v15', hanzi: '那边', pinyin: 'nàbiān', english: 'there', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l06-v15-e01', hanzi: '看那边！', pinyin: 'Kàn nàbiān!', english: 'Look over there!' },
        { id: 'hsk1-l06-v15-e02', hanzi: '那边有很多人。', pinyin: 'Nàbiān yǒu hěn duō rén.', english: 'There are many people over there.' },
      ],
    },
    {
      id: 'hsk1-l06-v16', hanzi: '包子', pinyin: 'bāozi', english: 'steamed stuffed bun', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l06-v16-e01', hanzi: '晚饭我想吃包子。', pinyin: 'Wǎnfàn wǒ xiǎng chī bāozi.', english: 'I want buns for dinner.' },
        { id: 'hsk1-l06-v16-e02', hanzi: '早上我吃了两个包子。', pinyin: 'Zǎoshang wǒ chī le liǎng gè bāozi.', english: 'I ate two buns in the morning.' },
      ],
    },
    {
      id: 'hsk1-l06-v17', hanzi: '非常', pinyin: 'fēicháng', english: 'very; extremely', partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l06-v17-e01', hanzi: '我爸爸做饭非常好吃。', pinyin: 'Wǒ bàba zuò fàn fēicháng hǎochī.', english: 'My dad’s cooking is extremely tasty.' },
        { id: 'hsk1-l06-v17-e02', hanzi: '这本书非常好看。', pinyin: 'Zhè běen shū fēicháng hǎokàn.', english: 'This book is extremely good.' },
      ],
    },
    {
      id: 'hsk1-l06-v18', hanzi: '好吃', pinyin: 'hǎochī', english: 'tasty; delicious', partOfSpeech: 'adj.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v18-e01', hanzi: '法国菜很好吃。', pinyin: 'Fǎguó cài hěn hǎochī.', english: 'French food is very delicious.' },
        { id: 'hsk1-l06-v18-e02', hanzi: '学校的饭不好吃。', pinyin: 'Xuéxiào de fàn bù hǎochī.', english: 'The school food is not tasty.' },
      ],
    },
    {
      id: 'hsk1-l06-v19', hanzi: '米饭', pinyin: 'mǐfàn', english: '(cooked) rice', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l06-v19-e01', hanzi: '我喜欢吃米饭。', pinyin: 'Wǒ xǐhuan chī mǐfàn.', english: 'I like eating rice.' },
        { id: 'hsk1-l06-v19-e02', hanzi: '你做米饭了吗？', pinyin: 'Nǐ zuò mǐfàn le ma?', english: 'Have you cooked the rice?' },
      ],
    },
    {
      id: 'hsk1-l06-v20', hanzi: '怎么', pinyin: 'zěnme', english: 'how (manner, condition, etc.)', partOfSpeech: 'pron.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v20-e01', hanzi: '你知道这个菜怎么做吗？', pinyin: 'Nǐ zhīdào zhè ge cài zěnme zuò ma?', english: 'Do you know how to make this dish?' },
        { id: 'hsk1-l06-v20-e02', hanzi: '请问，怎么去这家电影院？', pinyin: 'Qǐngwèn, zěnme qù zhè jiā diànyǐngyuàn?', english: 'Excuse me, how do I get to this cinema?' },
      ],
    },
    {
      id: 'hsk1-l06-v21', hanzi: '坐', pinyin: 'zuò', english: 'take; travel by or on', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l06-v21-e01', hanzi: '我坐车去。', pinyin: 'Wǒ zuò chē qù.', english: 'I go by car.' },
        { id: 'hsk1-l06-v21-e02', hanzi: '你们可以坐火车。', pinyin: 'Nǐmen kěyǐ zuò huǒchē.', english: 'You can take the train.' },
      ],
    },
    {
      id: 'hsk1-l06-v22', hanzi: '出租车', pinyin: 'chūzūchē', english: 'taxi', partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l06-v22-e01', hanzi: '我现在叫出租车。', pinyin: 'Wǒ xiànzài jiào chūzūchē.', english: 'I’ll call a taxi now.' },
        { id: 'hsk1-l06-v22-e02', hanzi: '他开了两年出租车。', pinyin: 'Tā kāi le liǎng nián chūzūchē.', english: 'He drove a taxi for two years.' },
      ],
    },
    {
      id: 'hsk1-l06-v23', hanzi: '西安饭店', pinyin: 'Xī’ān Fàndiàn', english: 'Xi’an Restaurant', partOfSpeech: 'proper n.',
    },
  ],
  sentences: [
    { id: 'hsk1-l06-s01', hanzi: '我想去超市。', pinyin: 'Wǒ xiǎng qù chāoshì.', english: 'I want to go to the supermarket.' },
    { id: 'hsk1-l06-s02', hanzi: '我哥哥不想休息。', pinyin: 'Wǒ gēge bù xiǎng xiūxi.', english: 'My elder brother doesn’t want to rest.' },
    { id: 'hsk1-l06-s03', hanzi: '我们坐出租车去西安饭店。', pinyin: 'Wǒmen zuò chūzūchē qù Xī’ān Fàndiàn.', english: 'We take a taxi to Xi’an Restaurant.' },
    { id: 'hsk1-l06-s04', hanzi: '我们怎么去？', pinyin: 'Wǒmen zěnme qù?', english: 'How do we go?' },
    { id: 'hsk1-l06-s05', hanzi: '她怎么去超市？', pinyin: 'Tā zěnme qù chāoshì?', english: 'How does she go to the supermarket?' },
  ],
  grammar: [
    {
      id: 'hsk1-l06-g01',
      title: { en: 'The modal verb “想”', zh: '能愿动词“想”' },
      focusHanzi: ['想', '不想'],
      structure: '想 + 动词',
      structureNegative: '不想 + 动词',
      explanation: {
        en: 'From 小语讲堂: 想 + verb indicates desire or intention.',
        zh: '小语讲堂：想+动词，表示希望、打算。',
      },
      examples: [
        { id: 'hsk1-l06-s01', hanzi: '我想去超市。', pinyin: 'Wǒ xiǎng qù chāoshì.', english: 'I want to go to the supermarket.' },
        { id: 'hsk1-l06-s02', hanzi: '我哥哥不想休息。', pinyin: 'Wǒ gēge bù xiǎng xiūxi.', english: 'My elder brother doesn’t want to rest.' },
      ],
    },
    {
      id: 'hsk1-l06-g02',
      title: { en: 'Serial verb sentences (1)', zh: '连动句（1）' },
      structure: '动词短语1 + 动词短语2（目的）',
      structureNegative: '动词短语1（方式） + 动词短语2',
      explanation: {
        en: 'From 小语讲堂: a serial verb sentence has two or more verbal phrases in the predicate. (1) The second phrase states the PURPOSE of the first: 我想去超市买东西。 (2) The first phrase states the MANNER of the second: 我们坐出租车去西安饭店。 (Details: textbook P40.)',
        zh: '小语讲堂：连动句的谓语部分由两个或两个以上动词性短语构成。（1）表示动作的目的：我想去超市买东西。（2）表示动作的方式：我们坐出租车去西安饭店。详见课本P40。',
      },
      examples: [
        { id: 'hsk1-l06-d02-02', hanzi: '我想去超市买东西。', pinyin: 'Wǒ xiǎng qù chāoshì mǎi dōngxi.', english: 'I want to go to the supermarket to buy things.' },
        { id: 'hsk1-l06-s03', hanzi: '我们坐出租车去西安饭店。', pinyin: 'Wǒmen zuò chūzūchē qù Xī’ān Fàndiàn.', english: 'We take a taxi to Xi’an Restaurant.' },
      ],
    },
    {
      id: 'hsk1-l06-g03',
      title: { en: 'The interrogative pronoun “怎么”', zh: '疑问代词“怎么”' },
      focusHanzi: ['怎么'],
      structure: '怎么 + 动词',
      explanation: {
        en: 'From 小语讲堂: 怎么 + verb is used to ask about the manner or method of an action.',
        zh: '小语讲堂：怎么+动词，询问方式。',
      },
      examples: [
        { id: 'hsk1-l06-s04', hanzi: '我们怎么去？', pinyin: 'Wǒmen zěnme qù?', english: 'How do we go?' },
        { id: 'hsk1-l06-s05', hanzi: '她怎么去超市？', pinyin: 'Tā zěnme qù chāoshì?', english: 'How does she go to the supermarket?' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l06-d01',
      title: { en: 'Cell phone numbers (Text 1)', zh: '手机号' },
      context: { en: 'On campus, Li Wen was asking Bai Jiayue for her cell phone number.', zh: '在校园里，李文向白家月要手机号。' },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l06-d01-01', speakerId: 'A', hanzi: '家月，你的手机号是多少？', pinyin: 'Jiāyuè, nǐ de shǒujīhào shì duōshao?', english: 'Jiayue, what’s your cell phone number?' },
        { id: 'hsk1-l06-d01-02', speakerId: 'B', hanzi: '我的手机号是+33 601493190。', pinyin: 'Wǒ de shǒujīhào shì +33 601493190.', english: 'My cell phone number is +33 601493190.' },
        { id: 'hsk1-l06-d01-03', speakerId: 'A', hanzi: '我的手机号是+86 13552721160。', pinyin: 'Wǒ de shǒujīhào shì +86 13552721160.', english: 'My cell phone number is +86 13552721160.' },
        { id: 'hsk1-l06-d01-04', speakerId: 'B', hanzi: '好的。', pinyin: 'Hǎo de.', english: 'OK.' },
      ],
    },
    {
      id: 'hsk1-l06-d02',
      title: { en: 'Going to the supermarket (Text 2)', zh: '去超市买东西' },
      context: { en: 'After class, Bai Jiayue and Chen Tianzhong were chatting in the classroom.', zh: '在教室里，下课后，白家月和陈天中在聊天儿。' },
      speakers: [
        { id: 'A', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l06-d02-01', speakerId: 'A', hanzi: '家月，明天你去哪儿？', pinyin: 'Jiāyuè, míngtiān nǐ qù nǎr?', english: 'Jiayue, where are you going tomorrow?' },
        { id: 'hsk1-l06-d02-02', speakerId: 'B', hanzi: '我想去超市买东西。', pinyin: 'Wǒ xiǎng qù chāoshì mǎi dōngxi.', english: 'I want to go to the supermarket to buy things.' },
        { id: 'hsk1-l06-d02-03', speakerId: 'A', hanzi: '你去超市买什么？', pinyin: 'Nǐ qù chāoshì mǎi shénme?', english: 'What are you going to buy at the supermarket?' },
        { id: 'hsk1-l06-d02-04', speakerId: 'B', hanzi: '我想买些牛奶。', pinyin: 'Wǒ xiǎng mǎi xiē niúnǎi.', english: 'I want to buy some milk.' },
      ],
    },
    {
      id: 'hsk1-l06-d03',
      title: { en: 'Weekend dinner plans (Text 3)', zh: '周末晚饭' },
      context: { en: 'At home, Wang Yixue’s family was discussing their plans for the weekend dinner.', zh: '在家里，王一雪全家在讨论周末晚餐安排。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female3' },
        { id: 'B', name: '刘明 Liú Míng', voice: 'male2' },
        { id: 'C', name: '刘小雪 Liú Xiǎoxuě', voice: 'girl' },
        { id: 'D', name: '刘小明 Liú Xiǎomíng', voice: 'boy' },
      ],
      lines: [
        { id: 'hsk1-l06-d03-01', speakerId: 'A', hanzi: '星期天我们去哪儿吃晚饭？', pinyin: 'Xīngqītiān wǒmen qù nǎr chī wǎnfàn?', english: 'Where are we having dinner on Sunday?' },
        { id: 'hsk1-l06-d03-02', speakerId: 'B', hanzi: '我还想去西安饭店。', pinyin: 'Wǒ hái xiǎng qù Xī’ān Fàndiàn.', english: 'I’d still like to go to Xi’an Restaurant.' },
        { id: 'hsk1-l06-d03-03', speakerId: 'C', hanzi: '那边的包子非常好吃，我想吃包子。', pinyin: 'Nàbiān de bāozi fēicháng hǎochī, wǒ xiǎng chī bāozi.', english: 'The buns there are extremely tasty — I want buns.' },
        { id: 'hsk1-l06-d03-04', speakerId: 'D', hanzi: '妈妈，我想吃米饭，不想吃包子。', pinyin: 'Māma, wǒ xiǎng chī mǐfàn, bù xiǎng chī bāozi.', english: 'Mom, I want rice — I don’t want buns.' },
        { id: 'hsk1-l06-d03-05', speakerId: 'A', hanzi: '好的。我们怎么去？', pinyin: 'Hǎo de. Wǒmen zěnme qù?', english: 'OK. How shall we go?' },
        { id: 'hsk1-l06-d03-06', speakerId: 'B', hanzi: '坐出租车去。', pinyin: 'Zuò chūzūchē qù.', english: 'By taxi.' },
      ],
    },
  ],
};

export default lesson06;
