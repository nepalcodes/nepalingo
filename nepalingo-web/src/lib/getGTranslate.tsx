const GOOGLE_TRANSLATE_API_KEY = "AIzaSyCi239eredIAEEJkI8xzvGwW1GPS7B1vxQ";
let language: string;

export const getGTranslate = async (
  targetLanguage: string,
  word: string
): Promise<{
  language: string;
  word: string;
  meanings: {
    language: string;
    meaningOriginal: string;
    meaningEn: string;
  }[];
}> => {
  const url = `https://translation.googleapis.com/targetLanguage/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${word}&target=${targetLanguage}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  if (targetLanguage === "new") {
    language = "newari";
  }
  if (targetLanguage === "mai") {
    language = "maithili";
  }

  //return data.data.translations[0].translatedText;
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
