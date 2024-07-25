import { useState, useEffect } from "react";

const language = "tajpuriya" as const;

export type dictResponse = {
  language: string;
  word: {
    text: string;
    translation: string;
  };
};

const getTajpuriya = (trigger: number) => {
  const [word, setWord] = useState<dictResponse | null>(null);
  const [wordText, setWordText] = useState("");

  useEffect(() => {
    const sourceFile = "./dictionaries/TajpuriyaDictionary.csv";

    fetch(sourceFile)
      .then((r) => r.text())
      .then((text) => {
        setWordText(text);
      })
      .catch((error) => {
        console.error("Error fetching words:", error);
      });
  }, []);

  useEffect(() => {
    if (wordText) {
      const loadDict = () => {
        const dictArray = wordText.split("\n").map((line: string) => {
          const [text, translation] = line.split(",");
          return {
            text: text ? text.trim().replace(/(^"|"$)/g, "") : "",
            translation: translation
              ? translation.trim().replace(/(^"|"$)/g, "")
              : "",
          };
        });

        const randomIndex = Math.floor(Math.random() * dictArray.length);
        const randomWord = dictArray[randomIndex];

        setWord({ language, word: randomWord });
      };

      loadDict();
    }
  }, [wordText, trigger]);

  return word;
};

export default getTajpuriya;
