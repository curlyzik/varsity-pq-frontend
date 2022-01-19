import React from "react";
import Ripples from "react-ripples";
import Btn from "./utils/Btn";

const Hero = () => {
  return (
    <div className="">
      <div className="px-5 lg:px-10 pt-20 lg:pt-0">
        <div className="flex flex-col lg:grid grid-cols-2 lg:items-center lg:gap-x-3 justify-center  ">
          <div className="flex flex-col gap-y-4">
            <h1 className="capitalize text-5xl leading-[3.5rem] lg:text-[2.85rem] font-medium lg:font-semibold lg:leading-[3.35rem]">
              University biggest storehouse of past questions
            </h1>
            <p className="text-gray-600 text-base">
              Varsity PQ is the all in one storehouse where students from
              various universities could find past questions to different
              courses of their discipline online. Varsity PQ is made up of 300+
              curated past questions from 230+ universites in Nigeria.
            </p>
            <div className="flex gap-x-3">
              <a>
                <Btn
                  classNames={
                    "px-5 py-[10px] lg:text-lg text-black bg-blue-400"
                  }
                >
                  Search Now
                </Btn>
              </a>
              <a>
                <Btn
                  classNames={
                    "px-5 py-[10px] lg:text-lg text-black shadow-lg text-blue-500"
                  }
                >
                  Github Stars
                </Btn>
              </a>
            </div>
          </div>
          <div className="pt-3 lg:pt-0">
            <img src="hero.svg" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
