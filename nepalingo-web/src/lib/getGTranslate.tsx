const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

const languageCodes: { [key: string]: string } = {
  maithili: "mai",
  sanskrit: "sa",
  nepali: "ne",

};

export const getGTranslate = async (
  language: string,
  word: string,
): Promise<{
  language: string;
  word: string;
  meanings: Array<{
    language: string;
    meaningOriginal: string;
    meaningEn: string;
  }>;
}> => {
  const targetLanguage = languageCodes[language];
  if (!targetLanguage) {
    throw new Error(`Language code for ${language} not found`);
  }

  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${word}&target=${targetLanguage}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return {
    language,
    word,
    meanings: [
      {
        language,
        meaningOriginal: data.data.translations[0].translatedText,
        meaningEn: word,
      },
    ],
  };
};
