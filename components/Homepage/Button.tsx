import React from "react";

const Button: React.FC<{ className: string }> = ({ children, className }) => {
  return (
    <button
      className={`cursor-pointer rounded-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
