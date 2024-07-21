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
                    className="block mb-2 text-sm font-medium text-white"
                >
                    {label}
                </label>
            )}
            <div className="relative  w-full h-full  rounded-lg  bg-grayDark">
                {iconProps && <FontAwesomeIcon {...iconProps} />}
                <input
                    name={name}
                    className={`p-4 ${iconProps ? "ps-12" : ""} bg-transparent h-full rounded-lg text-white text-sm  block w-full ${className}`}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        </div>
    );
};
export default CustomTextInput;
