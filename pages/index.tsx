import { NextPage } from "next";
import { BsBook } from "react-icons/bs";
import { App, Hero } from "../components/index";

const Home: NextPage = () => {
  return (
    <div className="bg-[#f5f6fa] px-28 font-poppins">
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

      <div className="flex flex-col gap-y-12 pb-36">
        <div className="mx-auto max-w-[890px] pt-20 text-center">
          <h3 className="text-5xl font-bold text-slate-900 md:leading-[3.60rem]">
            Why students choose <span className="text-sky-600">Varsity PQ</span>{" "}
            to source for past questions{" "}
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-x-9">
          <div className="flex flex-col gap-y-7">
            <div>
              <BsBook className="text-4xl text-sky-600" />
            </div>
            <div className="text-xl font-medium">300+ Past Questions</div>
            <div className=" text-base leading-7 text-slate-600">
              Students could find over 300+ past questions to different courses
              of their discipline online.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
