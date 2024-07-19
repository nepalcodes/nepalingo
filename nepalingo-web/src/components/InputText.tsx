import React from "react";

interface InputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-[785px] h-[60px] rounded-md p-[16px_12px] text-lg shadow-sm transition-colors duration-300 focus:border-blue-500 focus:shadow-lg bg-[#2B2B2B] text-white"
    />
  );
};

export default InputText;
