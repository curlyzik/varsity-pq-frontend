import React from "react";
import Ripples from "react-ripples";

const Btn = ({ children, classNames }) => {
  return (
    <Ripples className={`font-semibold capitalize ${classNames}`}>
      {children}
    </Ripples>
  );
};

export default Btn;
