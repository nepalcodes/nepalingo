import React from "react";
import { useLanguage } from "../hooks/Langauge";
import useQuotes from "../hooks/useQuotes";

const RandomQuoteComponent: React.FC = () => {
  const { selectedLanguage } = useLanguage();

  if (!selectedLanguage) {
    return <div>Please select a language.</div>;
  }

  const { randomQuote } = useQuotes({
    language: selectedLanguage,
  });

  if (!randomQuote) {
    return <div>Loading...</div>;
  }

  const { text, translation } = randomQuote;

  return (
    <div>
      <p style={styles.quote}>{text}</p>
      <p style={styles.translation}>
        <em>{translation}</em>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  quote: {
    fontSize: "18px",
    fontStyle: "normal",
    marginBottom: "10px",
  },
  translation: {
    fontSize: "16px",
    color: "#555",
  },
};

export default RandomQuoteComponent;
