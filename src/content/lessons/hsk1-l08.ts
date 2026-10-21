/**
 * Lesson 8 — extracted from 《新HSK教程1》第8课 (New HSK Course 1, Lesson 8).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 8-2 / 8-4 / 8-6 with word-card examples,
 *    text contexts (p5/p27/p45), 小语讲堂 grammar blocks (p26/p43/p44),
 *    exercises (p25/p42/p59), classroom activity (p61).
 *  - Textbook dialogue pages P55/P56/P59 (provided as screenshots): the three texts.
 *  - Listening-check answers printed in the PDF (p28/p46) corroborate the dialogues.
 *
 * All three grammar cards are the book's own 小语讲堂 content; read-aloud lines
 * live in `sentences` and are reused by the grammar cards.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson08: Lesson = {
  id: 'hsk1-l08',
  order: 8,
  title: { en: 'My father also works at a hospital', zh: '我爸爸也在医院工作' },
  titlePinyin: 'Wǒ bàba yě zài yīyuàn gōngzuò',
  objectives: [
    { en: 'Locations and positions', zh: '处所、位置' },
    { en: 'The preposition “在”', zh: '介词“在”' },
    { en: 'The modal verb “能”', zh: '能愿动词“能”' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs. Choose an item, ask about its location, and respond accordingly.', zh: '两人一组，选择一个物品，问答物品的方位。' },
    { en: 'Work in pairs and have a dialogue based on real-life situations.', zh: '两人一组，根据实际情况对话。' },
    { en: 'Answer according to the text: Where does Dr. Hu’s father work?', zh: '根据课文回答问题：胡医生的爸爸在哪工作？' },
    { en: 'Answer according to the text: Is Dr. Hu’s father busy with his job?', zh: '根据课文回答问题：胡医生的爸爸工作忙吗？' },
    { en: 'Pair work: use the given words/phrases to create a dialogue.', zh: '双人活动：两人一组，使用以下词语对话。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l08-v01', hanzi: '房间', pinyin: 'fángjiān', english: 'room', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v01-e01', hanzi: '我家有三个房间。', pinyin: 'Wǒ jiā yǒu sān gè fángjiān.', english: 'My home has three rooms.' },
        { id: 'hsk1-l08-v01-e02', hanzi: '我的房间很漂亮。', pinyin: 'Wǒ de fángjiān hěn piàoliang.', english: 'My room is very pretty.' },
      ],
    },
    {
      id: 'hsk1-l08-v02', hanzi: '外', pinyin: 'wài', english: 'outside', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v02-e01', hanzi: '我在房间外，她在房间里。', pinyin: 'Wǒ zài fángjiān wài, tā zài fángjiān lǐ.', english: 'I’m outside the room; she is inside.' },
        { id: 'hsk1-l08-v02-e02', hanzi: '学校外有一家商店。', pinyin: 'Xuéxiào wài yǒu yì jiā shāngdiàn.', english: 'There is a shop outside the school.' },
      ],
    },
    {
      id: 'hsk1-l08-v03', hanzi: '只', pinyin: 'zhī', english: 'for certain animals', partOfSpeech: 'm.',
      examples: [
        { id: 'hsk1-l08-v03-e01', hanzi: '我有一只猫。', pinyin: 'Wǒ yǒu yì zhī māo.', english: 'I have a cat.' },
        { id: 'hsk1-l08-v03-e02', hanzi: '他有只狗。', pinyin: 'Tā yǒu zhī gǒu.', english: 'He has a dog.' },
      ],
    },
    {
      id: 'hsk1-l08-v04', hanzi: '小', pinyin: 'xiǎo', english: 'small; little', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l08-v04-e01', hanzi: '我家有只小猫。', pinyin: 'Wǒ jiā yǒu zhī xiǎo māo.', english: 'My family has a kitten.' },
        { id: 'hsk1-l08-v04-e02', hanzi: '我有一个小妹妹。', pinyin: 'Wǒ yǒu yí gè xiǎo mèimei.', english: 'I have a little younger sister.' },
      ],
    },
    {
      id: 'hsk1-l08-v05', hanzi: '猫', pinyin: 'māo', english: 'cat', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v05-e01', hanzi: '我很喜欢我的小猫。', pinyin: 'Wǒ hěn xǐhuan wǒ de xiǎo māo.', english: 'I really like my kitten.' },
        { id: 'hsk1-l08-v05-e02', hanzi: '猫白天喜欢睡觉，晚上喜欢玩。', pinyin: 'Māo báitiān xǐhuan shuìjiào, wǎnshang xǐhuan wán.', english: 'Cats like sleeping by day and playing at night.' },
      ],
    },
    {
      id: 'hsk1-l08-v06', hanzi: '没', pinyin: 'méi', english: 'no; not; not yet', partOfSpeech: 'adv.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v06-e01', hanzi: '我还没吃饭呢。', pinyin: 'Wǒ hái méi chīfàn ne.', english: 'I haven’t eaten yet.' },
        { id: 'hsk1-l08-v06-e02', hanzi: '他没买菜，我现在去买。', pinyin: 'Tā méi mǎi cài, wǒ xiànzài qù mǎi.', english: 'He didn’t buy vegetables — I’ll go buy them now.' },
      ],
    },
    {
      id: 'hsk1-l08-v07', hanzi: '看见', pinyin: 'kànjiàn', english: 'see; catch sight of', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l08-v07-e01', hanzi: '我看见小猫了。', pinyin: 'Wǒ kànjiàn xiǎo māo le.', english: 'I saw the kitten.' },
        { id: 'hsk1-l08-v07-e02', hanzi: '他没看见我。', pinyin: 'Tā méi kànjiàn wǒ.', english: 'He didn’t see me.' },
      ],
    },
    {
      id: 'hsk1-l08-v08', hanzi: '桌子', pinyin: 'zhuōzi', english: 'table; desk', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v08-e01', hanzi: '桌子上有很多菜。', pinyin: 'Zhuōzi shang yǒu hěn duō cài.', english: 'There are many dishes on the table.' },
        { id: 'hsk1-l08-v08-e02', hanzi: '小猫在桌子下睡觉。', pinyin: 'Xiǎo māo zài zhuōzi xià shuìjiào.', english: 'The kitten is sleeping under the table.' },
      ],
    },
    {
      id: 'hsk1-l08-v09', hanzi: '下', pinyin: 'xià', english: 'low position or rank', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v09-e01', hanzi: '车下有一只小猫。', pinyin: 'Chē xià yǒu yì zhī xiǎo māo.', english: 'There is a kitten under the car.' },
        { id: 'hsk1-l08-v09-e02', hanzi: '你的书在桌子下呢。', pinyin: 'Nǐ de shū zài zhuōzi xià ne.', english: 'Your book is under the table.' },
      ],
    },
    {
      id: 'hsk1-l08-v10', hanzi: '漂亮', pinyin: 'piàoliang', english: 'pretty; beautiful', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l08-v10-e01', hanzi: '我的小猫很漂亮。', pinyin: 'Wǒ de xiǎo māo hěn piàoliang.', english: 'My kitten is very pretty.' },
        { id: 'hsk1-l08-v10-e02', hanzi: '你觉得这件衣服漂亮吗？', pinyin: 'Nǐ juéde zhè jiàn yīfu piàoliang ma?', english: 'Do you think this piece of clothing is pretty?' },
      ],
    },
    {
      id: 'hsk1-l08-v11', hanzi: '在', pinyin: 'zài', english: 'at/in', partOfSpeech: 'prep.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v11-e01', hanzi: '你在哪儿吃饭呢？', pinyin: 'Nǐ zài nǎr chīfàn ne?', english: 'Where are you eating?' },
        { id: 'hsk1-l08-v11-e02', hanzi: '我在商店买衣服呢。', pinyin: 'Wǒ zài shāngdiàn mǎi yīfu ne.', english: 'I’m buying clothes at the shop.' },
      ],
    },
    {
      id: 'hsk1-l08-v12', hanzi: '学校', pinyin: 'xuéxiào', english: 'school', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v12-e01', hanzi: '学校里有老师和同学。', pinyin: 'Xuéxiào lǐ yǒu lǎoshī hé tóngxué.', english: 'There are teachers and classmates at school.' },
        { id: 'hsk1-l08-v12-e02', hanzi: '我很喜欢我们学校。', pinyin: 'Wǒ hěn xǐhuan wǒmen xuéxiào.', english: 'I like our school very much.' },
      ],
    },
    {
      id: 'hsk1-l08-v13', hanzi: '书店', pinyin: 'shūdiàn', english: 'bookstore', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v13-e01', hanzi: '我要去书店买书。', pinyin: 'Wǒ yào qù shūdiàn mǎi shū.', english: 'I want to go to the bookstore to buy books.' },
        { id: 'hsk1-l08-v13-e02', hanzi: '学校里有一家书店。', pinyin: 'Xuéxiào lǐ yǒu yì jiā shūdiàn.', english: 'There is a bookstore inside the school.' },
      ],
    },
    {
      id: 'hsk1-l08-v14', hanzi: '前', pinyin: 'qián', english: 'front', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v14-e01', hanzi: '他坐在我的前边。', pinyin: 'Tā zuò zài wǒ de qiánbian.', english: 'He sits in front of me.' },
        { id: 'hsk1-l08-v14-e02', hanzi: '电脑前的手机是谁的？', pinyin: 'Diànnǎo qián de shǒujī shì shéi de?', english: 'Whose phone is the one in front of the computer?' },
      ],
    },
    {
      id: 'hsk1-l08-v15', hanzi: '能', pinyin: 'néng', english: 'can; be able to', partOfSpeech: 'mod.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v15-e01', hanzi: '我能做很多菜。', pinyin: 'Wǒ néng zuò hěn duō cài.', english: 'I can cook many dishes.' },
        { id: 'hsk1-l08-v15-e02', hanzi: '她能说汉语，她妹妹不能。', pinyin: 'Tā néng shuō Hànyǔ, tā mèimei bù néng.', english: 'She can speak Chinese; her younger sister can’t.' },
      ],
    },
    {
      id: 'hsk1-l08-v16', hanzi: '到', pinyin: 'dào', english: 'arrive; reach', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l08-v16-e01', hanzi: '喂，我到了，你在哪儿呢？', pinyin: 'Wèi, wǒ dào le, nǐ zài nǎr ne?', english: 'Hello? I’ve arrived — where are you?' },
        { id: 'hsk1-l08-v16-e02', hanzi: '你两点前能到公司吗？', pinyin: 'Nǐ liǎng diǎn qián néng dào gōngsī ma?', english: 'Can you reach the company before two?' },
      ],
    },
    {
      id: 'hsk1-l08-v17', hanzi: '午饭', pinyin: 'wǔfàn', english: 'lunch', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v17-e01', hanzi: '我在家里吃午饭。', pinyin: 'Wǒ zài jiā lǐ chī wǔfàn.', english: 'I eat lunch at home.' },
        { id: 'hsk1-l08-v17-e02', hanzi: '今天的午饭是面条儿。', pinyin: 'Jīntiān de wǔfàn shì miàntiáor.', english: 'Today’s lunch is noodles.' },
      ],
    },
    {
      id: 'hsk1-l08-v18', hanzi: '饭', pinyin: 'fàn', english: 'meal', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v18-e01', hanzi: '吃饭的时候不要说话。', pinyin: 'Chīfàn de shíhou búyào shuōhuà.', english: 'Don’t talk while eating.' },
        { id: 'hsk1-l08-v18-e02', hanzi: '今天你做饭，好吗？', pinyin: 'Jīntiān nǐ zuò fàn, hǎo ma?', english: 'You cook today, okay?' },
      ],
    },
    {
      id: 'hsk1-l08-v19', hanzi: '大', pinyin: 'dà', english: 'big; large', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l08-v19-e01', hanzi: '我家很大。', pinyin: 'Wǒ jiā hěn dà.', english: 'My home is very big.' },
        { id: 'hsk1-l08-v19-e02', hanzi: '你的房间大不大？', pinyin: 'Nǐ de fángjiān dà bu dà?', english: 'Is your room big?' },
        { id: 'hsk1-l08-v19-e03', hanzi: '雨不大。', pinyin: 'Yǔ bù dà.', english: 'The rain isn’t heavy.' },
      ],
    },
    {
      id: 'hsk1-l08-v20', hanzi: '病人', pinyin: 'bìngrén', english: 'patient', partOfSpeech: 'n.',
      examples: [
        { id: 'hsk1-l08-v20-e01', hanzi: '医院里有很多病人。', pinyin: 'Yīyuàn lǐ yǒu hěn duō bìngrén.', english: 'There are many patients at the hospital.' },
        { id: 'hsk1-l08-v20-e02', hanzi: '你是病人，要好好休息。', pinyin: 'Nǐ shì bìngrén, yào hǎohao xiūxi.', english: 'You’re a patient — you must rest well.' },
      ],
    },
    {
      id: 'hsk1-l08-v21', hanzi: '多', pinyin: 'duō', english: 'many; much', partOfSpeech: 'adj.',
      examples: [
        { id: 'hsk1-l08-v21-e01', hanzi: '她认识的朋友很多。', pinyin: 'Tā rènshi de péngyou hěn duō.', english: 'She knows many friends.' },
        { id: 'hsk1-l08-v21-e02', hanzi: '妈妈买的东西太多了！', pinyin: 'Māma mǎi de dōngxi tài duō le!', english: 'Mom bought far too many things!' },
      ],
    },
    {
      id: 'hsk1-l08-v22', hanzi: '医生', pinyin: 'yīshēng', english: 'doctor', partOfSpeech: 'n.', keyWord: true,
      examples: [
        { id: 'hsk1-l08-v22-e01', hanzi: '生病了要去看医生。', pinyin: 'Shēng bìng le yào qù kàn yīshēng.', english: 'If you’re ill you should see a doctor.' },
        { id: 'hsk1-l08-v22-e02', hanzi: '医生在医院看病。', pinyin: 'Yīshēng zài yīyuàn kàn bìng.', english: 'Doctors treat patients at the hospital.' },
        { id: 'hsk1-l08-v22-e03', hanzi: '你问问医生，我的病怎么样了？', pinyin: 'Nǐ wènwen yīshēng, wǒ de bìng zěnme yàng le?', english: 'Ask the doctor how my illness is.' },
      ],
    },
    {
      id: 'hsk1-l08-v23', hanzi: '工作', pinyin: 'gōngzuò', english: 'work', partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l08-v23-e01', hanzi: '老师在学校工作。', pinyin: 'Lǎoshī zài xuéxiào gōngzuò.', english: 'Teachers work at school.' },
        { id: 'hsk1-l08-v23-e02', hanzi: '白天，人们都在工作。', pinyin: 'Báitiān, rénmen dōu zài gōngzuò.', english: 'During the day, people are all working.' },
      ],
    },
    {
      id: 'hsk1-l08-v24', hanzi: '胡医生', pinyin: 'Hú yīshēng', english: 'Dr. Hu', partOfSpeech: 'proper n.',
    },
  ],
  sentences: [
    { id: 'hsk1-l08-s01', hanzi: '房间里有一只小猫。', pinyin: 'Fángjiān lǐ yǒu yì zhī xiǎo māo.', english: 'There is a kitten in the room.' },
    { id: 'hsk1-l08-s02', hanzi: '我们去书店外吧。', pinyin: 'Wǒmen qù shūdiàn wài ba.', english: 'Let’s go outside the bookstore.' },
    { id: 'hsk1-l08-s03', hanzi: '小雪的手机在桌子上呢。', pinyin: 'Xiǎoxuě de shǒujī zài zhuōzi shang ne.', english: 'Xiaoxue’s phone is on the table.' },
    { id: 'hsk1-l08-s04', hanzi: '我在学校吃午饭。', pinyin: 'Wǒ zài xuéxiào chī wǔfàn.', english: 'I eat lunch at school.' },
    { id: 'hsk1-l08-s05', hanzi: '他爸爸在医院工作。', pinyin: 'Tā bàba zài yīyuàn gōngzuò.', english: 'His father works at the hospital.' },
    { id: 'hsk1-l08-s06', hanzi: '你在哪儿买菜？', pinyin: 'Nǐ zài nǎr mǎi cài?', english: 'Where do you buy vegetables?' },
    { id: 'hsk1-l08-s07', hanzi: '下午两点你能到吗？', pinyin: 'Xiàwǔ liǎng diǎn nǐ néng dào ma?', english: 'Can you arrive at 2 pm?' },
    { id: 'hsk1-l08-s08', hanzi: '爸爸能去。', pinyin: 'Bàba néng qù.', english: 'Dad can go.' },
    { id: 'hsk1-l08-s09', hanzi: '我不能去学校吃午饭。', pinyin: 'Wǒ bù néng qù xuéxiào chī wǔfàn.', english: 'I can’t go to school for lunch.' },
  ],
  grammar: [
    {
      id: 'hsk1-l08-g01',
      title: { en: 'Position words', zh: '方位词' },
      focusHanzi: ['上', '下', '里', '外', '前', '后', '外边'],
      structure: '上、下、里、外、前、后、外边',
      explanation: {
        en: 'From 小语讲堂: the position words expressing direction and location introduced in this volume are 上, 下, 里, 外, 前, 后, 外边.',
        zh: '小语讲堂：本册学习的表达方向、位置的方位词有：上、下、里、外、前、后、外边。',
      },
      examples: [
        { id: 'hsk1-l08-s01', hanzi: '房间里有一只小猫。', pinyin: 'Fángjiān lǐ yǒu yì zhī xiǎo māo.', english: 'There is a kitten in the room.' },
        { id: 'hsk1-l08-s02', hanzi: '我们去书店外吧。', pinyin: 'Wǒmen qù shūdiàn wài ba.', english: 'Let’s go outside the bookstore.' },
        { id: 'hsk1-l08-s03', hanzi: '小雪的手机在桌子上呢。', pinyin: 'Xiǎoxuě de shǒujī zài zhuōzi shang ne.', english: 'Xiaoxue’s phone is on the table.' },
      ],
    },
    {
      id: 'hsk1-l08-g02',
      title: { en: 'The preposition “在”', zh: '介词“在”' },
      focusHanzi: ['在'],
      structure: '在 + 位置/处所 + 动词',
      explanation: {
        en: 'From 小语讲堂: 在 + words/phrases that indicate a location or place + verb — this structure shows where an action takes place.',
        zh: '小语讲堂：在+表示位置、处所的词语+动词，表示在什么位置、处所做什么。',
      },
      examples: [
        { id: 'hsk1-l08-s04', hanzi: '我在学校吃午饭。', pinyin: 'Wǒ zài xuéxiào chī wǔfàn.', english: 'I eat lunch at school.' },
        { id: 'hsk1-l08-s05', hanzi: '他爸爸在医院工作。', pinyin: 'Tā bàba zài yīyuàn gōngzuò.', english: 'His father works at the hospital.' },
        { id: 'hsk1-l08-s06', hanzi: '你在哪儿买菜？', pinyin: 'Nǐ zài nǎr mǎi cài?', english: 'Where do you buy vegetables?' },
      ],
    },
    {
      id: 'hsk1-l08-g03',
      title: { en: 'The modal verb “能”', zh: '能愿动词“能”' },
      focusHanzi: ['能', '不能'],
      structure: '能 + 动词',
      structureNegative: '不能 + 动词',
      explanation: {
        en: 'From 小语讲堂: 能 + verb indicates the ability, condition, or possibility of doing something.',
        zh: '小语讲堂：能+动词，表示有能力、有条件或可能做某事。',
      },
      examples: [
        { id: 'hsk1-l08-s07', hanzi: '下午两点你能到吗？', pinyin: 'Xiàwǔ liǎng diǎn nǐ néng dào ma?', english: 'Can you arrive at 2 pm?' },
        { id: 'hsk1-l08-s08', hanzi: '爸爸能去。', pinyin: 'Bàba néng qù.', english: 'Dad can go.' },
        { id: 'hsk1-l08-s09', hanzi: '我不能去学校吃午饭。', pinyin: 'Wǒ bù néng qù xuéxiào chī wǔfàn.', english: 'I can’t go to school for lunch.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l08-d01',
      title: { en: 'The kitten (Text 1)', zh: '一只小猫' },
      context: { en: 'At Wang Yifei’s home, Bai Jiayue and Chen Tianzhong came over for a visit.', zh: '在王一飞家，白家月和陈天中来做客。' },
      speakers: [
        { id: 'A', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'B', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l08-d01-01', speakerId: 'A', hanzi: '房间外有一只小猫。', pinyin: 'Fángjiān wài yǒu yì zhī xiǎo māo.', english: 'There’s a kitten outside the room.' },
        { id: 'hsk1-l08-d01-02', speakerId: 'B', hanzi: '我没看见，它在哪儿呢？', pinyin: 'Wǒ méi kànjiàn, tā zài nǎr ne?', english: 'I didn’t see it — where is it?' },
        { id: 'hsk1-l08-d01-03', speakerId: 'A', hanzi: '它在桌子下呢。', pinyin: 'Tā zài zhuōzi xià ne.', english: 'It’s under the table.' },
        { id: 'hsk1-l08-d01-04', speakerId: 'B', hanzi: '这只小猫真漂亮！', pinyin: 'Zhè zhī xiǎo māo zhēn piàoliang!', english: 'This kitten is really pretty!' },
      ],
    },
    {
      id: 'hsk1-l08-d02',
      title: { en: 'Where to meet (Text 2)', zh: '在哪儿见' },
      context: { en: 'After class, Bai Jiayue was calling Li Wen in the classroom.', zh: '在教室里，下课后，白家月给李文打电话。' },
      speakers: [
        { id: 'A', name: '白家月 Bái Jiāyuè', voice: 'female2' },
        { id: 'B', name: '李文 Lǐ Wén', voice: 'male2' },
      ],
      lines: [
        { id: 'hsk1-l08-d02-01', speakerId: 'A', hanzi: '我们在哪儿见呢？', pinyin: 'Wǒmen zài nǎr jiàn ne?', english: 'Where shall we meet?' },
        { id: 'hsk1-l08-d02-02', speakerId: 'B', hanzi: '在学校书店前见吧。', pinyin: 'Zài xuéxiào shūdiàn qián jiàn ba.', english: 'Let’s meet in front of the school bookstore.' },
        { id: 'hsk1-l08-d02-03', speakerId: 'A', hanzi: '好的。下午两点你能到吗？', pinyin: 'Hǎo de. Xiàwǔ liǎngdiǎn nǐ néng dào ma?', english: 'OK. Can you make it by 2 pm?' },
        { id: 'hsk1-l08-d02-04', speakerId: 'B', hanzi: '我能到。我在学校吃午饭。', pinyin: 'Wǒ néng dào. Wǒ zài xuéxiào chī wǔfàn.', english: 'I can make it. I’m having lunch at school.' },
      ],
    },
    {
      id: 'hsk1-l08-d03',
      title: { en: 'Two doctors in one family (Text 3)', zh: '胡医生' },
      context: { en: 'In the hospital, Liu Ming was chatting with Dr. Hu, his colleague.', zh: '在医院里，刘明和同事胡医生在聊天儿。' },
      speakers: [
        { id: 'A', name: '刘明 Liú Míng', voice: 'male2' },
        { id: 'B', name: '胡医生 Hú yīshēng', voice: 'male3' },
      ],
      lines: [
        { id: 'hsk1-l08-d03-01', speakerId: 'A', hanzi: '小胡，还没吃饭呢？', pinyin: 'Xiǎo Hú, hái méi chī fàn ne?', english: 'Little Hu — haven’t you eaten yet?' },
        { id: 'hsk1-l08-d03-02', speakerId: 'B', hanzi: '没吃呢。', pinyin: 'Méi chī ne.', english: 'Not yet.' },
        { id: 'hsk1-l08-d03-03', speakerId: 'A', hanzi: '大医院病人多，医生非常忙。', pinyin: 'Dà yīyuàn bìngrén duō, yīshēng fēicháng máng.', english: 'Big hospitals have many patients — doctors are extremely busy.' },
        { id: 'hsk1-l08-d03-04', speakerId: 'B', hanzi: '是的。我爸爸也在医院工作，他也非常忙。', pinyin: 'Shì de. Wǒ bàba yě zài yīyuàn gōngzuò, tā yě fēicháng máng.', english: 'Yes. My father also works at a hospital — he is also extremely busy.' },
        { id: 'hsk1-l08-d03-05', speakerId: 'A', hanzi: '你家有两个医生？', pinyin: 'Nǐ jiā yǒu liǎng gè yīshēng?', english: 'There are two doctors in your family?' },
        { id: 'hsk1-l08-d03-06', speakerId: 'B', hanzi: '对。', pinyin: 'Duì.', english: 'That’s right.' },
      ],
    },
  ],
};

export default lesson08;
