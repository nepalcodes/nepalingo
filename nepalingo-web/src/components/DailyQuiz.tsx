import React from 'react';
import Button from './Button';
const DailyQuiz: React.FC = () => {
  const backgroundImageUrl = 'https://images8.alphacoders.com/132/1325725.png'; // Set your image URL

  return (
    <div
      className="daily-quiz-card bg-cover text-white p-8 rounded-lg"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <h1 className="mb-2">Nepalingo</h1>
      <p className="text-lg font-bold mb-2">QUIZ YOURSELF</p>
      <p className="text-sm opacity-80 mb-2">
        Taking Quiz is a better and fun way for learning
      </p>
      <Button className="bg-slate-800">Start Quiz</Button>
    </div>
  );
};

export default DailyQuiz;
