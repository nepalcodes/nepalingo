import React, { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import useDictionary from "@/hooks/useDictionary";
import { generate } from "random-words";
import ReactGA from "react-ga4";

const Flashcard: React.FC = () => {
  ReactGA.event({
    category: "flash cards",
    action: "Click",
    value: 99, // optional, must be a number
    nonInteraction: true, // optional, true/false
    transport: "xhr", // optional, beacon/xhr/image
  });

  const [word, setWord] = useState("salt");
  const [viewType, setViewType] = useState(0);
  const { data, isLoading, error } = useDictionary({
    language: "newari",
    word,
  });

  if (error) {
    console.error(error);
  }

  const handleFlip = () => {
    setViewType((prevViewType) => (prevViewType + 1) % 3);
  };

  const handleNextWord = () => {
    setWord(generate() as string);
    setViewType(0);
  };

  if (isLoading) return <div>Loading</div>;
  if (error?.response?.length) handleNextWord();
  const meaning = data && data.meanings[0];

  return (
    <div className="max-w-md mx-auto p-4 flex justify-center">
      <div className="mx-auto max-w-[calc(100% - 20px)]">
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <Card
            Word={word}
            TranslatedWord={meaning?.meaningOriginal || ""}
            DevenagiriSpelling={meaning?.meaningNp || ""}
            Pronunciation={meaning?.meaningOriginal || ""}
            ImageUrl={meaning?.image?.uri || ""}
            PronounciationUrl={meaning?.audio?.uri}
            viewType={viewType}
          />
        )}

        <div className="flex justify-between mt-4">
          <Button
            disabled={isLoading}
            className="bg-purple-800"
            onClick={handleFlip}
          >
            Flip
          </Button>
          <Button
            disabled={isLoading}
            className="bg-gray-500"
            onClick={handleNextWord}
          >
            Next Word
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
