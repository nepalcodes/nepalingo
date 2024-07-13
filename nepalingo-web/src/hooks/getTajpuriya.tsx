import { useState, useEffect } from "react";
 
const Languages = [ "tajpuriya"] as const;
 
export type dictProps = {
  language: (typeof Languages)[number];
};
 
export type dictResponse = {
  language: string;
  word: {
    text: string;
    translation: string;
  };
};
 
const useDict = ({ language }: dictProps) => {
  const [word, setWord] = useState<dictResponse | null>(null);
  const  [wordText, setwordText] = useState("");
 
  useEffect(() => {
    const sourceFile = "./Tajpuriya grammer - Sheet1.csv";
 
   
    
 
    if (sourceFile) {
      fetch(sourceFile)
        .then((r) => r.text())
        .then((text) => {
          setwordText(text);
        })
        .catch((error) => {
          console.error("Error fetching quotes:", error);
        });
    }
  }, [language]);
 
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
 
        setWord({ language, quote: randomWord });
      };
 
      loadDict();
    }
  }, [wordText]);
 
  return word;
};
 
export default useDict;
 