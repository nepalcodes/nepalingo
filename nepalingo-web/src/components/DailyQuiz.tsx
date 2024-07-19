import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface DailyQuizProps {
  backgroundImageUrl: string;
  quizYourselfText: string;
  descriptionText: string;
  buttonText: string;
}

const DailyQuiz: React.FC<DailyQuizProps> = ({
  backgroundImageUrl,
  quizYourselfText,
  descriptionText,
  buttonText,
}) => {
  const navigate = useNavigate();

  const handleStartQuizClick = () => {
    navigate("/flashcard");
  };

  return (
    <div
      className="daily-quiz-card bg-cover text-white p-8 rounded-lg flex flex-col justify-end"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        borderRadius: "0.5rem",
        height: "220px", // Reduced height
        paddingBottom: "20px", // Space at the bottom
      }}
    >
      <div>
        <p className="text-lg font-bold mb-1">{quizYourselfText}</p> {/* Reduced margin-bottom */}
        <p className="text-sm opacity-80 mb-1">{descriptionText}</p> {/* Reduced margin-bottom */}
        <Button
          className="bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleStartQuizClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DailyQuiz;
