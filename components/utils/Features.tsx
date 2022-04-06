import React from "react";

const Features = ({ icon, name, description }) => {
  return (
    <div
      className="flex flex-col flex-wrap items-center justify-center gap-y-2 text-center"
      data-aos="fade-left"
    >
      <div className="bg-style border-style mb-2 p-6">{icon}</div>
      <div className="text-lg font-bold text-white lg:text-xl">{name}</div>
      <div className="text-base text-gray-300">{description}</div>
    </div>
  );
};

export default Features;
