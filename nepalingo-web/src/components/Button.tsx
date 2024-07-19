import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const buttonClasses = `bg-blue-500 hover:md:bg-opacity-80 text-white font-bold py-2 px-4 rounded ${className}`;

  return (
    <button ref={ref} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
