import React from "react";
import Head from "next/head";

import { Btn, MainHeader } from "../../components/index";
import { BsArrowRight } from "react-icons/bs";

const AdminRequest = () => {
  return (
    <div>
      <Head>
        <title>Admin/Volunteer Request - Varsity PQ</title>
      </Head>
      <MainHeader />

      <div className="bg-white pb-10 p-14">
        <div className="animate__animated animate__fadeInUp flex w-full flex-col items-center justify-center gap-x-10 lg:flex-row">
          <img src="/others/admin-req.svg" className="h-[230px]" />
          <div>
            <h1 className="text-4xl font-bold">Admin/ Volunteer Request</h1>
            <p className=" mb-3">
              You can help Varsity PQ become better by volunteering to add new
              past questions.
            </p>
            <Btn>
              <a className="flex items-center justify-center gap-4 rounded-md bg-blue-500 py-2 px-3 text-base text-white transition-all duration-300 hover:bg-blue-600 hover:text-white">
                Become an Admin/Volunteer
                <BsArrowRight />
              </a>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRequest;
