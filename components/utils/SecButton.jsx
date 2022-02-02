import React from "react";

const SecButton = ({ link, children }) => {
  return (
    <a
      href={link}
      target={"_blank"}
      className="mt-4 inline-block border border-blue-400 px-4 py-2 text-lg font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
    >
      {children}
    </a>
  );
};

export default SecButton;
