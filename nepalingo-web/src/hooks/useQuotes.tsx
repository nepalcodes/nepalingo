import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/Langauge";

interface Quote {
  text: string;

  translation: string;
}
export interface QuotesResponse {
  quotes: Quote[];
  randomQuote: Quote | null;
}

const useQuotes = (): QuotesResponse => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const { selectedLanguage } = useLanguage();

  function parse(row: string) {
    let insideQuote = false,
      entry: Array<string> = [];
    const entries = [];
    row.split("").forEach(function (character) {
      if (character === '"') {
        insideQuote = !insideQuote;
      } else {
        if (character == "," && !insideQuote) {
          entries.push(entry.join(""));
          entry = [];
        } else {
          entry.push(character);
        }
      }
    });
    entries.push(entry.join(""));
    return entries;
  }
  const loadQuotes = (quotesText: string) => {
    const quotesArray = quotesText.split(/\r\n|\n/).map((line: string) => {
      const [quote, englishTranslation] = parse(line);
      return {
        text: quote ? quote.trim().replace(/(^"|"$)/g, "") : "",
        translation: englishTranslation
          ? englishTranslation.trim().replace(/(^"|"$)/g, "")
          : "",
      };
    });

    // We do quotesArray.length - 1 because the last element of the array is always empty
    // due to the way the csv is being parsed above.
    const randomIndex = Math.floor(Math.random() * (quotesArray.length - 1));
    const randomQuote = quotesArray[randomIndex];

    setQuotes(quotesArray);
    setRandomQuote(randomQuote);
  };

  useEffect(() => {
    let sourceFile = "";
    switch (selectedLanguage) {
      case "Newari":
        sourceFile = "/quotes/newari.csv";
        break;
      case "Tajpuriya":
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
          loadQuotes(text);
        })
        .catch((error) => {
          console.error("Error fetching quotes:", error);
        });
    }
  }, [selectedLanguage]);

  return { quotes, randomQuote };
};

export default useQuotes;
