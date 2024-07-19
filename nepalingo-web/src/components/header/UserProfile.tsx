import React, { useState, useContext } from "react";
import UserAvatar from "@/components/UserAvatar";
import { StreakContext } from "@/components/StreakContext";
import { getPhrase } from "@/components/header/StreakPhrase";
import { useAuth } from "@/hooks/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { currentStreak, longestStreak } = useContext(StreakContext);
  const phrase = getPhrase(currentStreak);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center w-12 h-12 rounded-full border border-gray-300 shadow-sm bg-gray-700 text-sm font-medium hover:bg-gray-600 focus:outline-none"
        onClick={toggleMenu}
      >
        <div className="relative">
          <UserAvatar />
          {currentStreak > 0 && (
            <div className="absolute bottom-1 right-3 transform translate-x-1/2 translate-y-1/2 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faFire}
                className="text-yellow-600 text-2xl"
              />
              <span className="absolute text-sm text-white">
                {currentStreak}
              </span>
            </div>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-[#2B2B2B] p-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16">
              <UserAvatar />
            </div>
            <span className="mt-1 text-white text-lg font-bold">
              {user?.user_metadata?.username}
            </span>
            <span className="mt-0 text-gray-400 text-sm">{phrase}</span>
          </div>
          <div className="mt-2 p-4 bg-[#D03641] rounded-lg text-white">
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faFire}
                    className="text-yellow-500 text-6xl"
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white">
                    {currentStreak}
                  </span>
                </div>
                <span className="mt-1">Current</span>
              </div>
              <div className="border-l border-white h-16"></div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faFire}
                    className="text-yellow-500 text-6xl"
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white">
                    {longestStreak}
                  </span>
                </div>
                <span className="mt-1">Longest</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-2 w-full py-2 rounded-lg bg-[#D03641] text-white font-bold hover:bg-[#A02C35] focus:outline-none"
            onClick={signOut}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
