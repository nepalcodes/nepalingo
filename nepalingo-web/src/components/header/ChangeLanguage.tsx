import React, { useState } from "react";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ChangeLanguage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Nepal Bhasa");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedLanguage(option);
    setIsOpen(false);
  };

  const options = [
    { label: "Nepal Bhasa", value: "newari" },
    { label: "Tajpuriya", value: "tajpuriya" },
    { label: "Maithili", value: "coming soon" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-between w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-[#E6E6E6] text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
        onClick={toggleMenu}
      >
        <span>{selectedLanguage}</span>
        <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
      </button>
      <Menu isOpen={isOpen} onSelect={handleSelect} options={options} />
    </div>
  );
};

export default ChangeLanguage;
