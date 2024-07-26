import { useState, useEffect } from "react";

interface Quote {
  text: string;
  translation: {
    newari: string;
    maithili: string;
    tajpuria: string;
  };


}
export interface QuotesResponse {
  quotes: Quote[];
  randomQuote: Quote | null;
}

interface useQuotesProps {
  language: 'newari' | 'tajpuria' | 'maithili';
}

const useQuotes = ({ language }: useQuotesProps): QuotesResponse => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesText, setQuotesText] = useState("");
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  useEffect(() => {
    let sourceFile = "";

    switch (language) {
      case "newari":
        sourceFile = "/quotes/newari.csv";
        break;
      case "tajpuria":
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
          const [text, newari, tajpuria, maithili] = line.split(",");
          return {
            text: text ? text.trim().replace(/(^"|"$)/g, "") : "",
            translation: {
              newari: newari ? newari.trim().replace(/(^"|"$)/g, "") : "",
              maithili: maithili ? maithili.trim().replace(/(^"|"$)/g, "") : "",
              tajpuria: tajpuria ? tajpuria.trim().replace(/(^"|"$)/g, "") : "",
            }
          };
        });

        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const randomQuote = quotesArray[randomIndex];

        setQuotes(quotesArray);
        setRandomQuote(randomQuote);
      };

      loadQuotes();
    }
  }, [quotesText]);

  return { quotes, randomQuote };
};

export default useQuotes;
