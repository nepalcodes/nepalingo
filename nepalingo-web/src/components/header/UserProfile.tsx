import React, { useState, useContext, useRef } from "react";
import UserAvatar from "@/components/UserAvatar";
import { StreakContext } from "@/hooks/StreakContext";
import { getPhrase } from "@/components/header/StreakPhrase";
import { useAuth } from "@/hooks/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { currentStreak, longestStreak } = useContext(StreakContext);
  const phrase = getPhrase(currentStreak);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center w-9 h-9 rounded-full border border-gray-300 shadow-sm bg-gray-700 text-sm font-medium hover:bg-gray-600 focus:outline-none"
        onClick={toggleMenu}
      >
        <div className="relative">
          <UserAvatar />
        </div>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-[#2B2B2B] p-4"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16">
              <UserAvatar />
            </div>
            <span className="mt-1 text-white font-primary font-black">
              {user?.user_metadata?.username}
            </span>
            <span className="mt-0 text-gray-400 font-primary text-sm">
              {phrase}
            </span>
          </div>
          <div className="mt-2 p-4 bg-[#D03641] rounded-lg text-white">
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img src={fire} className="text-yellow-500 text-6xl" />
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white font-primary top-3/4 transform -translate-y-1/2">
                    {longestStreak}
                  </span>
                </div>
                <span className="mt-1 font-primary">Current</span>
              </div>
              <div className="border-l border-white h-16"></div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img src={fire} className="text-yellow-500 text-6xl" />
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white font-primary top-3/4 transform -translate-y-1/2">
                    {longestStreak}
                  </span>
                </div>
                <span className="mt-1 font-primary">Highest</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-2 w-full py-2 rounded-lg bg-[#D03641] text-white font-primary font-black hover:bg-[#A02C35] focus:outline-none"
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
