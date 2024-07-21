import useNewari from "@/hooks/useNewari";

import { Language } from "./Langauge";

export type DictionaryProps = {
  language: Language;
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

///Use case
//const {data, isLoading, error} = useDictionary('newari', "Hello")

const useDictionary = ({ language, ...otherProps }: DictionaryProps) => {
  switch (language) {
    case "newari":
      return useNewari(otherProps);
    // case 'tajpuriya':
    //     return ({
    //         error: { message: "Sorry the language does not exist" },
    //         data: null,
    //         isLoading: false,
    //     })
    default:
      return {
        error: { message: "Sorry the language does not exist" },
        data: undefined,
        isLoading: false,
      };
  }
};

export default useDictionary;
