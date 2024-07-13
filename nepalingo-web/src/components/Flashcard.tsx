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
    if (data && (!data.meanings || data.meanings.length === 0)) {
      handleNextWord();
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // No need to check for data availability here, it will be handled in useEffect
  const { meanings } = data || { meanings: [] };
  const meaning = meanings.length > 0 ? meanings[0] : {};

  return (
    <div className="max-w-md mx-auto p-4 flex justify-center border-2">
      <div className="mx-auto max-w-[calc(100% - 20px)]">
        <Card
          Word={word}
          TranslatedWord={meaning.meaningOriginal || ''}
          DevenagiriSpelling={meaning.meaningOriginal || ''}
          Pronunciation={meaning.meaningOriginal || ''}
          ImageUrl={meaning.image || ''}
          PronounciationUrl={meaning.audio ? `${meaning.audio.directory}/${meaning.audio.file}` : ''}
          isFlipped={isFlipped}
          handleFlip={handleFlip}
        />

        <div className="flex justify-between mt-4">
          <Button className="bg-purple-800" onClick={handleFlip}>
            Flip
          </Button>
          <Button className="bg-gray-500" onClick={handleNextWord}>
            Next Word
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
