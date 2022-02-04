import React from "react";
import { Features, Btn } from ".";
import { features } from "../helpers/features";

const Hero = () => {
  return (
    <div className="bg-image font-body overflow-hidden bg-cover bg-no-repeat pb-12 lg:pt-32">
      <div className="px-5 pt-20 lg:px-10 lg:pt-0">
        <div className="flex flex-col justify-center lg:flex lg:flex-row lg:items-center lg:gap-x-8">
          <div className="animate__animated animate__fadeInLeft flex flex-col gap-y-4 lg:w-3/4">
            <h1 className="text-5xl font-bold capitalize leading-[3.5rem] text-white lg:text-[3.25rem] lg:leading-[3.45rem]">
              University biggest storehouse of past questions
            </h1>
            <p className="text-base text-gray-400">
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
          <div className="animate__animated animate__fadeInRight pt-12 lg:w-6/12 lg:pt-0">
            <img src="book-study-icon-16.png" />
          </div>
        </div>
      </div>

      <div className="mx-5 mt-20 border border-blue-400 bg-[#000] bg-opacity-30 px-5 py-9 lg:mx-10 lg:px-10 lg:py-16">
        <div className="flex flex-col items-center justify-center gap-y-10 lg:grid lg:grid-cols-5 lg:gap-y-16 lg:gap-x-5">
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
