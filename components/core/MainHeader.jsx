import React from "react";
import { FiBookOpen, FiGithub } from "react-icons/fi";
import { Btn, TwitterBtn } from "..";
import { useGetGitHubRepoQuery } from "../../src/services/gitHubRepoApi";

const MainHeader = () => {
  const { data } = useGetGitHubRepoQuery();
  const starCount = data?.stargazers_count;
  return (
    <div className="bg-image">
      <div className="flex flex-col p-10 text-white lg:place-items-center lg:gap-y-2">
        <h2 className="mt-6 text-4xl font-bold text-white">Varsity PQ</h2>

        <p className="animate__animated animate__fadeInUp my-2 mb-2 w-10/12 text-left text-base lg:w-7/12">
          Introducing Varsity PQ, the all in one storehouse for past questions.
          Varsity PQ is made up of 300+ curated past questions from over 150+
          universities. Filter by private, federal, state universites, dark
          mode, add new past question, volunteer/admin requests, make the app
          much more amazing! 🤟
        </p>

        <div className="animate__animated animate__fadeInUp flex flex-wrap gap-y-2 gap-x-2 pb-4">
          <Btn>
            <a
              className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-base font-semibold capitalize text-white hover:text-white"
              href="https://varsity-pq-frontend.vercel.app"
            >
              <FiBookOpen className="mr-1 text-lg" />
              Read Blog
            </a>
          </Btn>
          <Btn>
            <a
              className="flex items-center justify-center rounded-md border-2 border-blue-600 px-3 py-[6px] text-base font-semibold capitalize text-white hover:text-gray-200 lg:ml-2"
              href="https://github.com/curlyzik/varsity-pq-frontend"
            >
              <FiGithub className="mr-1 text-lg" />
              <span className="poppins mr-1">{starCount}</span> Github Stars
            </a>
          </Btn>
          <div className="mt-2 lg:ml-1 lg:mt-0 xl:ml-1 xl:mt-0">
            <TwitterBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
