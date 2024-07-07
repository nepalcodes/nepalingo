import useSWR from 'swr'
import { DictionaryProps, DictionaryResponse } from './useDictionary'


const fetcher = (url: string) => fetch(import.meta.env.VITE_NEPALBHASA_API_URL + url, {
}).then(r => r.json())

const useNewari = (props: Omit<DictionaryProps, 'language'>) => {
    let { data, error, isLoading } = useSWR(`/dict/en/search/${props.word}`, fetcher)

    let response: DictionaryResponse = {
        language: 'newari',
        word: props.word,
        //Mapping the meanings from the api to create a custom response based on DictionaryResponse
        meanings:
            data?.meanings?.map((meaning: {
                audio?: { file: string, directory: string },
                image?: string,
                meaning_np?: string,
                meaning_nb?: string,
                meaning_en?: string,
            }) => (
                {
                    audio: meaning?.audio,
                    image: meaning?.image,
                    meaningOriginal: meaning?.meaning_nb,
                    meaningNp: meaning?.meaning_np,
                    meaningEn: meaning?.meaning_en,

                })
            )
    }

    return { response, error, isLoading }
}

export default useNewari;
