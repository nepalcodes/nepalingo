import React from "react";
import Button from "./Button";

interface ActivityCardProps {
  backgroundImageUrl: string;
  quizYourselfText: string;
  descriptionText: string;
  buttonText: string;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  backgroundImageUrl,
  quizYourselfText,
  descriptionText,
  buttonText,
  onClick,
}) => {
  return (
    <div className="relative daily-quiz-card text-white p-4 sm:p-6 md:p-8 rounded-lg flex flex-col justify-end h-[180px] sm:h-[200px] md:h-[220px] pb-5 overflow-hidden">
      <img
        src={backgroundImageUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-base sm:text-lg font-bold mb-1">
            {quizYourselfText}
          </p>
          <p className="text-xs sm:text-sm opacity-80 mb-1">
            {descriptionText}
          </p>
        </div>
        <Button
          className="h-auto bg-red-600 text-white font-bold py-1 px-3 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded text-xs sm:text-sm md:text-base"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;
