import React from "react";
import Head from "next/head";
import Link from "next/link";

import { BsArrowRight } from "react-icons/bs";

import { Btn, MainHeader } from "../../components/index";

const AdminRequest = () => {
  return (
    <div>
      <Head>
        <title>Admin/Volunteer Request - Varsity PQ</title>
      </Head>
      <MainHeader />

      <div className="bg-white px-6 pt-14 pb-10 lg:px-0">
        <div className="animate__animated animate__fadeInUp flex w-full flex-col items-center justify-center gap-y-8 gap-x-10 text-center lg:flex-row lg:text-left">
          <img src="/others/admin-req.svg" className="h-[230px]" />
          <div>
            <h1 className="mb-0 text-3xl font-bold lg:text-4xl">
              Volunteer Request
            </h1>
            <p className="mb-4 text-base text-gray-500 lg:w-[600px]">
              You can help Varsity PQ become better by volunteering to add new
              past questions for the course and the institution you currently
              study in. We're happy to have you around! ❤️
            </p>
            <Btn>
              <Link href={"/volunteer/new-volunteer"}>
                <a className="flex items-center justify-center gap-4 rounded-md bg-blue-500 py-2 px-3 text-base text-white transition-all duration-300 hover:bg-blue-600 hover:text-white">
                  Become an Admin/Volunteer
                  <BsArrowRight />
                </a>
              </Link>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRequest;
