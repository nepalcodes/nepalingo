export const newariWords = [
  "hello",
  "call",
  "do",
  "how",
  "I",
  "my",
  "what",
  "where",
  "do",
  "not",
  "for",
  "from",
  "fun",
  "have",
  "help",
  "language",
  "me",
  "name",
  "need",
  "please",
  "police",
  "sick",
  "speak",
  "understand",
  "well",
  "you",
  "your",
  "salt",
];

// A bunch of sentences with words that make up those sentences
// The words "a" and "am" are removed because theya ren't really
// used in Nepali languages and the direct translation doesn't make sense'
export const wordSentences: Record<string, Array<string>> = {
  "First Words": ["hello", "goodbye", "yes", "no", "please", "sorry", "thanks"],
  "Making Introductions": [
    "my",
    "name",
    "is",
    "Bhasa",
    "My name is Bhasa.",

    "what",
    "is",
    "your",
    "name",
    "What is your name?",

    "how",
    "are",
    "you",
    "How are you?",

    "I",
    "well",
    "I am well.",
  ],
  Learning: [
    "I",
    "learning",
    "your",
    "language.",
    "I am learning your language.",

    "I",
    "do",
    "not",
    "speak",
    "your",
    "language",
    "well",
    "I don’t speak your language well.",

    "can",
    "you",
    "please",
    "repeat",
    "that",
    "Can you please repeat that?",

    "can",
    "you",
    "speak",
    "slower",
    "Can you speak slower?",

    "I",
    "do",
    "not",
    "understand.",
    "I don’t understand.",

    "Do",
    "you",
    "speak",
    "Do you speak English?",
  ],
  "Knowing Someone": [
    "where",
    "are",
    "you",
    "from",
    "Where are you from?",

    "I",
    "from",
    "Nepal",
    "I am from Nepal.",

    "what",
    "do",
    "you",
    "do",
    "for",
    "living",
    "What do you do for a living?",

    "what",
    "do",
    "you",
    "do",
    "for",
    "fun",
    "What do you do for fun?",

    "do",
    "you",
    "have",
    "pets",
    "Do you have pets?",

    "do",
    "you",
    "have",
    "hobbies",
    "Do you have hobbies?",
  ],
  Shopping: [
    "how",
    "much",
    "does",
    "this",
    "cost",
    "How much does this cost?",

    "I",
    "would",
    "like",
    "tea",
    "I would like tea.",

    "what",
    "is",
    "this",
    "What is this?",

    "can",
    "I",
    "see",
    "that",
    "Can I see that?",

    "do",
    "you",
    "have",
    "fish",
    "Do you have fish?",

    "where",
    "can",
    "I",
    "find",
    "hotel",
    "Where can I find a hotel?",

    "I",
    "allergic",
    "to",
    "penuts",
    "I’m allergic to penuts.",

    "is",
    "this",
    "chicken",
    "Is this chicken?",

    "I",
    "vegetarian",
    "I am a vegetarian.",

    "I",
    "can",
    "not",
    "eat",
    "beef",
    "I can’t eat beef.",

    "menu,",
    "please",
    "Menu, please.",

    "table",
    "for",
    "one",
    "please",
    "Table for one, please.",

    "check,",
    "please",
    "Check, please.",

    "can",
    "I",
    "pay",
    "by",
    "credit",
    "card",
    "or",
    "cash",
    "Can I pay by credit card or cash?",
  ],
  Emergency: [
    "I",
    "need",
    "help",
    "I need help.",

    "call",
    "an",
    "ambulance",
    "Call an ambulance.",

    "excuse",
    "me",
    "Excuse me.",

    "I",
    "injured",
    "I am injured.",

    "where",
    "is",
    "the",
    "toilet",
    "Where is the toilet?",

    "I need help.",
    "Call an ambulance.",
    "Excuse me.",
    "I am injured.",
    "Where is the toilet?",
  ],
  Traveling: [
    "where",
    "is",
    "the",
    "taxi",
    "stand",
    "Where is the taxi stand?",

    "where",
    "can",
    "I",
    "get",
    "the",
    "bus",
    "to",
    "Where can I get the bus to Kathmandu?",

    "what",
    "time",
    "does",
    "the",
    "plane",
    "leave",
    "What time does the plane leave?",

    "how",
    "much",
    "for",
    "ticket",
    "to",
    "How much for a ticket to Kathmandu?",

    "where",
    "can",
    "I",
    "find",
    "taxi",
    "Where can I find a taxi?",

    "what",
    "time",
    "does",
    "it",
    "open",
    "What time does it open?",

    // NOTE we skip some words here because it's almost the same as the above'
    "close",
    "What time does it close?",

    "how",
    "do",
    "I",
    "get",
    "to",
    "the",
    "shop",
    "How do I get to the shop?",

    "can",
    "you",
    "show",
    "me",
    "on",
    "map",
    "Can you show me on a map?",

    "what",
    "is",
    "the",
    "best",
    "restaurant",
    "What is the best restaurant?",

    "what",
    "is",
    "fun",
    "to",
    "do",
    "around",
    "here",
    "What is fun to do around here?",

    "what",
    "do",
    "you",
    "recommend",
    "What do you recommend?",

    "what",
    "are",
    "some",
    "local",
    "specialties",
    "What are some local specialties?",

    "what",
    "is",
    "the",
    "entrance",
    "fee",
    "What is the entrance fee?",

    "do",
    "you",
    "have",
    "rooms",
    "available",
    "Do you have rooms available?",

    "I",
    "have",
    "reservation",
    "I have a reservation.",

    "I’ll",
    "be",
    "staying",
    "for",
    "two",
    "nights",
    "I’ll be staying for two nights.",
  ],
};

export async function getTajpuriyaWords(): Promise<string[]> {
  const wordText = await fetch("./dictionaries/TajpuriyaDictionary.csv")
    .then((r) => r.text())
    .catch((error) => {
      console.error("Error fetching words:", error);
    });

  if (wordText) {
    return wordText.split("\n").map((line: string) =>
      line
        .split(",")[0]
        .trim()
        .replace(/(^"|"$)/g, ""),
    );
  }
  return [];
}

export function* wordGenerator(words: string[]) {
  let index = 0;
  while (true) {
    yield words[index];
    index = (index + 1) % words.length;
  }
}

export function getChapters(language: string): Array<string> {
  if (language === "Newari" || language === "Tajpuriya") {
    return ["First Words"];
  } else if (
    language === "Maithili" ||
    language === "Sanskrit" ||
    language === "Nepali"
  ) {
    // TODO: Change to type, and somehow iterate through the types
    return [
      "First Words",
      "Making Introductions",
      "Learning",
      "Knowing Someone",
      "Shopping",
      "Emergency",
      "Traveling",
    ];
  }
  throw Error(`Chapter not defined for ${language}`);
}

export async function getAllWords(language: string, chapter?: string) {
  if (!chapter) {
    chapter = "First Words";
  }
  let allWords: string[] = [];
  if (language === "Newari") {
    allWords = newariWords;
  } else if (
    language === "Maithili" ||
    language === "Sanskrit" ||
    language === "Nepali"
  ) {
    // Because these languages use google translate API as the backend
    // we can have more complex questions
    allWords = wordSentences[chapter] || [];
  } else if (language === "Tajpuriya") {
    allWords = await getTajpuriyaWords();
  }

  if (allWords.length === 0) {
    throw new Error("No words found for the selected language.");
  }
  return allWords;
}

export async function getNextWord(language: string, chapter?: string) {
  const allWords = await getAllWords(language, chapter);
  return wordGenerator(allWords);
}
