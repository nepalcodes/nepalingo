import React, { useRef } from "react";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    iconProps: FontAwesomeIconProps;
    placeholder?: string;
    error?: string;
    name: string;
    inputType: string;
    className?: string;
}
export const CustomTextInput = ({
    label,
    onChangeText,
    iconProps,
    placeholder,
    name,
    inputType,
    className,
}: TextInputProps) => {
    const inputRef = useRef<null | HTMLInputElement>(null);
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor="input-group-1"
                    className="block mb-2 text-sm font-medium text-white"
                >
                    {label}
                </label>
            )}
            <div className="relative mb-6 w-full">
                <FontAwesomeIcon {...iconProps} />
                <input
                    ref={inputRef}
                    type={inputType}
                    name={name}
                    className={`p-4 ${iconProps ? "ps-12" : ""
                        } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-primary `}
                    placeholder={placeholder}
                    onChange={(e) => onChangeText && onChangeText(e.target.value)}
                />
            </div>
        </div>
    );
};
