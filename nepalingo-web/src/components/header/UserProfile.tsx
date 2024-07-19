import React, { useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import Menu from "@/components/header/Menu";
import { useAuth } from "@/hooks/Auth";

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

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
    { label: "Log out", value: "signOut" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-gray-700 text-sm font-medium hover:bg-gray-600 focus:outline-none"
        onClick={toggleMenu}
      >
        <UserAvatar />
      </button>
      <Menu isOpen={isOpen} onSelect={handleSelect} options={options} />
    </div>
  );
};

export default UserProfile;
