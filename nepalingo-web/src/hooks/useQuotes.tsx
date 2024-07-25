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

        setQuotes(quotesArray);
        setRandomQuote(randomQuote);
      };

      loadQuotes();
    }
  }, [quotesText]);

  return { quotes, randomQuote };
};

export default useQuotes;
