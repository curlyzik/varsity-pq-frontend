import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="px-5 lg:px-10 pt-20 lg:pt-0">
        <div className="flex flex-col lg:grid grid-cols-2 items-center lg:gap-x-3 justify-center  ">
          <div className="flex flex-col gap-y-3">
            <h1 className="capitalize text-5xl leading-[3.75rem] lg:text-[2.75rem] font-medium lg:font-semibold lg:leading-[3.25rem]">
              University biggest storehouse of past questions
            </h1>
            <p className="text-gray-600 text-base">
              Varsity PQ is the all in one storehouse where students from
              various universities could find past questions to different
              courses of their discipline online. Varsity PQ is made up of 300+
              curated past questions from 230+ universites in Nigeria.
            </p>
          </div>
          <div>
            <img src="hero.svg" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
