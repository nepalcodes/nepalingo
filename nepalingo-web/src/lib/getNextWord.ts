export const newariWords = [
  "hello",
  "call",
  "can",
  "do",
  "how",
  "I",
  "my",
  "what",
  "where",
  "a",
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

export async function getNextWord(language: string) {
  let words: string[] = [];
  if (language === "Newari") {
    words = newariWords;
  } else if (language === "Tajpuriya") {
    words = await getTajpuriyaWords();
  }

  if (words.length === 0) {
    throw new Error("No words found for the selected language.");
  }

  return wordGenerator(words);
}
