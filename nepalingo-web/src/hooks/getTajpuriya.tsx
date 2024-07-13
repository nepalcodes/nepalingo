import useSWR from 'swr';
import { DictionaryProps, DictionaryResponse } from './useDictionary';
import { parse } from 'papaparse';
import fs from 'fs';
interface WordRecord{
  word: string;
  translation: string;
}
const fetcher = (url: string) => {
  const csvfilepath = fs.readFile('Tajpuriya grammer - Sheet1.csv','utf8');
  const records = parse(csvfilepath, {
    columns: true,
    skip_empty_lines: true,
  });

  const wordData = records.find((record: WordRecord) => record.word === url.split('/')[3]);

  if (!wordData) {
    return { meanings: [] };
  }

  return {
    meanings: [
      {
      
        meaningOriginal: wordData.meaning_tajpuriya,
        meaningEn: wordData.meaning_en,
      },
    ],
  };
};

const getTajpuria = (props: Omit<DictionaryProps, 'language'>) => {
  const { data, error, isLoading } = useSWR(`/dict/tajpuriya/search/${props.word}`, fetcher);

  const response: DictionaryResponse = {
    language: 'tajpuriya',
    word: props.word,
    meanings: data?.meanings || [],
  };

  return { response, error, isLoading };
};

export default getTajpuria;