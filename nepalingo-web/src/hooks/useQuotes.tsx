import { useState, useEffect } from "react";

interface Quote {
  text: string;
  translation: string;
}
export interface QuotesResponse {
  quotes: Quote[];
  randomQuote: Quote | null;
}

interface useQuotesProps {
  language: string;
}

const useQuotes = ({ language }: useQuotesProps): QuotesResponse => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesText, setQuotesText] = useState("");
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  useEffect(() => {
    let sourceFile = "";

    switch (language) {
      case "Newari":
        sourceFile = "/quotes/newari.csv";
        break;
      case "Tajpuria":
        sourceFile = "/quotes/tajpuriya.csv";
        break;
      case "Maithili":
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
          const [quote, englishTranslation] = line.split(",");
          return {
            text: quote ? quote.trim().replace(/(^"|"$)/g, "") : "",
            translation: englishTranslation
              ? englishTranslation.trim().replace(/(^"|"$)/g, "")
              : "",
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
