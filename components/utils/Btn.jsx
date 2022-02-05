import React from "react";
import Ripples from "react-ripples";

const Btn = ({ children, classNames, onClick }) => {
  return (
    <Ripples className={`font-semibold capitalize ${classNames}`} onClick={onClick}>
      {children}
    </Ripples>
  );
};

export default Btn;
