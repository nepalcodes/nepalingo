import useSWR from "swr";
import useNewari from "@/hooks/useNewari";

import { Language } from "./Langauge";
import { getNewariWord } from "@/lib/getNewariWord";

export type DictionaryProps = {
  language: string;
  // If word is not specified, a word will be chosen
  word?: string;
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

async function getFetcherByLanguage(language: string, word?: string) {
  if (!word) {
    word = "salt";
  }

  switch (language) {
    case "Newari":
      return await getNewariWord(word);
    // case "Tajpuriya":
    //   return await getTajpuriyaWord(word)
    default:
      return {
        error: { message: "Sorry the language does not exist" },
        data: undefined,
        isLoading: false,
      };
  }
}

///Use case
//const {data, isLoading, error} = useDictionary('newari', "Hello")

const useDictionary = ({ language, word }: DictionaryProps) => {
  const { data, error, isLoading } = useSWR(
    word ? `/dict/en/search/${word}` : null,
    () => getFetcherByLanguage(language, word),
  );
  return { data, error, isLoading };
};

export default useDictionary;
