import React from "react";

const SecButton = ({ link, children, className }) => {
  return (
    <a
      href={link}
      target={"_blank"}
      className={`mt-4 inline-block rounded-md border border-blue-400 px-2 py-2 text-base font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white lg:px-4 lg:text-lg ${className}`}
    >
      {children}
    </a>
  );
};

export default SecButton;
