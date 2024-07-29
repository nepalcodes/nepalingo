import React from 'react';
import Flashcard from './Flashcard'; // Assuming FlashCard is a separate component

interface QuizProps {
  onExit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onExit }) => {
  return (
    <div className="quiz-container">
      <Flashcard />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={onExit}
      >
        Exit Quiz
      </button>
    </div>
  );
};

export default Quiz;
