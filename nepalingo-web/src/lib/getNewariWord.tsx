import { DictionaryResponse } from "@/hooks/useDictionary";

export async function getNewariWord(word: string): Promise<DictionaryResponse> {
  const api_endpoint = `/dict/en/search/${word}`;
  const data = await fetch(
    import.meta.env.VITE_NEPALBHASA_API_URL + api_endpoint,
    {},
  ).then((r) => r.json());
  // errors
  // const customError = data?.errors.length
  //   ? { status: true, response: data.errors, message: data.errors[0] }
  //   : error;

  const response: DictionaryResponse = {
    language: "newari",
    word: word,
    //Mapping the meanings from the api to create a custom response based on DictionaryResponse
    meanings:
      data?.meanings.length == 0
        ? []
        : data?.meanings?.map(
            (meaning: {
              audio?: { file: string; directory: string };
              image?: { file: string; directory: string };
              meaning_np?: string;
              meaning_nb?: string;
              meaning_en?: string;
              pos?: string;
              dialect?: string;
              transliterations?: {
                deva: string;
                latn: string;
                newa: string;
              };
            }) => ({
              audio: meaning?.audio && {
                uri: `${import.meta.env.VITE_NEPALBHASA_API_URL}/dict/${meaning.audio.directory}/${meaning.audio.file}`,
              },
              image: meaning?.image && {
                uri: `${import.meta.env.VITE_NEPALBHASA_API_URL}/dict/${meaning.image.directory}/w800h800b1sh1/${meaning.image.file}`,
              },
              meaningOriginal: meaning?.meaning_nb,
              meaningNp: meaning?.meaning_np,
              meaningEn: meaning?.meaning_en,
              dialect: meaning.dialect,
              partsOfSpeech: meaning.pos,
              transliterations: {
                latn: meaning.transliterations?.latn,
                deva: meaning.transliterations?.deva,
                original: meaning.transliterations?.newa,
              },
            }),
          ),
  };
  return response;
}
