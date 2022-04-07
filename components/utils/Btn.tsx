import React from "react";
import Ripples from "react-ripples";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  className?: string;
}

const Btn: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <div
      className={`cursor-pointer overflow-hidden font-semibold capitalize ${className}`}
      onClick={onClick}
    >
      <Ripples>{children}</Ripples>
    </div>
  );
};

export default Btn;
