import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  smallHeight?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, smallHeight = false, children, ...rest } = props;

  const heightClass = smallHeight ? "h-auto" : "h-full";
  const buttonClasses = `${heightClass} bg-primary text-white font-primary font-bold m-0 py-2 px-4 rounded-lg ${className}`;

  return (
    <button ref={ref} className={buttonClasses} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
