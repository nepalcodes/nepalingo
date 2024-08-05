import React from "react";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string;
    iconProps?: FontAwesomeIconProps;
    placeholder?: string;
    error?: string;
    name: string;
    containerStyle?: string;
}
const CustomTextInput = ({
    label,
    iconProps,
    placeholder,
    name,
    className,
    error,
    containerStyle,
    ...props
}: TextInputProps) => {
    return (
        <div className={`flex-1 h-full  ${containerStyle}`}>
            {label && (
                <label
                    htmlFor="input-group-1"
                    className="block mb-1 text-sm font-secondary  text-grayLight"
                >
                    {label}
                </label>
            )}
            <div
                className={`relative flex flex-row items-center px-5  w-full h-full  rounded-lg  bg-grayDark ${error && "border-1 border-primary"}`}
            >
                {iconProps && <FontAwesomeIcon {...iconProps} />}
                <input
                    name={name}
                    className={`p-4 ${iconProps ? "ps-4" : ""} bg-transparent  h-full rounded-lg text-white text-sm  block w-full ${className} focus:outline-none `}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </div>
    );
};
export default CustomTextInput;
