import React, { useState } from "react";
import useDictionary from "@/hooks/useDictionary";
import { generate } from "random-words";
import Header from "./header/Header";
import Button from "./Button";

const TestYourself: React.FC = () => {
  const [word, setWord] = useState("today");
  const [options, setOptions] = useState<string[]>([
    "today",
    "rice",
    "hot",
    "salt",
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isIncorrect, setIsIncorrect] = useState<boolean | null>(null);
  const { data, isLoading, error } = useDictionary({
    language: "newari",
    word,
  });
  const getOptions = (word: string) => {
    const randomWords = generate({ exactly: 3 }) as string[];
    randomWords.push(word);

    const shuffledOptions = randomWords.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  const handleNextQuestion = () => {
    const NewWord = generate() as string;
    setWord(NewWord);
    setSelectedOption(null);
    setIsCorrect(null);
    getOptions(NewWord);
  };
  if (error) {
    handleNextQuestion();
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === word);
    setIsIncorrect(option !== word);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-2xl text-primary font-primary">
        Loading...
      </div>
    );

  const meaning = data && data.meanings[0];
  const NewariWord = meaning?.meaningOriginal || "";

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-primary">
        <div className="p-2 max-w-xl w-full text-center mb-8">
          <h2 className="text-4xl font-primary font-bold mb-6">
            What is this word in English?
          </h2>
          <p className="text-5xl mb-6 text-primary">{NewariWord}</p>
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
