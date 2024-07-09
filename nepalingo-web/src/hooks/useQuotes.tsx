import { useState, useEffect } from "react";
import tajpuriya from "../quotes/tajpuriya.txt";
import newari from "../quotes/newari.txt";
import maithili from "../quotes/maithili.txt";

const Languages = ["newari", "tajpuriya", "maithili"] as const;

export type QuoteProps = {
  language: (typeof Languages)[number];
};

export type QuoteResponse = {
  language: string;
  quote: {
    text: string;
    translation: string;
  };
};

const useQuotes = ({ language }: QuoteProps) => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [quotesText, setQuotesText] = useState("");

  useEffect(() => {
    let sourceFile = "";

    switch (language) {
      case "newari":
        sourceFile = newari;
        break;
      case "tajpuriya":
        sourceFile = tajpuriya;
        break;
      case "maithili":
        sourceFile = maithili;
        break;
      default:
        sourceFile = "";
    }

    if (sourceFile) {
      fetch(sourceFile)
        .then((r) => r.text())
        .then((text) => {
          setQuotesText(text);
        })
        .catch((error) => {
          console.error("Error fetching quotes:", error);
        });
    }

    if (quotesText) {
      const loadQuotes = () => {
        const quotesArray = quotesText.split("\r\n\r\n").map((line: string) => {
          const [text, translation] = line.split("||");
          return {
            text: text ? text.trim() : "",
            translation: translation ? translation.trim() : "",
          };
        });

        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const randomQuote = quotesArray[randomIndex];

        setQuote({ language, quote: randomQuote });
      };

      loadQuotes();
    }
  }, [quotesText]);

  return quote;
};

export default useQuotes;
