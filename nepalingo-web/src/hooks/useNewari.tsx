import useSWR from 'swr'
import { DictionaryProps, DictionaryResponse } from './useDictionary'


const fetcher = (url: string) => fetch(import.meta.env.VITE_NEPALBHASA_API_URL + url, {
}).then(r => r.json())

const useNewari = (props: Omit<DictionaryProps, 'language'>) => {
    const { data, error, isLoading } = useSWR(`/dict/en/search/${props.word}`, fetcher)
    console.log(data,error,isLoading)
    let customError= !!data?.errors.length? {status:true, response:data.errors, message: data.errors[0],}:error 


    const response: DictionaryResponse = {
        language: 'newari',
        word: props.word,
        //Mapping the meanings from the api to create a custom response based on DictionaryResponse
        meanings: data?.meanings.length == 0? []:
            data?.meanings?.map((meaning: {
                audio?: { file: string, directory: string },
                image?: {file:string, directory:string},
                meaning_np?: string,
                meaning_nb?: string,
                meaning_en?: string,
            }) => (
                {
                    audio: meaning?.audio &&  {uri: `${import.meta.env.VITE_NEPALBHASA_API_URL}/dict/${meaning.audio.directory}/${meaning.audio.file}`},
                    image: meaning?.image && {uri: `${import.meta.env.VITE_NEPALBHASA_API_URL}/dict/${meaning.image.directory}/w800h800b1sh1/${meaning.image.file}`},
                    meaningOriginal: meaning?.meaning_nb,
                    meaningNp: meaning?.meaning_np,
                    meaningEn: meaning?.meaning_en,

                })
            )
    }

    return { data: response, error:customError, isLoading }
}

export default useNewari;
