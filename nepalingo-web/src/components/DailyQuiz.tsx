import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "./Button";
const DailyQuiz: React.FC = () => {
  const backgroundImageUrl =
    "https://t3.ftcdn.net/jpg/00/73/08/22/360_F_73082224_ay4Tus31QNHNmGSIty53ZE6mBrBc47cV.jpg"; // Set your image URL
  const navigate = useNavigate(); // Get the navigate function

  const handleStartQuizClick = () => {
    // Redirect to /flashcard when the button is clicked
    navigate("/flashcard");
  };

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
      <Button
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleStartQuizClick} // Call the function on button click
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default DailyQuiz;
