import React, { useState } from "react";

interface MenuProps {
  isOpen: boolean;
  onSelect: (option: string) => void;
  selectedOption: string;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onSelect, selectedOption }) => {
  if (!isOpen) return null;

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <button
          type="button"
          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
          onClick={() => onSelect("Nepal Bhasa")}
        >
          Nepal Bhasa
        </button>
        <div className="w-full text-left px-4 py-2 text-sm text-gray-500 flex justify-between items-center">
          Tajpuriya
          <span className="text-xs text-gray-400">(Coming Soon)</span>
        </div>
      </div>
    </div>
  );
};

const ChangeLanguage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Nepal Bhasa");

  const handleSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLanguage}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06-1.06l.07.07a.75.75 0 01-.07 1.06L10.53 11.94a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <Menu
        isOpen={isOpen}
        onSelect={handleSelect}
        selectedOption={selectedLanguage}
      />
    </div>
  );
};

export default ChangeLanguage;
