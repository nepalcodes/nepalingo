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
    <div className="flex-1 aspect-w-16 aspect-h-9 relative daily-quiz-card text-white p-4 sm:p-6 md:p-8 rounded-lg flex flex-col justify-end pb-5 overflow-hidden">
      <img
        src={backgroundImageUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-base sm:text-lg font-bold mb-1">{quizYourselfText}</p>
          <p className="text-xs sm:text-sm opacity-80 mb-1">{descriptionText}</p>
        </div>
        <Button
          className="bg-red-600 text-white font-bold py-1 px-3 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded text-xs sm:text-sm md:text-base"
          onClick={handleStartQuizClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;
