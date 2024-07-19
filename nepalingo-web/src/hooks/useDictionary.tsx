import useNewari from './useNewari'

const Languages = [
    'newari',
    'tajpuriya',
    'maithili'
]

export type DictionaryProps = {
    language: typeof Languages[number],
    word: string
}

export type DictionaryResponse = {
    language: string;
    word: string;
    meanings: [{
        audio?: { uri: string},
        image?: {uri:string},
        language: string,
        meaningOriginal?: string,
        meaningNp?: string,
        meaningEn: string,
    }]
}

///Use case
//const {data, isLoading, error} = useDictionary('newari', "Hello")

const useDictionary = ({ language, ...otherProps }: DictionaryProps) => {
    switch (language) {
        case 'newari':
            return useNewari(otherProps)
        // case 'tajpuriya':
        //     return ({
        //         error: { message: "Sorry the language does not exist" },
        //         data: null,
        //         isLoading: false,
        //     })
        default:
            return ({
                error: { message: "Sorry the language does not exist" },
                data: undefined,
                isLoading: false,
            })
    }
}


export default useDictionary