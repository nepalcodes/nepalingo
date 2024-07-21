import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: IconDefinition; // Optional icon prop
}

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  icon,
  ...otherInputProps
}) => {
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-3 text-white">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`flex-1 h-[60px] rounded-md p-[16px_12px] pl-${icon ? "10" : "3"} text-lg shadow-sm transition-colors duration-300 focus:border-blue-500 focus:shadow-lg bg-[#2B2B2B] text-white`}
        {...otherInputProps}
      />
    </div>
  );
};

export default InputText;
