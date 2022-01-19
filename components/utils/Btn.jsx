import React from "react";
import Ripples from "react-ripples";

const Btn = ({ children, classNames }) => {
  return (
    <Ripples className={`capitalize font-semibold ${classNames}`}>
      {children}
    </Ripples>
  );
};

export default Btn;
