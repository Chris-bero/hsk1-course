/**
 * Lesson 2 — extracted from 《新HSK教程1》第2课 (New HSK Course 1, Lesson 2).
 * Sources:
 *  - PDF: objectives (p3), new-word lists 2-2 / 2-4 / 2-6 with example sentences
 *    from the word cards, text contexts (p4/p17/p27), exercises (p16/p25/p36),
 *    小语讲堂 grammar block (p26), tongue twister 2-7 (p37).
 *  - Textbook dialogue pages P6–P8 (provided as screenshots): the three texts.
 *
 * Grammar: g01 is the book's own 小语讲堂 block (verbatim). g02 (Chinese name
 * structure) is derived from the lesson objective "中文姓名构成" plus the
 * names used in the dialogues — replace it if print-textbook notes appear.
 *
 * IDs follow the stable scheme in src/types/content.ts.
 */
import type { Lesson } from '../../types/content';

const lesson02: Lesson = {
  id: 'hsk1-l02',
  order: 2,
  title: { en: 'My name is Li Wen', zh: '我叫李文' },
  titlePinyin: 'Wǒ jiào Lǐ Wén',
  objectives: [
    { en: 'Self-introductions', zh: '自我介绍' },
    { en: 'Expressions of apology', zh: '致歉语' },
    { en: 'The basic word order in Chinese', zh: '汉语的基本语序' },
    { en: 'The structure of Chinese names', zh: '中文姓名构成' },
  ],
  activities: [
    { en: 'Role-play the dialogue.', zh: '分角色朗读对话。' },
    { en: 'Work in pairs. Ask and answer questions using your own names.', zh: '两人一组，用自己的名字互相问答。' },
    { en: 'Work in pairs and have a dialogue using your real names.', zh: '两人一组，用真实姓名对话。' },
    { en: 'Work in pairs and introduce yourselves using your own names.', zh: '两人一组，用自己的名字自我介绍。' },
  ],
  vocabulary: [
    {
      id: 'hsk1-l02-v01',
      hanzi: '请问',
      pinyin: 'qǐngwèn',
      english: 'excuse me',
      partOfSpeech: 'v.',
      examples: [
        { id: 'hsk1-l02-v01-e01', hanzi: '请问超市在哪儿？', pinyin: 'Qǐngwèn chāoshì zài nǎr?', english: 'Excuse me, where is the supermarket?' },
        { id: 'hsk1-l02-v01-e02', hanzi: '请问，您是王老师吗？', pinyin: 'Qǐngwèn, nín shì Wáng lǎoshī ma?', english: 'Excuse me, are you Teacher Wang?' },
      ],
    },
    {
      id: 'hsk1-l02-v02',
      hanzi: '你',
      pinyin: 'nǐ',
      english: '(singular) you',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l02-v02-e01', hanzi: '你好!', pinyin: 'Nǐ hǎo!', english: 'Hello!' },
        { id: 'hsk1-l02-v02-e02', hanzi: '你是谁？', pinyin: 'Nǐ shì shéi?', english: 'Who are you?' },
      ],
    },
    {
      id: 'hsk1-l02-v03',
      hanzi: '叫',
      pinyin: 'jiào',
      english: 'be called as',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l02-v03-e01', hanzi: '她的名字叫什么？', pinyin: 'Tā de míngzi jiào shénme?', english: 'What is her name?' },
        { id: 'hsk1-l02-v03-e02', hanzi: '我的猫叫Coco。', pinyin: 'Wǒ de māo jiào Coco.', english: 'My cat is called Coco.' },
      ],
    },
    {
      id: 'hsk1-l02-v04',
      hanzi: '什么',
      pinyin: 'shénme',
      english: 'what',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l02-v04-e01', hanzi: '这是什么？', pinyin: 'Zhè shì shénme?', english: 'What is this?' },
        { id: 'hsk1-l02-v04-e02', hanzi: '他什么时候来？', pinyin: 'Tā shénme shíhou lái?', english: 'When is he coming?' },
      ],
    },
    {
      id: 'hsk1-l02-v05',
      hanzi: '名字',
      pinyin: 'míngzi',
      english: 'name',
      partOfSpeech: 'n.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l02-v05-e01', hanzi: '这个名字真好。', pinyin: 'Zhège míngzi zhēn hǎo.', english: 'This name is really nice.' },
        { id: 'hsk1-l02-v05-e02', hanzi: '你的猫叫什么名字？', pinyin: 'Nǐ de māo jiào shénme míngzi?', english: 'What is your cat’s name?' },
      ],
    },
    {
      id: 'hsk1-l02-v06',
      hanzi: '我',
      pinyin: 'wǒ',
      english: 'I; me',
      partOfSpeech: 'pron.',
      examples: [
        { id: 'hsk1-l02-v06-e01', hanzi: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', english: 'I am a student.' },
        { id: 'hsk1-l02-v06-e02', hanzi: '我也去。', pinyin: 'Wǒ yě qù.', english: 'I am going too.' },
      ],
    },
    {
      id: 'hsk1-l02-v07',
      hanzi: '不',
      pinyin: 'bù',
      english: 'not; no',
      partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l02-v07-e01', hanzi: '我不是白家月。', pinyin: 'Wǒ bú shì Bái Jiāyuè.', english: 'I am not Bai Jiayue.' },
        { id: 'hsk1-l02-v07-e02', hanzi: '这个名字不好。', pinyin: 'Zhège míngzi bù hǎo.', english: 'This name is not good.' },
      ],
    },
    {
      id: 'hsk1-l02-v08',
      hanzi: '是',
      pinyin: 'shì',
      english: 'be',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l02-v08-e01', hanzi: '她是谁？', pinyin: 'Tā shì shéi?', english: 'Who is she?' },
        // Same sentence as v06-e01 — ID reused, single audio clip.
        { id: 'hsk1-l02-v06-e01', hanzi: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', english: 'I am a student.' },
      ],
    },
    {
      id: 'hsk1-l02-v09',
      hanzi: '对不起',
      pinyin: 'duìbuqǐ',
      english: 'sorry',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l02-v09-e01', hanzi: '对不起！没关系！/没事！', pinyin: 'Duìbuqǐ! Méi guānxi! / Méishì!', english: 'A: Sorry! B: That’s all right! / It doesn’t matter!' },
      ],
    },
    {
      id: 'hsk1-l02-v10',
      hanzi: '没关系',
      pinyin: 'méi guānxi',
      english: 'that’s all right; never mind',
      keyWord: true,
    },
    { id: 'hsk1-l02-v11', hanzi: '没事', pinyin: 'méishì', english: 'it doesn’t matter', partOfSpeech: 'v.' },
    {
      id: 'hsk1-l02-v12',
      hanzi: '很',
      pinyin: 'hěn',
      english: 'very',
      partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l02-v12-e01', hanzi: '我很好。', pinyin: 'Wǒ hěn hǎo.', english: 'I am very well.' },
        { id: 'hsk1-l02-v12-e02', hanzi: '我们很高兴。', pinyin: 'Wǒmen hěn gāoxìng.', english: 'We are very happy.' },
      ],
    },
    {
      id: 'hsk1-l02-v13',
      hanzi: '高兴',
      pinyin: 'gāoxìng',
      english: 'glad; happy',
      partOfSpeech: 'adj.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l02-v13-e01', hanzi: '很高兴认识你。', pinyin: 'Hěn gāoxìng rènshi nǐ.', english: 'Nice to meet you.' },
        { id: 'hsk1-l02-v13-e02', hanzi: '你为什么不高兴？', pinyin: 'Nǐ wèishénme bù gāoxìng?', english: 'Why are you not happy?' },
      ],
    },
    {
      id: 'hsk1-l02-v14',
      hanzi: '认识',
      pinyin: 'rènshi',
      english: 'know; become acquainted with',
      partOfSpeech: 'v.',
      keyWord: true,
      examples: [
        { id: 'hsk1-l02-v14-e01', hanzi: '很高兴认识你！', pinyin: 'Hěn gāoxìng rènshi nǐ!', english: 'Nice to meet you!' },
        { id: 'hsk1-l02-v14-e02', hanzi: '你认识他吗？我不认识他。', pinyin: 'Nǐ rènshi tā ma? Wǒ bú rènshi tā.', english: 'A: Do you know him? B: I don’t know him.' },
      ],
    },
    {
      id: 'hsk1-l02-v15',
      hanzi: '也',
      pinyin: 'yě',
      english: 'also; too',
      partOfSpeech: 'adv.',
      examples: [
        { id: 'hsk1-l02-v15-e01', hanzi: '我也很高兴。', pinyin: 'Wǒ yě hěn gāoxìng.', english: 'I am also very happy.' },
        { id: 'hsk1-l02-v15-e02', hanzi: '你也认识她？', pinyin: 'Nǐ yě rènshi tā?', english: 'You also know her?' },
      ],
    },
  ],
  sentences: [
    { id: 'hsk1-l02-s01', hanzi: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: 'What is your name?' },
    { id: 'hsk1-l02-s02', hanzi: '我叫白家月。', pinyin: 'Wǒ jiào Bái Jiāyuè.', english: 'My name is Bai Jiayue.' },
    // Third read-aloud line of 小语讲堂 — same sentence as v06-e01, ID reused.
    { id: 'hsk1-l02-v06-e01', hanzi: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', english: 'I am a student.' },
  ],
  grammar: [
    {
      id: 'hsk1-l02-g01',
      title: { en: 'Basic Word Order in Chinese', zh: '汉语的基本语序' },
      focusHanzi: ['主语', '谓语', '宾语'],
      structure: '主语 + 谓语 + 宾语',
      explanation: {
        en: 'From 小语讲堂 (Xiaoyu’s Classroom): Chinese follows Subject + Predicate + Object. For example: 我 (Subject) 叫 (Predicate) 陈天中 (Object). Read the patterns aloud to feel the order.',
        zh: '小语讲堂：汉语的基本语序是主语+谓语+宾语。例如：我（主语）叫（谓语）陈天中（宾语）。大声朗读，体会语序。',
      },
      examples: [
        { id: 'hsk1-l02-s01', hanzi: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: 'What is your name?' },
        { id: 'hsk1-l02-s02', hanzi: '我叫白家月。', pinyin: 'Wǒ jiào Bái Jiāyuè.', english: 'My name is Bai Jiayue.' },
        { id: 'hsk1-l02-v06-e01', hanzi: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', english: 'I am a student.' },
      ],
    },
    {
      id: 'hsk1-l02-g02',
      title: { en: 'The structure of Chinese names', zh: '中文姓名构成' },
      focusHanzi: ['姓', '名'],
      structure: '姓 + 名',
      explanation: {
        en: 'Chinese names put the family name (姓) first, then the given name (名): 陈天中 = 陈 + 天中; 白家月 = 白 + 家月; 李文 = 李 + 文. (Derived from the lesson objective and the dialogues.)',
        zh: '中文姓名先姓后名：陈天中＝陈＋天中；白家月＝白＋家月；李文＝李＋文。（依据本课目标与对话归纳。）',
      },
      examples: [
        { id: 'hsk1-l02-d01-02', hanzi: '我叫陈天中。', pinyin: 'Wǒ jiào Chén Tiānzhōng.', english: 'My name is Chen Tianzhong.' },
        { id: 'hsk1-l02-d03-02', hanzi: '你好！我叫白家月。', pinyin: 'Nǐ hǎo! Wǒ jiào Bái Jiāyuè.', english: 'Hello! My name is Bai Jiayue.' },
      ],
    },
  ],
  conversations: [
    {
      id: 'hsk1-l02-d01',
      title: { en: 'Getting to know the students (Text 1)', zh: '认识学生' },
      context: {
        en: 'Wang Yifei was getting to know the students in the classroom.',
        zh: '在教室里，王一飞在认识学生。',
      },
      speakers: [
        { id: 'A', name: '王一飞 Wáng Yīfēi', voice: 'female' },
        { id: 'B', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
      ],
      lines: [
        { id: 'hsk1-l02-d01-01', speakerId: 'A', hanzi: '请问，你叫什么名字？', pinyin: 'Qǐngwèn, nǐ jiào shénme míngzi?', english: 'Excuse me, what is your name?' },
        { id: 'hsk1-l02-d01-02', speakerId: 'B', hanzi: '我叫陈天中。', pinyin: 'Wǒ jiào Chén Tiānzhōng.', english: 'My name is Chen Tianzhong.' },
      ],
    },
    {
      id: 'hsk1-l02-d02',
      title: { en: 'Mistaken identity (Text 2)', zh: '认错了人' },
      context: {
        en: 'On campus, Chen Tianzhong greeted Bai Jiayue but mistook her for someone else.',
        zh: '在校园里，陈天中和白家月打招呼时认错了人。',
      },
      speakers: [
        { id: 'A', name: '陈天中 Chén Tiānzhōng', voice: 'male' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l02-d02-01', speakerId: 'A', hanzi: '你好，安妮！', pinyin: 'Nǐ hǎo, Ānnī!', english: 'Hello, Annie!' },
        { id: 'hsk1-l02-d02-02', speakerId: 'B', hanzi: '你好，陈天中！我不是安妮，我是白家月。', pinyin: 'Nǐ hǎo, Chén Tiānzhōng! Wǒ bú shì Ānnī, wǒ shì Bái Jiāyuè.', english: 'Hello, Chen Tianzhong! I’m not Annie — I’m Bai Jiayue.' },
        { id: 'hsk1-l02-d02-03', speakerId: 'A', hanzi: '对不起！', pinyin: 'Duìbuqǐ!', english: 'Sorry!' },
        { id: 'hsk1-l02-d02-04', speakerId: 'B', hanzi: '没关系！', pinyin: 'Méi guānxi!', english: 'That’s all right; never mind.' },
      ],
    },
    {
      id: 'hsk1-l02-d03',
      title: { en: 'Meeting for the first time (Text 3)', zh: '第一次相遇' },
      context: {
        en: 'Li Wen and Bai Jiayue met for the first time on campus.',
        zh: '在校园里，李文和白家月第一次相遇。',
      },
      speakers: [
        { id: 'A', name: '李文 Lǐ Wén', voice: 'male2' },
        { id: 'B', name: '白家月 Bái Jiāyuè', voice: 'female2' },
      ],
      lines: [
        { id: 'hsk1-l02-d03-01', speakerId: 'A', hanzi: '你好！我叫李文。', pinyin: 'Nǐ hǎo! Wǒ jiào Lǐ Wén.', english: 'Hello! My name is Li Wen.' },
        { id: 'hsk1-l02-d03-02', speakerId: 'B', hanzi: '你好！我叫白家月。', pinyin: 'Nǐ hǎo! Wǒ jiào Bái Jiāyuè.', english: 'Hello! My name is Bai Jiayue.' },
        { id: 'hsk1-l02-d03-03', speakerId: 'A', hanzi: '很高兴认识你。', pinyin: 'Hěn gāoxìng rènshi nǐ.', english: 'Nice to meet you.' },
        { id: 'hsk1-l02-d03-04', speakerId: 'B', hanzi: '认识你我也很高兴。', pinyin: 'Rènshi nǐ wǒ yě hěn gāoxìng.', english: 'Nice to meet you too.' },
      ],
    },
    {
      id: 'hsk1-l02-d04',
      title: { en: 'Tongue twister (2-7)', zh: '绕口令' },
      context: { en: 'Shadow the tongue twister.', zh: '跟读绕口令。' },
      speakers: [{ id: 'A', name: '小语 Xiǎoyǔ', voice: 'female2' }],
      lines: [
        { id: 'hsk1-l02-d04-01', speakerId: 'A', hanzi: '七加一，再减一，加完减完等于几？', pinyin: 'Qī jiā yī, zài jiǎn yī, jiāwán jiǎnwán děngyú jǐ?', english: 'Seven plus one, minus one again. Add it up. Take it down. What’s the gain?' },
        { id: 'hsk1-l02-d04-02', speakerId: 'A', hanzi: '加完减完还是七。', pinyin: 'Jiāwán jiǎnwán hái shì qī.', english: 'Add it up. Take it down. Still just seven!' },
      ],
    },
  ],
};

export default lesson02;
