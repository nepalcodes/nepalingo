import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface ActivityCardProps {
  backgroundImageUrl: string;
  quizYourselfText: string;
  descriptionText: string;
  buttonText: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
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
    <div className="relative daily-quiz-card text-white p-8 rounded-lg flex flex-col justify-end h-[220px] pb-5 overflow-hidden">
      <img
        src={backgroundImageUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10">
        <p className="text-lg font-bold mb-1">{quizYourselfText}</p>
        <p className="text-sm opacity-80 mb-1">{descriptionText}</p>
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

export default ActivityCard;
  