import { useState, useEffect } from "react";

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
        sourceFile = "/quotes/newari.csv";
        break;
      case "tajpuriya":
        sourceFile = "/quotes/tajpuriya.csv";
        break;
      case "maithili":
        sourceFile = "/quotes/maithili.csv";
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
  }, [language]);

  useEffect(() => {
    if (quotesText) {
      const loadQuotes = () => {
        const quotesArray = quotesText.split("\n").map((line: string) => {
          const [text, translation] = line.split(",");
          return {
            text: text ? text.trim().replace(/(^"|"$)/g, "") : "",
            translation: translation
              ? translation.trim().replace(/(^"|"$)/g, "")
              : "",
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
