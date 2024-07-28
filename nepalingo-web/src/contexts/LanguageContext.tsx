
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'newari' | 'tajpuria' | 'maithili';

interface LanguageContextProps {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('newari');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextProps => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};