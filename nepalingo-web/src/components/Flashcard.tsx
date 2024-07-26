import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import Card from "@/components/Card";
import useDictionary from "@/hooks/useDictionary";
import { generate } from "random-words";
import ReactGA from "react-ga4";

const Flashcard: React.FC = () => {
  ReactGA.event({
    category: "flash cards",
    action: "Click",
    value: 99,
    nonInteraction: true,
    transport: "xhr",
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

  if (isLoading) return <div>Loading...</div>;
  if (error?.response?.length) handleNextWord();
  const meaning = data && data.meanings[0];

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center">
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

        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={isLoading}
            className="bg-white text-red-500 p-4 rounded-[16px] shadow-md hover:bg-red-500 hover:text-white flex items-center justify-center"
            onClick={handleNextWord}
            style={{ width: "50px", height: "50px" }}
          >
            <FontAwesomeIcon icon={faThumbsDown} size="lg" />
          </button>
          <button
            disabled={isLoading}
            className="bg-white text-gray-500 p-4 rounded-[16px] shadow-md hover:bg-gray-500 hover:text-white flex items-center justify-center"
            onClick={handleFlip}
            style={{ width: "50px", height: "50px" }}
          >
            <FontAwesomeIcon icon={faEye} size="lg" />
          </button>
          <button
            disabled={isLoading}
            className="bg-white text-green-500 p-4 rounded-[16px] shadow-md hover:bg-green-500 hover:text-white flex items-center justify-center"
            onClick={handleNextWord}
            style={{ width: "50px", height: "50px" }}
          >
            <FontAwesomeIcon icon={faThumbsUp} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
