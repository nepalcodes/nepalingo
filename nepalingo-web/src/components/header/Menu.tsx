import React from "react";

interface MenuProps {
  isOpen: boolean;
  onSelect: (option: string) => void;
  options: { label: string; value: string }[];
}

const Menu: React.FC<MenuProps> = ({ isOpen, onSelect, options }) => {
  if (!isOpen) return null;

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`w-full text-left px-4 py-2 text-sm text-white ${
              option.value === "comingSoon"
                ? "text-gray-500 cursor-not-allowed"
                : "hover:bg-gray-800"
            }`}
            onClick={() =>
              option.value !== "comingSoon" && onSelect(option.value)
            }
            disabled={option.value === "comingSoon"}
          >
            {option.label}{" "}
            {option.value === "comingSoon" && (
              <span className="text-xs text-gray-400">(Coming Soon)</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
