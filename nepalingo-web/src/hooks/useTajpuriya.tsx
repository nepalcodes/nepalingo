import { useState, useEffect } from "react";
import { DictionaryProps } from "@/hooks/useDictionary";

const useTajpuriya = (props: Omit<DictionaryProps, "language">) => {
  const word = props.word;
  const [translatedText, setTranslatedText] = useState("");
  const [dictionaryText, setDictionaryText] = useState("");
  useEffect(() => {
    const sourceFile = "./dictionaries/TajpuriyaDictionary.csv";

    fetch(sourceFile)
      .then((r) => r.text())
      .then((text) => {
        setDictionaryText(text);
      })
      .catch((error) => {
        console.error("Error fetching words:", error);
      });
  }, []);

  useEffect(() => {
    if (dictionaryText) {
      const loadDict = () => {
        const dictArray = dictionaryText.split("\n");
        dictArray.forEach((line) => {
          const [englishWord, tajpuriyaWord] = line.split(",");

          if (englishWord == word) {
            setTranslatedText(tajpuriyaWord);
          }
        });
      };
      loadDict();
    }
  }, [dictionaryText, word]);
  return translatedText;
};
export default useTajpuriya;
