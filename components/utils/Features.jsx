import React from "react";

const Features = ({ icon, name, description }) => {
  return (
    <div
      className="flex flex-col flex-wrap justify-center gap-y-2 text-center items-center"
      data-aos="fade-left"
    >
      <div className=" bg-style p-6 border-style mb-2">{icon}</div>
      <div className="text-white font-bold text-lg lg:text-xl">{name}</div>
      <div className="text-gray-300 text-base">{description}</div>
    </div>
  );
};

export default Features;
