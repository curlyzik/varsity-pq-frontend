import React from "react";
import Ripples from "react-ripples";

const Btn = ({ children, onClick, className }) => {
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
