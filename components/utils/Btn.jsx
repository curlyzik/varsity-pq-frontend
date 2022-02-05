import React from "react";
import Ripples from "react-ripples";

const Btn = ({ children, onClick, classNames }) => {
  return (
    <div className={`font-semibold overflow-hidden cursor-pointer capitalize ${classNames}`} onClick={onClick}>
      <Ripples>{children}</Ripples>
    </div>
  );
};

export default Btn;