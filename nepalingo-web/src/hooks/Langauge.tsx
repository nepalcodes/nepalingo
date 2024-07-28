import React from "react";
import { useContext, useState, useEffect, createContext } from "react";

type ValueOf<T> = T[keyof T];
export type Language = ValueOf<typeof Languages>;

export type LanguageKey = keyof typeof Languages;

export const Languages = {
  Newari: "newari",
  Tajpuriya: "tajpuriya",
  Maithili: "coming soon",
} as const;

type LanguageContextProps = {
  selectedLanguage: string;
  switchLanguage: (value: LanguageKey) => void;
};
const LanguageContext = createContext<LanguageContextProps>({
  selectedLanguage: "",
  switchLanguage: (value) => console.log(value),
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<LanguageKey>("Newari");

  const switchLanguage = (value: LanguageKey) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  useEffect(() => {
    localStorage.getItem("language") &&
      setLanguage(localStorage.getItem("language") as LanguageKey);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage: language,
        switchLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
