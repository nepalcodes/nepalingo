import useSWR from 'swr';
import { DictionaryProps, DictionaryResponse } from './useDictionary';
import { parse } from 'papaparse';
import fs from 'fs';



const fetcher = (url: string) => {
  const csvData = fs.readFileSync('Tajpuriya grammer - Sheet1.csv', 'utf8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  const wordData = records.find((record) => record.word === url.split('/')[3]);

  if (!wordData) {
    return { meanings: [] };
  }

  return {
    meanings: [
      {
      
        meaningOriginal: wordData.meaning_nb,
        meaningEn: wordData.meaning_en,
      },
    ],
  };
};

const getTajpuria = (props: Omit<DictionaryProps, 'language'>) => {
  let { data, error, isLoading } = useSWR(`/dict/tajpuriya/search/${props.word}`, fetcher);

  let response: DictionaryResponse = {
    language: 'tajpuriya',
    word: props.word,
    meanings: data?.meanings || [],
  };

  return { response, error, isLoading };
};

export default getTajpuria;