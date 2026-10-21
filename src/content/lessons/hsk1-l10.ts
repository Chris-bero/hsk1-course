/**
 * Lesson 10 — extracted from 《新HSK教程1》第10课 (New HSK Course 1, Lesson 10).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 10-2 / 10-4 / 10-6 with word-card examples,
 *    text contexts (p5/p21/p36), 小语讲堂 grammar blocks (p19/p35/p58),
 *    exercises (p18/p34/p57), role-play activity (p60).
 *  - Textbook dialogue pages P71/P73/P75 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p22/p37) corroborate the dialogues.
 *
 * Notes: the book's 商店 gloss prints "stop; store" — stored as "shop; store".
 * The RMB card's "=" example uses an audioText override so TTS reads it naturally.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson10: Lesson = {
  id: 'hsk1-l10',
  order: 10,
  title: { en: 'The apples here are really affordable!', zh: '这儿的苹果真便宜！' },
  titlePinyin: 'Zhèr de píngguǒ zhēn piányi!',
  objectives: [
    { en: 'Product prices', zh: '商品价格' },
    { en: 'Adjectival-predicate sentences', zh: '形容词谓语句' },
    { en: 'The interrogative pronoun “怎么样”', zh: '疑问代词“怎么样”' },
    { en: 'Renminbi (RMB)', zh: '人民币' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs. Choose an item and ask and answer questions about its price.', zh: '两人一组，选择一个物品，互相问答价格。' },
    { en: 'Work in pairs. One student plays the customer, the other the vendor — role-play a shopping conversation.', zh: '两人一组，一个人扮演顾客，一个人扮演售货员，进行购物问答。' },
    { en: 'Answer according to the text: How many pieces of that clothing does Wang Yixue want to buy?', zh: '根据课文回答问题：那件衣服王一雪想买几件？' },
    { en: 'Answer according to the text: Where is the boys’ section?', zh: '根据课文回答问题：男孩子的衣服在哪儿？' },
    { en: 'Role-play: in groups of three, one plays the shop assistant and two play customers, referring to the three texts.', zh: '角色扮演：三人一组，一个人扮演售货员，两个人扮演顾客，仿照本课三篇课文的内容对话。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l10-v01', hanzi: '杯子', pinyin: 'bēizi', english: 'cup; glass', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l10-v01-e01', hanzi: '这个杯子太小了。', pinyin: 'Zhège bēizi tài xiǎo le.', english: 'This cup is too small.' },
        { id: 'hsk1-l10-v01-e02', hanzi: '昨天我买了四个杯子。', pinyin: 'Zuótiān wǒ mǎi le sì gè bēizi.', english: 'Yesterday I bought four cups.' },
      ],
    },
    {
      id: 'hsk1-l10-v02', hanzi: '售货员', pinyin: 'shòuhuòyuán', english: 'shop assistant; salesperson; vendor', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l10-v02-e01', hanzi: '我是这个商店的售货员。', pinyin: 'Wǒ shì zhège shāngdiàn de shòuhuòyuán.', english: 'I am the shop assistant of this store.' },
        { id: 'hsk1-l10-v02-e02', hanzi: '这个杯子多少钱？不知道，问一下售货员吧。', pinyin: 'Zhège bēizi duōshao qián? Bù zhīdào, wèn yíxià shòuhuòyuán ba.', english: 'A: How much is this cup? B: No idea — let’s ask the shop assistant.' },
      ],
    },
    {
      id: 'hsk1-l10-v03', hanzi: '这边', pinyin: 'zhèbiān', english: 'here; this side', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l10-v03-e01', hanzi: '来这边坐吧。', pinyin: 'Lái zhèbiān zuò ba.', english: 'Come sit over here.' },
        { id: 'hsk1-l10-v03-e02', hanzi: '我住在这边。', pinyin: 'Wǒ zhù zài zhèbiān.', english: 'I live on this side.' },
      ],
    },
    {
      id: 'hsk1-l10-v04', hanzi: '钱', pinyin: 'qián', english: 'money', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v04-e01', hanzi: '她这个月没有钱了。', pinyin: 'Tā zhège yuè méiyǒu qián le.', english: 'She has no money left this month.' },
        { id: 'hsk1-l10-v04-e02', hanzi: '这些苹果八块钱。', pinyin: 'Zhèxiē píngguǒ bā kuài qián.', english: 'These apples are eight yuan.' },
      ],
    },
    {
      id: 'hsk1-l10-v05', hanzi: '块', pinyin: 'kuài', english: 'for silver dollars or paper money', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l10-v05-e01', hanzi: '这些苹果15块钱？', pinyin: 'Zhèxiē píngguǒ shíwǔ kuài qián?', english: 'These apples are 15 yuan?' },
        { id: 'hsk1-l10-v05-e02', hanzi: '这本书40块钱。', pinyin: 'Zhè běn shū sìshí kuài qián.', english: 'This book is 40 yuan.' },
      ],
    },
    {
      id: 'hsk1-l10-v06', hanzi: '这些', pinyin: 'zhèxiē', english: 'these', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l10-v06-e01', hanzi: '这些人我都认识。', pinyin: 'Zhèxiē rén wǒ dōu rènshi.', english: 'I know all of these people.' },
        { id: 'hsk1-l10-v06-e02', hanzi: '这些东西都是你的吗？', pinyin: 'Zhèxiē dōngxi dōu shì nǐ de ma?', english: 'Are all these things yours?' },
      ],
    },
    {
      id: 'hsk1-l10-v07', hanzi: '那些', pinyin: 'nàxiē', english: 'those', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l10-v07-e01', hanzi: '那些书是我的。', pinyin: 'Nàxiē shū shì wǒ de.', english: 'Those books are mine.' },
        { id: 'hsk1-l10-v07-e02', hanzi: '那些人来做什么？', pinyin: 'Nàxiē rén lái zuò shénme?', english: 'What did those people come for?' },
      ],
    },
    {
      id: 'hsk1-l10-v08', hanzi: '这儿', pinyin: 'zhèr', english: 'here', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l10-v08-e01', hanzi: '请问，这儿卖水果吗？', pinyin: 'Qǐngwèn, zhèr mài shuǐguǒ ma?', english: 'Excuse me, do you sell fruit here?' },
        { id: 'hsk1-l10-v08-e02', hanzi: '这儿有一些苹果。', pinyin: 'Zhèr yǒu yìxiē píngguǒ.', english: 'There are some apples here.' },
      ],
    },
    {
      id: 'hsk1-l10-v09', hanzi: '水果', pinyin: 'shuǐguǒ', english: 'fruit', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v09-e01', hanzi: '你喜欢吃什么水果？', pinyin: 'Nǐ xǐhuan chī shénme shuǐguǒ?', english: 'What fruit do you like eating?' },
        { id: 'hsk1-l10-v09-e02', hanzi: '水果店在哪儿？', pinyin: 'Shuǐguǒ diàn zài nǎr?', english: 'Where is the fruit shop?' },
      ],
    },
    {
      id: 'hsk1-l10-v10', hanzi: '少', pinyin: 'shǎo', english: 'few; little', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l10-v10-e01', hanzi: '今天她买了不少水果。', pinyin: 'Jīntiān tā mǎi le bù shǎo shuǐguǒ.', english: 'She bought quite a lot of fruit today.' },
        { id: 'hsk1-l10-v10-e02', hanzi: '她认识的中国朋友很少。', pinyin: 'Tā rènshi de Zhōngguó péngyou hěn shǎo.', english: 'She knows very few Chinese friends.' },
      ],
    },
    {
      id: 'hsk1-l10-v11', hanzi: '斤', pinyin: 'jīn', english: 'jin (half a kilogram)', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l10-v11-e01', hanzi: '我买了一斤苹果，很便宜。', pinyin: 'Wǒ mǎi le yì jīn píngguǒ, hěn piányi.', english: 'I bought one jin of apples — very cheap.' },
        { id: 'hsk1-l10-v11-e02', hanzi: '苹果三块五一斤。', pinyin: 'Píngguǒ sān kuài wǔ yì jīn.', english: 'Apples are 3.5 yuan per jin.' },
      ],
    },
    {
      id: 'hsk1-l10-v12', hanzi: '苹果', pinyin: 'píngguǒ', english: 'apple', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v12-e01', hanzi: '我早上吃了一个苹果。', pinyin: 'Wǒ zǎoshang chī le yí gè píngguǒ.', english: 'I ate an apple in the morning.' },
        { id: 'hsk1-l10-v12-e02', hanzi: '我去超市买了些苹果。', pinyin: 'Wǒ qù chāoshì mǎi le xiē píngguǒ.', english: 'I bought some apples at the supermarket.' },
      ],
    },
    {
      id: 'hsk1-l10-v13', hanzi: '便宜', pinyin: 'piányi', english: 'cheap; affordable', partOfSpeech: 'adj.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v13-e01', hanzi: '这件衣服不贵，很便宜。', pinyin: 'Zhè jiàn yīfu bù guì, hěn piányi.', english: 'This piece of clothing isn’t expensive — very cheap.' },
        { id: 'hsk1-l10-v13-e02', hanzi: '我觉得这个手机不便宜。', pinyin: 'Wǒ juéde zhè ge shǒujī bù piányi.', english: 'I don’t think this phone is cheap.' },
      ],
    },
    {
      id: 'hsk1-l10-v14', hanzi: '商店', pinyin: 'shāngdiàn', english: 'shop; store', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l10-v14-e01', hanzi: '妈妈去商店买了几件衣服。', pinyin: 'Māma qù shāngdiàn mǎi le jǐ jiàn yīfu.', english: 'Mom went to the store and bought a few pieces of clothing.' },
        { id: 'hsk1-l10-v14-e02', hanzi: '这家商店很小，东西不多。', pinyin: 'Zhè jiā shāngdiàn hěn xiǎo, dōngxi bù duō.', english: 'This shop is very small — not many things.' },
      ],
    },
    {
      id: 'hsk1-l10-v15', hanzi: '衣服', pinyin: 'yīfu', english: 'clothes', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v15-e01', hanzi: '这件衣服是谁的？', pinyin: 'Zhè jiàn yīfu shì shéi de?', english: 'Whose piece of clothing is this?' },
        { id: 'hsk1-l10-v15-e02', hanzi: '我在外面买衣服呢，不在家。', pinyin: 'Wǒ zài wàimian mǎi yīfu ne, bù zài jiā.', english: 'I’m out buying clothes — I’m not at home.' },
      ],
    },
    {
      id: 'hsk1-l10-v16', hanzi: '件', pinyin: 'jiàn', english: 'piece', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l10-v16-e01', hanzi: '这件事妈妈不知道，你不要说。', pinyin: 'Zhè jiàn shì māma bù zhīdào, nǐ búyào shuō.', english: 'Mom doesn’t know about this — don’t tell her.' },
        { id: 'hsk1-l10-v16-e02', hanzi: '我昨天买了三件衣服。', pinyin: 'Wǒ zuótiān mǎi le sān jiàn yīfu.', english: 'I bought three pieces of clothing yesterday.' },
      ],
    },
    {
      id: 'hsk1-l10-v17', hanzi: '元', pinyin: 'yuán', english: 'yuan', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l10-v17-e01', hanzi: '这件衣服一百元。', pinyin: 'Zhè jiàn yīfu yìbǎi yuán.', english: 'This piece of clothing is 100 yuan.' },
        { id: 'hsk1-l10-v17-e02', hanzi: '我喜欢的那个杯子卖二十元。', pinyin: 'Wǒ xǐhuan de nà ge bēizi mài èrshí yuán.', english: 'That cup I like sells for 20 yuan.' },
      ],
    },
    {
      id: 'hsk1-l10-v18', hanzi: '怎么样', pinyin: 'zěnmeyàng', english: 'how (used to ask about nature, condition, manner, etc.)', partOfSpeech: 'pron.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v18-e01', hanzi: '这件衣服怎么样?', pinyin: 'Zhè jiàn yīfu zěnmeyàng?', english: 'How is this piece of clothing?' },
        { id: 'hsk1-l10-v18-e02', hanzi: '你觉得昨天的电影怎么样？', pinyin: 'Nǐ juéde zuótiān de diānyǐng zěnmeyàng?', english: 'What did you think of yesterday’s movie?' },
      ],
    },
    {
      id: 'hsk1-l10-v19', hanzi: '贵', pinyin: 'guì', english: 'expensive', partOfSpeech: 'adj.', keyWord: true,
      examples: [
        { id: 'hsk1-l10-v19-e01', hanzi: '这个手机太贵了！', pinyin: 'Zhè ge shǒujī tài guì le!', english: 'This phone is too expensive!' },
        { id: 'hsk1-l10-v19-e02', hanzi: '这件衣服我很喜欢，也不贵。', pinyin: 'Zhè jiàn yīfu wǒ hěn xǐhuan, yě bù guì.', english: 'I really like this piece of clothing, and it’s not expensive.' },
      ],
    },
    {
      id: 'hsk1-l10-v20', hanzi: '穿', pinyin: 'chuān', english: 'wear; put on', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l10-v20-e01', hanzi: '她今天穿的那件衣服很漂亮。', pinyin: 'Tā jīntiān chuān de nà jiàn yīfu hěn piàoliang.', english: 'The clothes she is wearing today are very pretty.' },
        { id: 'hsk1-l10-v20-e02', hanzi: '弟弟不想穿这件衣服，要穿那件。', pinyin: 'Dìdi bù xiǎng chuān zhè jiàn yīfu, yào chuān nà jiàn.', english: 'Little brother doesn’t want to wear this one — he wants that one.' },
      ],
    },
    {
      id: 'hsk1-l10-v21', hanzi: '女', pinyin: 'nǚ', english: 'female; women', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l10-v21-e01', hanzi: '请女同学们来这边。', pinyin: 'Qǐng nǚ tóngxuémen lái zhèbiān.', english: 'Girls, please come over here.' },
        { id: 'hsk1-l10-v21-e02', hanzi: '我不认识那个女老师。', pinyin: 'Wǒ bù rènshi nà ge nǚ lǎoshī.', english: 'I don’t know that female teacher.' },
      ],
    },
    {
      id: 'hsk1-l10-v22', hanzi: '男', pinyin: 'nán', english: 'male; man', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l10-v22-e01', hanzi: '我们医院有很多男医生。', pinyin: 'Wǒmen yīyuàn yǒu hěn duō nán yīshēng.', english: 'Our hospital has many male doctors.' },
        { id: 'hsk1-l10-v22-e02', hanzi: '那个男同学是谁？', pinyin: 'Nà ge nán tóngxué shì shéi?', english: 'Who is that male classmate?' },
      ],
    },
    {
      id: 'hsk1-l10-v23', hanzi: '那儿', pinyin: 'nàr', english: 'there; that place', partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l10-v23-e01', hanzi: '看，那儿有很多学生。', pinyin: 'Kàn, nàr yǒu hěn duō xuéshēng.', english: 'Look — there are many students over there.' },
        { id: 'hsk1-l10-v23-e02', hanzi: '我们去那儿玩吧。', pinyin: 'Wǒmen qù nàr wán ba.', english: 'Let’s go play over there.' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l10-s01', hanzi: '三元两角八分 = 三块两毛八分', pinyin: 'Sān yuán liǎng jiǎo bā fēn = sān kuài liǎng mǎo bā fēn.', english: '3 yuan 2 jiao 8 fen = 3 kuai 2 mao 8 fen.', audioText: '三元两角八分，也就是三块两毛八分。' },
    { id: 'hsk1-l10-s02', hanzi: '我的房间不大。', pinyin: 'Wǒ de fángjiān bù dà.', english: 'My room is not big.' },
    { id: 'hsk1-l10-s03', hanzi: '那个苹果好吃。', pinyin: 'Nà ge píngguǒ hǎochī.', english: 'That apple is tasty.' },
    { id: 'hsk1-l10-s04', hanzi: '这个杯子怎么样？我很喜欢，也不贵。', pinyin: 'Zhè ge bēizi zěnmeyàng? Wǒ hěn xǐhuan, yě bù guì.', english: 'A: How is this cup? B: I like it a lot, and it’s not expensive.' },
    { id: 'hsk1-l10-s05', hanzi: '这本书怎么样？很好看。', pinyin: 'Zhè běn shū zěnmeyàng? Hěn hǎkàn.', english: 'A: How is this book? B: Very good.' },
    { id: 'hsk1-l10-s06', hanzi: '这个菜怎么样？这个菜不太好吃，我不喜欢。', pinyin: 'Zhè ge cài zěnmeyàng? Zhè ge cài bù tài hǎochī, wǒ bù xǐhuan.', english: 'A: How is this dish? B: Not very tasty — I don’t like it.' },
  ],
  grammar: [
    {
      id: 'hsk1-l10-g01',
      title: { en: 'Expression of amounts of money (RMB)', zh: '钱数的表达（人民币）' },
      focusHanzi: ['元', '角', '分', '块', '毛'],
      structure: '元/块 → 角/毛 → 分',
      explanation: {
        en: 'From 小语讲堂: China’s currency is the Renminbi (RMB). Its units, from largest to smallest, are 元, 角, 分 — colloquially 块, 毛, 分. The order of denomination is 元/块 → 角/毛 → 分.',
        zh: '小语讲堂：中国的货币叫人民币。单位由大到小是“元、角、分”，口语中也分别说“块、毛、分”。表达顺序是：元/块→角/毛→分。',
      },
      examples: [
        { id: 'hsk1-l10-s01', hanzi: '三元两角八分 = 三块两毛八分', pinyin: 'Sān yuán liǎng jiǎo bā fēn = sān kuài liǎng mǎo bā fēn.', english: '3 yuan 2 jiao 8 fen = 3 kuai 2 mao 8 fen.' },
        { id: 'hsk1-l10-d02-04', hanzi: '苹果三块五一斤。这些七块二，七块钱吧。', pinyin: 'Píngguǒ sān kuài wǔ yì jīn. Zhèxiē qī kuài èr, qī kuài qián ba.', english: 'Apples are 3.5 per jin. These come to 7.2 — make it 7 yuan.' },
      ],
    },
    {
      id: 'hsk1-l10-g02',
      title: { en: 'Adjectival-predicate sentences', zh: '形容词谓语句' },
      structure: '主语 + (程度副词/否定副词) + 形容词',
      explanation: {
        en: 'From 小语讲堂: adjectives can be used directly as predicates, with adverbs of degree or negative adverbs optionally placed before them (no “是” needed).',
        zh: '小语讲堂：形容词可以直接作谓语，前面可用程度副词或否定副词（不用“是”）。',
      },
      examples: [
        { id: 'hsk1-l10-d02-01', hanzi: '这儿的水果真不少！', pinyin: 'Zhèr de shuǐguǒ zhēn bù shǎo!', english: 'There’s really no shortage of fruit here!' },
        { id: 'hsk1-l10-s02', hanzi: '我的房间不大。', pinyin: 'Wǒ de fángjiān bù dà.', english: 'My room is not big.' },
        { id: 'hsk1-l10-s03', hanzi: '那个苹果好吃。', pinyin: 'Nà ge píngguǒ hǎochī.', english: 'That apple is tasty.' },
      ],
    },
    {
      id: 'hsk1-l10-g03',
      title: { en: 'The interrogative pronoun “怎么样”', zh: '疑问代词“怎么样”' },
      focusHanzi: ['怎么样'],
      structure: '……怎么样？',
      explanation: {
        en: 'From 小语讲堂: the interrogative pronoun “怎么样” is used to ask for opinions or inquire about a situation.',
        zh: '小语讲堂：疑问代词“怎么样”用于征求意见、询问状况等。',
      },
      examples: [
        { id: 'hsk1-l10-s04', hanzi: '这个杯子怎么样？我很喜欢，也不贵。', pinyin: 'Zhè ge bēizi zěnmeyàng? Wǒ hěn xǐhuan, yě bù guì.', english: 'A: How is this cup? B: I like it a lot, and it’s not expensive.' },
        { id: 'hsk1-l10-s05', hanzi: '这本书怎么样？很好看。', pinyin: 'Zhè běn shū zěnmeyàng? Hěn hǎkàn.', english: 'A: How is this book? B: Very good.' },
        { id: 'hsk1-l10-s06', hanzi: '这个菜怎么样？这个菜不太好吃，我不喜欢。', pinyin: 'Zhè ge cài zěnmeyàng? Zhè ge cài bù tài hǎochī, wǒ bù xǐhuan.', english: 'A: How is this dish? B: Not very tasty — I don’t like it.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l10-d01',
      title: { en: 'Buying a cup (Text 1)', zh: '买杯子' },
      context: { en: 'In a small shop, Wang Yixue was buying a cup.', zh: '在一家小店，王一雪在买杯子。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female' },
        { id: 'B', name: '售货员 shòuhuòyuán', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l10-d01-01', speakerId: 'A', hanzi: '请问，有杯子吗？', pinyin: 'Qǐngwèn, yǒu bēizi ma?', english: 'Excuse me, do you have cups?' },
        { id: 'hsk1-l10-d01-02', speakerId: 'B', hanzi: '有，杯子在这边。', pinyin: 'Yǒu, bēizi zài zhèbiān.', english: 'Yes — the cups are over here.' },
        { id: 'hsk1-l10-d01-03', speakerId: 'A', hanzi: '多少钱一个？', pinyin: 'Duōshao qián yí gè?', english: 'How much is one?' },
        { id: 'hsk1-l10-d01-04', speakerId: 'B', hanzi: '这些五块钱一个，那些十块钱一个。', pinyin: 'Zhèxiē wǔ kuài qián yí gè, nàxiē shí kuài qián yí gè.', english: 'These are five yuan each; those are ten yuan each.' },
        { id: 'hsk1-l10-d01-05', speakerId: 'A', hanzi: '我买这个吧。', pinyin: 'Wǒ mǎi zhè ge ba.', english: 'I’ll take this one.' },
      ],
    },
    {
      id: 'hsk1-l10-d02',
      title: { en: 'Buying fruit (Text 2)', zh: '买水果' },
      context: { en: 'At the market, Wang Yixue was buying fruit.', zh: '在菜市场，王一雪在买水果。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female' },
        { id: 'B', name: '售货员 shòuhuòyuán', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l10-d02-01', speakerId: 'A', hanzi: '这儿的水果真不少！', pinyin: 'Zhèr de shuǐguǒ zhēn bù shǎo!', english: 'There’s really no shortage of fruit here!' },
        { id: 'hsk1-l10-d02-02', speakerId: 'B', hanzi: '您想买什么？', pinyin: 'Nín xiǎng mǎi shénme?', english: 'What would you like to buy?' },
        { id: 'hsk1-l10-d02-03', speakerId: 'A', hanzi: '我想买两斤苹果。', pinyin: 'Wǒ xiǎng mǎi liǎng jīn píngguǒ.', english: 'I want to buy two jin of apples.' },
        { id: 'hsk1-l10-d02-04', speakerId: 'B', hanzi: '苹果三块五一斤。这些七块二，七块钱吧。', pinyin: 'Píngguǒ sān kuài wǔ yì jīn. Zhèxiē qī kuài èr, qī kuài qián ba.', english: 'Apples are 3.5 per jin. These come to 7.2 — make it 7 yuan.' },
        { id: 'hsk1-l10-d02-05', speakerId: 'A', hanzi: '好的，这儿的苹果真便宜！', pinyin: 'Hǎo de, zhèr de píngguǒ zhēn piányi!', english: 'OK — the apples here are really cheap!' },
      ],
    },
    {
      id: 'hsk1-l10-d03',
      title: { en: 'Clothes for the kids (Text 3)', zh: '买衣服' },
      context: { en: 'In the shopping mall, Liu Ming and Wang Yixue were shopping for clothes for their children.', zh: '在商场里，刘明和王一雪在给孩子买衣服。' },
      speakers: [
        { id: 'A', name: '王一雪 Wáng Yīxuě', voice: 'female' },
        { id: 'B', name: '刘明 Liú Míng', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l10-d03-01', speakerId: 'A', hanzi: '这家商店衣服真多！这件一百元，怎么样？', pinyin: 'Zhè jiā shāngdiàn yīfu zhēn duō! Zhè jiàn yìbǎi yuán, zěnmeyàng?', english: 'This shop really has lots of clothes! This one is 100 yuan — what do you think?' },
        { id: 'hsk1-l10-d03-02', speakerId: 'B', hanzi: '好看，也不贵。', pinyin: 'Hǎkàn, yě bù guì.', english: 'Nice-looking, and not expensive.' },
        { id: 'hsk1-l10-d03-03', speakerId: 'A', hanzi: '小雪能穿，买一件吧。', pinyin: 'Xiǎoxuě néng chuān, mǎi yí jiàn ba.', english: 'Xiaoxue can wear it — let’s buy one.' },
        { id: 'hsk1-l10-d03-04', speakerId: 'B', hanzi: '好的。小明能穿吗？', pinyin: 'Hǎo de. Xiǎomíng néng chuān ma?', english: 'OK. Can Xiaoming wear it?' },
        { id: 'hsk1-l10-d03-05', speakerId: 'A', hanzi: '不能。这些是女孩子穿的衣服，男孩子的衣服在那儿。', pinyin: 'Bù néng. Zhèxiē shì nǚ háizi chuān de yīfu, nán háizi de yīfu zài nàr.', english: 'No — these are girls’ clothes; the boys’ clothes are over there.' },
        { id: 'hsk1-l10-d03-06', speakerId: 'B', hanzi: '好的。', pinyin: 'Hǎo de.', english: 'OK.' },
      ],
    },
  ],
};

export default lesson10;
