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
    if (option === "newari") {
      //will be handled later
    }
    setSelectedLanguage(option);
    setIsOpen(false);
  };

  const options = [
    { label: "Nepal Bhasa", value: "newari" },
    { label: "Tajpuriya", value: "comingSoon" },
    { label: "Maithili", value: "comingSoon" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-between items-center w-48 h-11 px-4 rounded-md border border-gray-300 shadow-sm bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none"
        onClick={toggleMenu}
      >
        {selectedLanguage}
        <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
      </button>
      <Menu isOpen={isOpen} onSelect={handleSelect} options={options} />
    </div>
  );
};

export default ChangeLanguage;
