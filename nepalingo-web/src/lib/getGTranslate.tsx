import { supabaseClient } from "@/config/supabase-client";

const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

const languageCodes: { [key: string]: string } = {
  maithili: "mai",
};

export const getGTranslate = async (
  language: string,
  word: string
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

  // Check if the translation is already cached in Supabase
  const { data: cachedResult, error } = await supabaseClient
    .from("translations_cache")
    .select("translated_word")
    .eq("language", language)
    .eq("word", word)
    .single();

  if (error) {
    console.error("Error fetching from cache:", error);
  } else if (cachedResult) {
    const translatedWord = cachedResult.translated_word;
    console.log("used table");
    return {
      language,
      word,
      meanings: [
        {
          language,
          meaningOriginal: translatedWord,
          meaningEn: word,
        },
      ],
    };
  }

  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${word}&target=${targetLanguage}`;
  console.log("used api");
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  const translatedWord = data.data.translations[0].translatedText;

  // Store the result in the Supabase cache
  const { error: insertError } = await supabaseClient
    .from("translations_cache")
    .insert([{ language, word, translated_word: translatedWord }]);

  if (insertError) {
    console.error("Error inserting into cache:", insertError);
  }

  return {
    language,
    word,
    meanings: [
      {
        language,
        meaningOriginal: translatedWord,
        meaningEn: word,
      },
    ],
  };
};
