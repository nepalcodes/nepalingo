import React, { useState, useContext } from "react";
import UserAvatar from "../UserAvatar";
import Menu from "./Menu";
import { useAuth } from "../userAuth/AuthContext";
import { StreakContext } from "../StreakContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { currentStreak, longestStreak } = useContext(StreakContext); // Get streak data from context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    if (option === "signOut") {
      signOut();
    }
    setIsOpen(false);
  };

  const options = [
    { label: `Username: ${user?.user_metadata?.username}`, value: "username" },
    { label: `Current Streak: ${currentStreak} days`, value: "currentStreak" },
    { label: `Longest Streak: ${longestStreak} days`, value: "longestStreak" },
    { label: "Log out", value: "signOut" },
  ];

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
      <Menu isOpen={isOpen} onSelect={handleSelect} options={options} />
    </div>
  );
};

export default UserProfile;
