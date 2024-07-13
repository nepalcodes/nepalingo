import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import useDictionary from '../hooks/useDictionary';
import { generate } from "random-words";

const Flashcard: React.FC = () => {
  const [word, setWord] = useState(generate() as string);
  const [isFlipped, setIsFlipped] = useState(false);
  const { data, isLoading, error } = useDictionary({ language: 'newari', word });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextWord = () => {
    setWord(generate() as string);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  useEffect(() => {
    if (data == undefined) {
      handleNextWord();
    }
  }, [data, error]);

 if(isLoading) return <div>Loading</div>
  const meaning = data && data.meanings[0]

  // No need to check for data availability here, it will be handled in useEffect

  return (
    <div className="max-w-md mx-auto p-4 flex justify-center border-2">
      <div className="mx-auto max-w-[calc(100% - 20px)]">
        {
        error ? <div>Error: {error.message}</div> : <Card
          Word={word}
          TranslatedWord={meaning?.meaningOriginal || ''}
          DevenagiriSpelling={meaning?.meaningNp || ''}
          Pronunciation={meaning?.meaningOriginal || ''}
          ImageUrl={meaning?.image || ''}
          PronounciationUrl={meaning?.audio ? `${meaning?.audio.directory}/${meaning.audio.file}` : ''}
          isFlipped={isFlipped}
          handleFlip={handleFlip}
        />
      }


        <div className="flex justify-between mt-4">
          <Button disabled ={isLoading} className="bg-purple-800" onClick={handleFlip}>
            Flip
          </Button>
          <Button disabled ={isLoading} className="bg-gray-500" onClick={handleNextWord}>
            Next Word
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
