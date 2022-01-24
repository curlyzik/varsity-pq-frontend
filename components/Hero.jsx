import React from "react";
import { features } from "../helpers/features";
import Btn from "./utils/Btn";
import Features from "./utils/Features";

const Hero = () => {
  return (
    <div className="bg-heroBG bg-cover bg-no-repeat lg:pt-32 pb-12">
      <div className="px-5 lg:px-10 pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex lg:flex-row lg:items-center lg:gap-x-8 justify-center">
          <div className="flex flex-col gap-y-4 lg:w-3/4 animate__animated animate__fadeInLeft">
            <h1 className="capitalize text-5xl leading-[3.5rem] lg:text-[3.25rem] text-white font-medium lg:font-bold lg:leading-[3.45rem]">
              University biggest storehouse of past questions
            </h1>
            <p className="text-gray-400 text-base">
              Varsity PQ is the all in one storehouse where students from
              various universities could find past questions to different
              courses of their discipline online. Varsity PQ is made up of 300+
              curated past questions from 170 universites in Nigeria.
            </p>
            <div className="flex gap-x-3">
              <a>
                <Btn
                  classNames={
                    "px-5 py-[10px] text-base lg:text-lg text-black bg-blue-400"
                  }
                >
                  Search Now
                </Btn>
              </a>
              <a>
                <Btn
                  classNames={
                    "px-5 py-[10px] text-base lg:text-lg text-black shadow-xl text-blue-500"
                  }
                >
                  Github Stars
                </Btn>
              </a>
            </div>
          </div>
          <div className="pt-12 lg:pt-0 lg:w-6/12 animate__animated animate__fadeInRight">
            <img src="book-study-icon-16.png" />
          </div>
        </div>
      </div>

      <div className="bg-[#0e0b24e3] border border-blue-400 lg:px-10 px-5 mx-5 lg:mx-10 py-9 lg:py-16 mt-20">
        <div className="flex flex-col gap-y-10 lg:grid lg:grid-cols-5 lg:gap-y-16 lg:gap-x-5 justify-center items-center">
          {features.map((feature, index) => (
            <Features
              icon={feature.icon}
              name={feature.name}
              description={feature.description}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
