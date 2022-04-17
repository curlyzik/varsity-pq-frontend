import React from "react";

const SectionTitle: React.FC = ({ children }) => {
  return (
    <div className="mx-auto max-w-[890px] pt-20 text-center">
      <h3 className="text-5xl font-bold text-slate-900 md:leading-[3.60rem]">
        {children}
      </h3>
    </div>
  );
};

export default SectionTitle;
