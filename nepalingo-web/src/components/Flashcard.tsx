import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import useDictionary from '../hooks/useDictionary';
import { generate } from "random-words";

const Flashcard: React.FC = () => {


    const [word, setWord] = useState('salt');
    const [isFlipped, setIsFlipped] = useState(false);
    const { data, isLoading, error } = useDictionary({ language: 'newari', word });
    console.log(error)


    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextWord = () => {
        setWord(generate() as string)
        setIsFlipped(false);
    };



    if (isLoading) return <div>Loading</div>
    if (error?.response?.length) handleNextWord()
    const meaning = data && data.meanings[0]


    return (
        <div className="max-w-md mx-auto p-4 flex justify-center border-2">
            <div className="mx-auto max-w-[calc(100% - 20px)]">
                {
                    error ? <div>Error: {error.message}</div> : <Card
                        Word={word}
                        TranslatedWord={meaning?.meaningOriginal || ''}
                        DevenagiriSpelling={meaning?.meaningNp || ''}
                        Pronunciation={meaning?.meaningOriginal || ''}
                        ImageUrl={meaning?.image?.uri || ''}
                        PronounciationUrl={meaning?.audio?.uri}
                        isFlipped={isFlipped}
                    />
                }


                <div className="flex justify-between mt-4">
                    <Button disabled={isLoading} className="bg-purple-800" onClick={handleFlip}>
                        Flip
                    </Button>
                    <Button disabled={isLoading} className="bg-gray-500" onClick={handleNextWord}>
                        Next Word
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
