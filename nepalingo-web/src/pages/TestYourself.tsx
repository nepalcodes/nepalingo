import React, { useState, useEffect } from "react";
import useDictionary from "@/hooks/useDictionary";
import { generate } from "random-words";
import Header from "@/components/header/Header";
import Button from "@/components/Button";
import { useStreak } from "@/hooks/StreakContext";
import { useLanguage } from "@/hooks/Langauge";

const TestYourself: React.FC = () => {
  const { updateStreak } = useStreak();
  const { selectedLanguage } = useLanguage();
  const [word, setWord] = useState("today");
  const [index, setIndex] = useState(0);

  const [options, setOptions] = useState<string[]>([
    "today",
    "rice",
    "hot",
    "salt",
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { data, isLoading } = useDictionary({
    language: selectedLanguage || "newari",
    word,
  });

  useEffect(() => {
    updateStreak(); // Trigger streak update on flashcard page load
  }, [selectedLanguage]);

  const getOptions = (word: string) => {
    const randomWords = generate({ exactly: 3 }) as string[];
    randomWords.push(word);
    const shuffledOptions = randomWords.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  function getNextIndex(wordArray: Array<string>) {
    const newIndex = (index + 1) % wordArray.length;
    return newIndex;
  }

  const handleNextQuestion = async () => {
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

    if (wordArray.length > 0) {
      const newIndex = getNextIndex(wordArray);
      setIndex(newIndex);
      setWord(wordArray[newIndex]);
      setSelectedOption(null);
      setIsCorrect(null);
      getOptions(wordArray[newIndex]);
    } else {
      console.error("Word array is empty");
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === word);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-2xl text-primary font-primary">
        Loading...
      </div>
    );
  }

  const meaning = data && data.meanings[0];
  const displayedWord = meaning?.meaningOriginal || "";

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-primary">
        <div className="p-2 max-w-xl w-full text-center mb-8">
          <h2 className="text-4xl font-primary font-bold mb-6">
            What is this word in English?
          </h2>
          <p className="text-5xl mb-6 text-primary">{displayedWord}</p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            {options.map((option, index) => (
              <button
                key={option}
                className={`p-4 text-2xl w-full border rounded ${
                  selectedOption
                    ? option === word
                      ? "bg-green-500"
                      : option === selectedOption
                        ? "bg-red-500"
                        : ""
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
          {selectedOption !== null && (
            <div className="mt-6">
              {isCorrect ? (
                <p className="text-2xl text-green-600">
                  Correct! The answer is indeed {word}.
                </p>
              ) : (
                <p className="text-2xl text-red-600">
                  Incorrect. The correct answer is {word}.
                </p>
              )}
              <Button className="mt-6 text-2xl" onClick={handleNextQuestion}>
                Next Question
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestYourself;
