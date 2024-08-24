import React, { useState, useEffect, useRef } from "react";
import useDictionary from "@/hooks/useDictionary";
import { generate } from "random-words";
import Header from "@/components/header/Header";
import Button from "@/components/Button";
import { useStreak } from "@/hooks/StreakContext";
import { useLanguage } from "@/hooks/Langauge";
import { getNextWord } from "@/lib/getNextWord";

const Quiz: React.FC = () => {
  const { updateStreak } = useStreak();
  const { selectedLanguage } = useLanguage();
  const [word, setWord] = useState("hello");
  const [wordIndex, setWordIndex] = useState(1);
  const [options, setOptions] = useState<string[]>([
    "hello",
    "bye",
    "no",
    "today",
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { data, isLoading } = useDictionary({
    language: selectedLanguage || "newari",
    word,
  });
  const wordGeneratorRef = useRef<ReturnType<typeof getNextWord> | null>(null);
  const sentences = [
    "My name is John.",
    "I am learning a new language.",
    "Where is the nearest restaurant?",
    "What time is it?",
    "How are you doing today?",
    "Please help me with this task.",
    "I am from Kathmandu.",
    "The weather is nice today.",
    "I like to read books.",
    "Can you please give me directions?",
  ];

  useEffect(() => {
    updateStreak(); // Trigger streak update on flashcard page load
    wordGeneratorRef.current = getNextWord(selectedLanguage || "newari");
  }, [selectedLanguage]);

  const getOptions = (word: string) => {
    let randomWords;

    if (word.includes(" ")) {
      // If the word is a sentence, generate options from sentences
      randomWords = sentences
        .filter((sentence) => sentence !== word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    } else {
      // Otherwise, generate options from random words
      randomWords = generate({ exactly: 3 }) as string[];
    }

    randomWords.push(word);
    const shuffledOptions = randomWords.sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  const handleNextQuestion = async () => {
    let nextWord;
    if (!isCorrect) {
      nextWord = word;
    } else {
      const generator = await wordGeneratorRef.current;
      if (generator) {
        nextWord = generator?.next()?.value;
        setWordIndex(wordIndex + 1);
      }
    }

    if (typeof nextWord === "string") {
      setWord(nextWord);
      setSelectedOption(null);
      setIsCorrect(null);
      getOptions(nextWord);
    } else {
      console.error("Generated word is not a string.");
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
      <div className="flex flex-col items-center justify-center w-full mt-4">
        <h2 className="text-3xl font-semibold text-primary">
          Section - <span className="text-white">Introductions</span>
        </h2>
        <p className="text-2xl text-green-500 mt-3">
          Progress: <span className="text-white">{wordIndex}</span> out of{" "}
          <span className="text-white">{24}</span>
        </p>
      </div>
      <div className="flex justify-center bg-black text-white font-primary">
        <div className="p-2 max-w-xl w-full text-center mt-20">
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
                  Incorrect. Please try again!
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

export default Quiz;
