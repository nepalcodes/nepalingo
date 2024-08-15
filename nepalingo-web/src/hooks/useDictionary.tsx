import useSWR from "swr";
import { getNewariWord } from "@/lib/getNewariWord";
import { getTajpuriyaWord } from "@/lib/getTajpuriyaWord";
import { getGTranslate } from "@/lib/getGTranslate";

export type DictionaryProps = {
  language: string;
  word: string;
};

export type Meaning = {
  audio?: { uri: string };
  image?: { uri: string };
  language: string;
  meaningOriginal?: string;
  meaningNp?: string;
  meaningEn: string;
  partsOfSpeech?: string;
  dialect?: string;
  transliterations?: {
    deva: string;
    latn: string;
    original: string;
  };
};

export type DictionaryResponse = {
  language: string;
  word: string;
  meanings: Array<Meaning>;
};

async function getFetcherByLanguage(
  language: string,
  word?: string,
): Promise<DictionaryResponse> {
  if (!word) {
    word = "hello";
  }

  switch (language) {
    case "Newari":
      return await getNewariWord(word);
    case "Tajpuriya":
      return await getTajpuriyaWord(word);
    case "Maithili":
      return await getGTranslate("maithili", word);
    case "Sanskrit":
      return await getGTranslate("sanskrit", word);
    case "Nepali":
      return await getGTranslate("nepali", word);

    default:
      throw new Error(`Language ${language} not supported`);
  }
}

const useDictionary = ({ language, word }: DictionaryProps) => {
  const cacheKey = word ? `/${language}/${word}` : null;
  const { data, error, isLoading } = useSWR(cacheKey, () =>
    getFetcherByLanguage(language, word),
  );
  return { data, error, isLoading };
};

export default useDictionary;
