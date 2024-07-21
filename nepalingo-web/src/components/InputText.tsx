import React from "react";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({
    value,
    onChange,
    onKeyDown,
    placeholder,
    ...otherInputProps
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="flex-1 h-[60px] rounded-md p-[16px_12px] text-lg shadow-sm transition-colors duration-300 focus:border-blue-500 focus:shadow-lg bg-[#2B2B2B] text-white"
            {...otherInputProps}
        />
    );
};

export default InputText;
