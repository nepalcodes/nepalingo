const GOOGLE_TRANSLATE_API_KEY = "AIzaSyCi239eredIAEEJkI8xzvGwW1GPS7B1vxQ";

export const getGTranslate = async (
  targetLanguage: string,
  text: string
): Promise<string> => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${text}&target=${targetLanguage}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data.data.translations[0].translatedText;
};
