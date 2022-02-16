import React, { useState } from "react";
import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Btn } from "../index";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative border-b border-b-gray-600 bg-black !text-white">
      <div className="font-body  overflow-hidden bg-[#00044e] bg-opacity-60 py-4 px-4">
        <div className="mx-4 flex items-center justify-between !text-white">
          <div>
            <Link href="/">
              <a>
                <div
                  className="text-3xl font-bold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Vartsity PQ
                </div>
              </a>
            </Link>
          </div>
          <ul className="hidden items-center justify-center gap-x-4 text-base !text-white lg:flex">
            <li>
              <a>How it works</a>
            </li>
            <li>
              <a href="http://varsity-pq.herokuapp.com/" target={"_blank"}>
                API
              </a>
            </li>
            <li>
              <Link href={"/volunteer/volunteer-request"}>
                <a>Admin/Volunteer Request</a>
              </Link>
            </li>
            <li>
              <a>Contributors</a>
            </li>
            <li>
              <a>Past Questions</a>
            </li>
            <li>
              <a>Collections</a>
            </li>
            <li>
              <a>
                <Btn
                  classNames={
                    "border px-2 py-[4px] text-blue-400 border-blue-400"
                  }
                >
                  New Past Question
                </Btn>
              </a>
            </li>
          </ul>
          <div className="lg:hidden">
            {!isOpen && (
              <GiHamburgerMenu
                className="text-3xl text-white"
                onClick={() => setIsOpen(true)}
              />
            )}
            {isOpen && (
              <AiOutlineClose
                className="text-3xl  text-white"
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="absolute inset-0 z-20 mt-16 border-t border-t-gray-500 !text-white lg:hidden">
            <div className="bg-black">
              <div className="w-full bg-[#00044e] bg-opacity-60 py-8 px-4">
                <ul className="flex flex-col items-start justify-center gap-y-7 gap-x-4 text-lg !text-white">
                  <Link href={"/"}>
                    <li
                      className="w-full border-b border-b-gray-400 pb-1 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <a>How it works</a>
                    </li>
                  </Link>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <a href="http://varsity-pq.herokuapp.com/">PI</a>
                  </li>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={"/volunteer/volunteer-request"}>
                      <a>Admin/Volunteer Request</a>
                    </Link>
                  </li>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <a>Contributors</a>
                  </li>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <a>Past Questions</a>
                  </li>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <a>Collections</a>
                  </li>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <a>New Past Question</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
