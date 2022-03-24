import React from "react";
import Link from "next/link";
import { BsLightning } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

import { Features, Btn } from "../index";
import { features } from "../features";
import { useGetGitHubRepoQuery } from "../../src/services/gitHubRepoApi";

const Hero = () => {
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
                300+ curated past questions from 150+ universites in Nigeria.
              </p>
              <div className="!mb-2 flex gap-x-3">
                <Btn>
                  <Link href={"/past-questions"}>
                    <a className="flex items-center justify-center rounded-md bg-blue-400 px-5 py-[10px] text-base text-black hover:text-black lg:text-lg">
                      <span>Search Now</span>
                      <BsLightning className="ml-1" />
                    </a>
                  </Link>
                </Btn>

                <Btn>
                  <a
                    target={"_blank"}
                    href="https://github.com/curlyzik/varsity-pq-frontend"
                    className="flex items-center justify-center rounded-md border border-blue-400 py-[10px] px-5 text-base text-blue-200 lg:text-lg"
                  >
                    <span>Github Stars {starCount}</span>
                    <FiGithub className="ml-1" />
                  </a>
                </Btn>

                <Btn>
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
              <span className="text-gray-600">
                You want to upload a past question?{" "}
                <Link href={"/volunteer/volunteer-request"}>
                  <a className="!text-gray-400 transition-all duration-200 hover:!text-white ">
                    Click here to become a volunteer
                  </a>
                </Link>
              </span>
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
