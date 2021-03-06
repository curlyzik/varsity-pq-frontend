import React from "react";
import Link from "next/link";
import { BsLightning } from "react-icons/bs";
import { BiUserCheck } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";

import { Features, Btn } from "../index";
import { features } from "../features";
import { useGetGitHubRepoQuery } from "../../src/services/gitHubRepoApi";

const Hero: React.FC = () => {
  const { data } = useGetGitHubRepoQuery();
  const starCount = data?.stargazers_count;

  return (
    <div className="bg-black">
      <div className="bg-imge overflow-hidden bg-[#00044e] bg-opacity-60 bg-cover bg-no-repeat pb-12 font-body dark:bg-black lg:pt-32">
        <div className="px-5 pt-20 lg:px-10 lg:pt-0">
          <div className="flex flex-col justify-center lg:flex lg:flex-row lg:items-center lg:gap-x-8">
            <div className="animate__animated animate__fadeInLeft flex flex-col gap-y-4 lg:w-3/4">
              <h1 className="text-5xl font-bold capitalize leading-[3.5rem] text-white lg:text-[3.25rem] lg:leading-[3.45rem]">
                University biggest storehouse of past questions
              </h1>
              <p className="text-base text-gray-400">
                Varsity PQ is the all in one storehouse where students from
                various universities could find past questions to different
                courses of their discipline online. Varsity PQ is made up of
                300+ curated past questions from 160+ universites in Nigeria.
              </p>
              <div className="!mb-2 flex gap-x-3">
                <Btn>
                  <Link href={"/past-questions"}>
                    <a className="flex items-center justify-center rounded-md bg-blue-500 px-3 py-[10px] text-base text-white hover:text-black lg:px-5 lg:text-lg">
                      <span>Search Now</span>
                      <BsLightning className="ml-1" />
                    </a>
                  </Link>
                </Btn>

                <Btn>
                  <Link href="/volunteer/volunteer-request">
                    <a className=" flex items-center justify-center rounded-md border border-blue-400 bg-blue-400 py-[10px] px-5 text-base text-black lg:text-lg">
                      <span>Become a volunteer</span>
                      <BiUserCheck className="ml-1 text-xl" />
                    </a>
                  </Link>
                </Btn>

                <Btn className="hidden md:block">
                  <a
                    target={"_blank"}
                    href="https://github.com/curlyzik/varsity-pq-frontend"
                    className="flex items-center justify-center rounded-md border border-blue-400 py-[10px] px-5 text-base text-blue-200 lg:text-lg"
                  >
                    <span>Github Stars {starCount}</span>
                    <FiGithub className="ml-1" />
                  </a>
                </Btn>
              </div>

              <Btn className={"block md:hidden"}>
                <a
                  target={"_blank"}
                  href="https://github.com/curlyzik/varsity-pq-frontend"
                  className="flex items-center justify-center rounded-md border border-blue-400 py-[10px] px-5 text-base text-blue-200 lg:text-lg"
                >
                  <span>Github Stars {starCount}</span>
                  <FiGithub className="ml-1" />
                </a>
              </Btn>
              {/* </div> */}
            </div>
            <div className="animate__animated animate__fadeInRight pt-14 lg:w-6/12 lg:pt-0">
              <img src="varsity-side-image.png" />
            </div>
          </div>
        </div>

        <div className="mx-5 mt-20 rounded-md border border-blue-400 bg-[#000] bg-opacity-30 px-5 py-9 dark:border-gray-400 dark:bg-[#111] lg:mx-10 lg:px-10 lg:py-16">
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
    </div>
  );
};

export default Hero;
