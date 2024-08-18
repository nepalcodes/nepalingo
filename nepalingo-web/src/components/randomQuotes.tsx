<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import useQuotes from '../hooks/useQuotes'

const RandomQuote = () => {
    const { quotes } = useQuotes(); // Assuming useQuotes returns an object with a quotes array
    const { language } = useLanguage(); // Assuming useLanguage returns an object with the current language
    const [randomQuote, setRandomQuote] = useState(null);

    useEffect(() => {
        if (quotes && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setRandomQuote(quotes[randomIndex]);
        }
    }, [quotes]);

    if (!randomQuote) {
        return <div>Loading...</div>;
    }

    const { text, translations } = randomQuote;
    const translatedText = translations[language] || text;

    return (
        <div style={styles.container}>
            <div style={styles.quote}>{text}</div>
            <div style={styles.translation}>{translatedText}</div>
        </div>
    );
};

// Example styles - adjust according to your Figma design
const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    },
    quote: {
        fontSize: '18px',
        fontStyle: 'italic',
        marginBottom: '10px',
    },
    translation: {
        fontSize: '16px',
        color: '#555',
    },
};

export default RandomQuote;


=======
import React from "react";
import useQuotes from "@/hooks/useQuotes";

const RandomQuoteComponent: React.FC = () => {
  const { randomQuote } = useQuotes();

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
>>>>>>> 1e8f4d1f4bd1c494646432964c99a01746c2ae0a
