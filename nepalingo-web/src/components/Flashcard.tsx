import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEye,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import Card from "@/components/Card";
import useDictionary from "@/hooks/useDictionary";
import ReactGA from "react-ga4";
import { useLanguage } from "@/hooks/Langauge";
import { getNextWord } from "@/lib/getNextWord";

const Flashcard: React.FC = () => {
  const [viewType, setViewType] = useState(0);
  const { selectedLanguage } = useLanguage();
  const [word, setWord] = useState("Today");
  const [wordGenerator, setWordGenerator] = useState<Generator<
    string,
    void,
    unknown
  > | null>(null);

  const { data, isLoading, error } = useDictionary({
    language: selectedLanguage || "",
    word,
  });

  useEffect(() => {
    // Initialize the word generator when the language changes
    const initWordGenerator = async () => {
      const generator = await getNextWord(selectedLanguage || "Newari");
      setWordGenerator(generator);
      handleNextWord(generator);
    };
    initWordGenerator();
  }, [selectedLanguage]);

  const handleFlip = () => {
    setViewType((prevViewType) => (prevViewType + 1) % 3);
  };

  const handleNextWord = async (
    generator?: Generator<string, void, unknown>
  ) => {
    if (!generator && wordGenerator) {
      generator = wordGenerator;
    }
    if (generator) {
      const nextWord = generator.next().value;
      if (typeof nextWord === "string") {
        setWord(nextWord);
        setViewType(0);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error?.response?.length) handleNextWord();

  const meaning = data ? data.meanings[0] : null;

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col items-center">
      <div className="mx-auto max-w-[calc(100% - 20px)]">
        {error ? (
          <div>Error: {error.message}</div>
        ) : selectedLanguage ? (
          <Card
            Word={word}
            TranslatedWord={meaning?.meaningOriginal || ""}
            NepaliWord={meaning?.meaningNp || ""}
            Pronunciation={meaning?.meaningOriginal || ""}
            ImageUrl={meaning?.image?.uri || ""}
            PronounciationUrl={meaning?.audio?.uri}
            viewType={viewType}
          />
        ) : (
          <div>No data available</div>
        )}

        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={isLoading}
            className="bg-white text-red-500 p-4 rounded-[16px] shadow-md hover:bg-red-500 hover:text-white flex items-center justify-center"
            onClick={() => {
              handleNextWord();
              ReactGA.event({
                category: "flash cards",
                label: "thumbs down",
                action: "Click",
                value: 99,
                nonInteraction: true,
                transport: "xhr",
              });
            }}
            style={{ width: "50px", height: "50px" }}
          >
            <FontAwesomeIcon icon={faThumbsDown} size="lg" />
          </button>
          <button
            disabled={isLoading}
            className="bg-white text-gray-500 p-4 rounded-[16px] shadow-md hover:bg-gray-500 hover:text-white flex items-center justify-center"
            onClick={() => {
              handleFlip();
              ReactGA.event({
                category: "flash cards",
                label: "eye",
                action: "Click",
                value: 99,
                nonInteraction: true,
                transport: "xhr",
              });
            }}
            style={{ width: "50px", height: "50px" }}
          >
            <FontAwesomeIcon icon={faEye} size="lg" />
          </button>
          <button
            disabled={isLoading}
            className="bg-white text-green-500 p-4 rounded-[16px] shadow-md hover:bg-green-500 hover:text-white flex items-center justify-center"
            onClick={() => {
              handleNextWord();
              ReactGA.event({
                category: "flash cards",
                label: "thumbs up",
                action: "Click",
                value: 99,
                nonInteraction: true,
                transport: "xhr",
              });
            }}
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
