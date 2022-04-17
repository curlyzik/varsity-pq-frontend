import React from "react";

const Hero = () => {
  return (
    <div className="grid grid-cols-2 items-center pb-36">
      <div className="flex flex-col gap-y-10">
        <h1 className="text-5xl font-semibold capitalize leading-[3.5rem] text-slate-900 md:text-6xl md:leading-[4.60rem]">
          University biggest storehouse of past questions
        </h1>
        <p className="text-lg leading-9 text-slate-600">
          Varsity PQ is the all in one storehouse where students from various
          universities could find past questions to different courses of their
          discipline online.
        </p>
        <div className="flex gap-x-3">
          <a className="cursor-pointer rounded-md bg-sky-600 px-9 py-3 font-bold text-white transition duration-300 hover:bg-sky-700">
            Browse PQ
          </a>

          <a className="cursor-pointer rounded-md bg-gray-100 px-9 py-3 font-bold text-sky-900 transition duration-300 hover:bg-gray-200 hover:text-sky-600">
            become a volunteer
          </a>
        </div>
      </div>
      <div className=" justify-self-end">
        <img src="varsity-side-image.png" />
      </div>
    </div>
  );
};

export default Hero;
