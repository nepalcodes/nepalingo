import React, { useState } from "react";
import { useAuth } from "../userAuth/AuthContext";

const ProfileIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const username = user?.user_metadata?.username;
  const avatarUrl = `https://robohash.org/${username}.png`;

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-gray-700 text-sm font-medium hover:bg-gray-600 focus:outline-none"
          onClick={toggleDropdown}
        >
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-full h-full rounded-full"
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="px-4 py-2 text-sm text-white">
              <p>
                <strong>Username:</strong> {user?.user_metadata?.username}
              </p>
              {/* <p><strong>Day Streak:</strong> {user?.dayStreak}</p> */}
            </div>
            <div className="border-t border-gray-700"></div>
            <button
              type="button"
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
              onClick={signOut}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
