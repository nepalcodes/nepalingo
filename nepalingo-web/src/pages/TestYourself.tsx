import React, { useState, useEffect, useRef } from "react";
import useDictionary from "@/hooks/useDictionary";
import { generate } from "random-words";
import Header from "@/components/header/Header";
import Button from "@/components/Button";
import { useStreak } from "@/hooks/StreakContext";
import { useLanguage } from "@/hooks/Langauge";
import { getNextWord } from "@/lib/getNextWord";

const TestYourself: React.FC = () => {
  const { updateStreak } = useStreak();
  const { selectedLanguage } = useLanguage();
  const [word, setWord] = useState("today");

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
  const wordGeneratorRef = useRef<ReturnType<typeof getNextWord> | null>(null);

  useEffect(() => {
    updateStreak(); // Trigger streak update on flashcard page load
    wordGeneratorRef.current = getNextWord(selectedLanguage || "newari");
  }, [selectedLanguage]);

  const getOptions = (word: string) => {
    const randomWords = generate({ exactly: 3 }) as string[];
    randomWords.push(word);
    const shuffledOptions = randomWords.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  const handleNextQuestion = async () => {
    const generator = await wordGeneratorRef.current;
    if (generator) {
      const nextWord = generator?.next()?.value;

      if (typeof nextWord === "string") {
        setWord(nextWord);
        setSelectedOption(null);
        setIsCorrect(null);
        getOptions(nextWord);
      } else {
        console.error("Generated word is not a string.");
      }
    } else {
      console.error("Word generator not initialized.");
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
