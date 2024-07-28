import { DictionaryResponse } from "@/hooks/useDictionary";

export async function getTajpuriyaWord(
  word: string,
): Promise<DictionaryResponse> {
  const wordText = await fetch("./dictionaries/TajpuriyaDictionary.csv")
    .then((r) => r.text())
    .catch((error) => {
      console.error("Error fetching words:", error);
    });

  if (!wordText) {
    throw new Error("Error fetching tajpuriya CSV");
  }
  const dictArray = wordText.split("\n");

  for (const line of dictArray) {
    const [englishWord, tajpuriyaWord] = line
      .split(",")
      .map((word) => word.trim().replace(/(^"|"$)/g, ""));

    console.log("englishWord", englishWord);
    console.log("word", word);
    console.log(englishWord == word);
    if (englishWord == word) {
      console.log("pls");
      return {
        language: "tajpuriya",
        word: word,
        meanings: [
          {
            language: "tajpuriya",
            meaningOriginal: tajpuriyaWord,
            meaningEn: englishWord,
          },
        ],
      };
    }
  }
  throw new Error(`Word "${word}" not found in tajpuriya dictionary`);
}
