import React, { useContext } from "react";
import { StreakContext } from "@/hooks/StreakContext";
import { getPhrase } from "@/components/header/StreakPhrase";
import fire from "@/assets/fire.svg";

const StreakDisplay: React.FC = () => {
  const { currentStreak } = useContext(StreakContext);
  const phrase = getPhrase(currentStreak);

  return (
    <div className="bg-[#D03641] min-w-[210px] max-w-max h-[55px] rounded-md px-3 pt-0 inline-flex items-center justify-between text-white">
      <div className="text-left flex-1">
        <p className="text-sm font-bold leading-tight uppercase">
          {phrase.split("!")[0]}!
        </p>
        <p className="text-sm font-bold leading-tight uppercase">
          {phrase.split("!")[1]}!
        </p>
      </div>
      <div className="relative flex-shrink-0">
        <img src={fire} alt="Fire" className="w-10 h-10" />
        <span className="absolute font-black font-primary text-1xl text-white bottom-0 left-1/2 transform -translate-x-1/2">
          {currentStreak}
        </span>
      </div>
    </div>
  );
};

export default StreakDisplay;
