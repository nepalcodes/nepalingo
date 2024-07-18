import React from "react";
import { LanguageKey } from "@hooks/Langauge";

interface MenuProps {
    isOpen: boolean;
    onSelect: (option: LanguageKey) => void;
    options: { label: string; value: string }[];
}

const Menu: React.FC<MenuProps> = ({ isOpen, onSelect, options }) => {
    if (!isOpen) return null;

    return (
        <div className="origin-top-right absolute left-0 mt-2 rounded-lg shadow-lg bg-grayDark ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
            <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
            >
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={`w-full text-left px-4 py-4 text-sm font-primary font-semibold text-white ${option.value === "coming soon"
                            ? "text-gray-500 cursor-not-allowed"
                            : "hover:bg-[#D03641] hover:text-white"
                            }`}
                        onClick={() =>
                            option.value !== "coming soon" && onSelect(option.label as LanguageKey)
                        }
                        disabled={option.value === "coming soon"}
                    >
                        {option.label}{" "}
                        {option.value === "coming soon" && (
                            <p className="text-xs text-gray-400">(Coming Soon)</p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;
