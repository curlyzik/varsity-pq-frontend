import React from "react";
import Btn from "./utils/Btn";
import Header from "./Header";

const Hero = () => {
  return (
    <div className="bg-heroBG bg-cover bg-no-repeat lg:pt-32">
      {/* <Header /> */}
      <div className="px-5 lg:px-10 pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex lg:flex-row lg:items-center lg:gap-x-8 justify-center">
          <div className="flex flex-col gap-y-4 lg:w-3/4">
            <h1 className="capitalize text-5xl leading-[3.5rem] lg:text-[3.25rem] text-white font-medium lg:font-bold lg:leading-[3.45rem]">
              University biggest storehouse of past questions
            </h1>
            <p className="text-gray-400 text-base">
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
                    "px-5 py-[10px] lg:text-lg text-black shadow-xl text-blue-500"
                  }
                >
                  Github Stars
                </Btn>
              </a>
            </div>
          </div>
          <div className="pt-12 lg:pt-0 lg:w-6/12">
            <img src="book-study-icon-16.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
