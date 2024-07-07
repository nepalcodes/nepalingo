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
        audio?: { file: string, directory: string },
        image?: string,
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
        case 'tajpuriya':
            return
        default:
            break;
    }
}


export default useDictionary
