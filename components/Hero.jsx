import React from "react";

const Hero = () => {
  return (
    <div className="grid grid-cols-2 items-center justify-center  ">
      <div>
        <h1 className="capitalize text-4xl">
          Nigeria biggest storehouse of past questions across Higher Institution
        </h1>
      </div>
      <div>
        <img src="hero.svg" className="w-full" />
      </div>
    </div>
  );
};

export default Hero;
