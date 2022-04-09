import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#f5f6fa] px-28 pt-12 font-poppins">
      <div className="pb-36">
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wider text-slate-900">
            Varsity PQ
          </h1>
          <div>
            <ul className="flex items-center justify-between gap-x-10 text-base font-medium lowe">
              <li>
                <a>Browse PQ</a>
              </li>
              <li>
                <a>Browse Universities</a>
              </li>
              <li>
                <a>Become Volunteer</a>
              </li>
              <li className="cursor-pointer rounded-md bg-sky-600 px-9 py-2 transition duration-300 hover:bg-sky-700">
                <a className="font-bold text-white">Sign In</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

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

            <a className="cursor-pointer rounded-md bg-gray-100 px-9 py-3 font-bold text-sky-400 transition duration-300 hover:bg-gray-200 hover:text-sky-600">
              become a volunteer
            </a>
          </div>
        </div>
        <div className=" justify-self-end">
          <img src="varsity-side-image.png" />
        </div>
      </div>

      <div className="mx-auto max-w-[890px] pt-20 text-center">
        <div>
          <h3 className="text-5xl font-bold text-slate-900 md:leading-[3.60rem]">
            Why students choose <span className="text-sky-600">Varsity PQ</span>{" "}
            to source for past questions{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
