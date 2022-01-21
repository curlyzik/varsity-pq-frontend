import React from "react";
import Btn from "./utils/Btn";
import Features from "./utils/Features";

import {
  FiBookmark,
  FiCloudLightning,
  FiDatabase,
  FiFlag,
  FiFolderPlus,
  FiGithub,
  FiLayers,
  FiMoon,
  FiPackage,
  FiPlay,
  FiRss,
  FiUsers,
} from "react-icons/fi";

const Hero = () => {
  const features = [
    {
      name: "300+ Cheatsheets",
      description:
        "Code house is super huge enough and have more than 300+ cheatsheets",
      icon: <FiPackage className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Category Filter",
      description:
        "Feel free to filter using categories, it can help you find the best one.",
      icon: <FiLayers className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Filter By Source",
      description:
        "You can filter cheatsheets by source, eg: medium.com or overapi.com",
      icon: <FiRss className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Bookmark Favorites",
      description: "You can bookmark cheatsheets for you to have a look later.",
      icon: <FiBookmark className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Request Features",
      description:
        "You can help us become code house better by adding your feature requests.",
      icon: <FiCloudLightning className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Contributors Page",
      description:
        "We proudly show our contributors, there is a dedicated contributors page.",
      icon: <FiUsers className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Add new Cheatsheet",
      description:
        "You can add a new cheatsheet to code house, without even leaving the browser",
      icon: <FiFolderPlus className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Report Cheatsheet",
      description: "You can report a cheatsheet if you find it suspicious. ",
      icon: <FiFlag className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "GraphQL Playground",
      description: "A dedicated Graphql playground to access code house API",
      icon: <FiDatabase className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
    {
      name: "Dark Mode",
      description: "Coders love dark mode, so you can enjoy it here too.",
      icon: <FiMoon className="text-2xl lg:text-4xl xl:text-4xl" />,
    },
  ];

  return (
    <div className="bg-heroBG bg-cover bg-no-repeat lg:pt-32">
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
              curated past questions from 170 universites in Nigeria.
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

      <div className="bg-[#0f0c2991] border border-blue-400 lg:px-10 px-5 mx-5 lg:mx-10 py-9 mt-20">
        <div className="flex flex-col gap-y-10 lg:grid-cols-5 lg:gap-y-8 lg:gap-x-5 justify-center items-center">
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
