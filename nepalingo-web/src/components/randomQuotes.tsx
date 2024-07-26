import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import useQuotes from '../hooks/useQuotes';

const RandomQuoteComponent: React.FC = () => {
    const { language } = useLanguage();
    const { randomQuote } = useQuotes({ language });

    if (!randomQuote) {
        return <div>Loading...</div>;
    }
    const { text, } = randomQuote;
    const translatedText = [language];

    return (
        <div>
            <p style={styles.quote}>{text}</p>
            <p style={styles.translation}><em>{translatedText}</em></p>
        </div>
    );
};

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

export default RandomQuoteComponent;
