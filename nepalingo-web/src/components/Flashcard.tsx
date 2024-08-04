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

const Flashcard: React.FC = () => {
  const [viewType, setViewType] = useState(0);
  const { selectedLanguage } = useLanguage();
  const [word, setWord] = useState("Today");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Make sure flashcard is updated when language is changed
    handleNextWord();
  }, [selectedLanguage]);

  function getNextIndex(wordArray: Array<string>) {
    const newIndex = (index + 1) % wordArray.length;
    return newIndex;
  }

  const { data, isLoading, error } = useDictionary({
    language: selectedLanguage || "",
    word,
  });

  if (error) {
    console.error(error);
  }

  const handleFlip = () => {
    setViewType((prevViewType) => (prevViewType + 1) % 3);
  };
  const handleNextWord = async () => {
    let wordArray: Array<string> = [];
    if (selectedLanguage === "Newari") {
      wordArray = [
        "hello",
        "call",
        "can",
        "do",
        "how",
        "I",
        "my",
        "what",
        "where",
        "a",
        "do",
        "not",
        "for",
        "from",
        "fun",
        "have",
        "help",
        "language",
        "me",
        "name",
        "need",
        "please",
        "police",
        "sick",
        "speak",
        "understand",
        "well",
        "you",
        "your",
        "salt",
      ];
    } else if (selectedLanguage === "Tajpuriya") {
      const wordText = await fetch("./dictionaries/TajpuriyaDictionary.csv")
        .then((r) => r.text())
        .catch((error) => {
          console.error("Error fetching words:", error);
        });

      if (wordText) {
        wordArray = wordText.split("\n").map((line: string) =>
          line
            .split(",")[0]
            .trim()
            .replace(/(^"|"$)/g, "")
        );
      }
    }

    const newIndex = getNextIndex(wordArray);
    setIndex(newIndex);
    setWord(wordArray[newIndex]);
    setViewType(0);
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
                category: "thumbs up",
                action: "Click",
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
                category: "eye",
                action: "Click",
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
                category: "thumbs down",
                action: "Click",
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
