import React, { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import useDictionary from "@/hooks/useDictionary";
import getTajpuriya from "@/hooks/getTajpuriya";
import { generate } from "random-words";
import ReactGA from "react-ga4";
import { useLanguage } from "@/hooks/Langauge";

const Flashcard: React.FC = () => {
  ReactGA.event({
    category: "flash cards",
    action: "Click",
    value: 99, // optional, must be a number
    nonInteraction: true, // optional, true/false
    transport: "xhr", // optional, beacon/xhr/image
  });
  const { selectedLanguage } = useLanguage();
  const [word, setWord] = useState("Today");
  const [isFlipped, setIsFlipped] = useState(false);
  // const [trigger, setTrigger] = useState(0);
  const [index, setIndex] = useState(0);

  function getRandomWord<T>(arr: Array<T>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getNextIndex(wordArray: Array<string>) {
    const newIndex = (index + 1) % wordArray.length;
    console.log("newIndex", newIndex);
    return newIndex;
  }

  const { data, isLoading, error } = useDictionary({
    language: selectedLanguage || "",
    word,
  });
  // const tajpuriyaWord = getTajpuriya(trigger);

  if (error) {
    console.error(error);
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // const handleNextWord = () => {
  //   setWord(generate() as string);
  //   setIsFlipped(false);
  //   setTrigger((prev) => prev + 1);
  // };
  //
  const handleNextWord = async () => {
    let wordArray: Array<string> = [];
    if (selectedLanguage === "Newari") {
      wordArray = ["salt", "hello", "go"];
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
            .replace(/(^"|"$)/g, ""),
        );
      }
    }
    const newIndex = getNextIndex(wordArray);
    setIndex(newIndex);
    setWord(wordArray[newIndex]);
    setIsFlipped(false);
  };

  if (isLoading) return <div>Loading</div>;
  if (error?.response?.length) handleNextWord();

  const meaning =
    selectedLanguage === "Newari" && data ? data.meanings[0] : null;

  return (
    <div className="max-w-md mx-auto p-4 flex justify-center border-2">
      <div className="mx-auto max-w-[calc(100% - 20px)]">
        {error ? (
          <div>Error: {error.message}</div>
        ) : selectedLanguage === "Newari" ? (
          <Card
            Word={word}
            TranslatedWord={meaning?.meaningOriginal || ""}
            DevenagiriSpelling={meaning?.meaningNp || ""}
            Pronunciation={meaning?.meaningOriginal || ""}
            ImageUrl={meaning?.image?.uri || ""}
            PronounciationUrl={meaning?.audio?.uri}
            isFlipped={isFlipped}
          />
        ) : selectedLanguage === "Tajpuriya" && tajpuriyaWord ? (
          <Card
            Word={tajpuriyaWord.word.text}
            TranslatedWord={tajpuriyaWord.word.translation}
            DevenagiriSpelling={""}
            Pronunciation={tajpuriyaWord.word.translation}
            ImageUrl={""}
            PronounciationUrl={""}
            isFlipped={isFlipped}
          />
        ) : (
          <div>No data available</div>
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
