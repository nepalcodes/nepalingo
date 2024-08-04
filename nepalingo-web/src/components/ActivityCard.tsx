import React from "react";
import Button from "./Button";

interface ActivityCardProps {
  backgroundImageUrl: string;
  quizYourselfText: string;
  descriptionText: string;
  buttonText?: string;
  backDrop?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  backgroundImageUrl,
  quizYourselfText,
  descriptionText,
  buttonText,
  children,
  onClick,
}) => {
  return (
    <div className="relative daily-quiz-card text-white p-4 sm:p-4 md:p-4 rounded-lg flex flex-col justify-end  min-h-32 h-48 pb-5 overflow-hidden">
      <img
        src={backgroundImageUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative flex flex-row gap-2 flex-wrap justify-between items-end ">
        <div className="flex min-w-24  flex-col ">
          <p className="text-base sm:text-lg font-bold mb-1">
            {quizYourselfText}
          </p>
          <p className="text-xs sm:text-sm opacity-80 mb-1">
            {descriptionText}
          </p>
        </div>
        {children}
        {buttonText && onClick && (
          <Button
            className="bg-red-600 block w-fit h-fit text-white font-bold py-1 px-3 sm:py-2 sm:px-5 md:py-3 md:px-6 rounded text-xs sm:text-sm md:text-base"
            smallHeight={true}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
