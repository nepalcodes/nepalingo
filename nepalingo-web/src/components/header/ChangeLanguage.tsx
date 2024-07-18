import React, { useState } from "react";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { LanguageKey, Languages, useLanguage } from "../../hooks/Langauge";

const ChangeLanguage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedLanguage, switchLanguage } = useLanguage();


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: LanguageKey) => {
        switchLanguage(option);
        setIsOpen(false);
    };
    const options = Object.keys(Languages).map((key) => ({ label: key, value: Languages[key as LanguageKey] }))
    console.log(options)
    return (
        <div className="relative text-left h-full">
            <button
                type="button"
                className="w-full bg-grayDark px-6 h-10 rounded-lg  text-sm font-medium text-gray-900 focus:outline-none"
                onClick={toggleMenu}
            >
                <span className="text-white font-primary font-black ">{selectedLanguage}</span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-white " />
            </button>
            <Menu isOpen={isOpen} onSelect={handleSelect} options={options} />
        </div>
    );
};

export default ChangeLanguage;
