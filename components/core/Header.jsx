import React, { useEffect, useState } from "react";
import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Btn } from "../index";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { Switch } from "antd";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { auth } = useSelector((state) => state.persistedReducer);

  const { theme, setTheme } = useTheme();
  const handleDarkMode = theme === "dark" ? true : false;

  return (
    <div className="relative border-b border-b-gray-600 bg-black">
      <div className="overflow-hidden bg-[#00044e] bg-opacity-60 py-4 px-4 font-body dark:bg-black">
        <div className="mx-4 flex items-center justify-between !text-white">
          <div>
            <Link href="/">
              <a className="!text-white">
                <div
                  className="text-3xl font-bold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Varsity PQ
                </div>
              </a>
            </Link>
          </div>
          <ul className="hidden items-center justify-center gap-x-4 text-base lg:flex">
            <li>
              <Link href={"/"}>
                <a className="!text-white">How it works</a>
              </Link>
            </li>
            <li>
              <a
                className="!text-white"
                href="http://varsity-pq.herokuapp.com/"
                target={"_blank"}
              >
                API
              </a>
            </li>
            <li>
              <Link href={"/past-questions"}>
                <a className="!text-white">Past Questions</a>
              </Link>
            </li>
            <li>
              <Link href={"/app"}>
                <a className="!text-white">Browse Universites</a>
              </Link>
            </li>
            <li>
              <Link href={"/volunteer/volunteer-request"}>
                <a className="!text-white">Volunteer Request</a>
              </Link>
            </li>
            <li>
              <a className="!text-white">Contributors</a>
            </li>
            <li>
              <a className="!text-white">Volunteers</a>
            </li>

            <li>
              {auth.accessToken ? (
                <Btn>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="rounded-md border border-blue-400 px-3 py-1 !text-white transition-all duration-300 hover:border-blue-800"
                  >
                    Go to Dashboard
                  </button>
                </Btn>
              ) : (
                <Btn>
                  <Link href={"/login"}>
                    <a className="rounded-md border border-blue-400 px-3 py-1 !text-white transition-all duration-300 hover:border-blue-800">
                      Sign In
                    </a>
                  </Link>
                </Btn>
              )}
            </li>

            <li className="rounded-full bg-[#cfcece] px-2 py-[3px] dark:bg-gray-700">
              <Switch
                className=" "
                checkedChildren={
                  <BsFillMoonFill className=" dark:text-black" />
                }
                unCheckedChildren={
                  <BsFillBrightnessHighFill className=" text-black" />
                }
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                checked={handleDarkMode}
              />
            </li>
          </ul>
          <div className="flex flex-row-reverse gap-x-4 lg:hidden">
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

            <div className="rounded-full bg-[#cfcece] px-2 py-[3px] dark:bg-gray-700">
              <Switch
                className=" "
                checkedChildren={
                  <BsFillMoonFill className=" dark:text-black" />
                }
                unCheckedChildren={
                  <BsFillBrightnessHighFill className=" text-black" />
                }
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                checked={handleDarkMode}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute inset-0 z-20 mt-16 border-t border-t-gray-500 !text-white lg:hidden">
            <div className="bg-black">
              <div className="w-full bg-[#00044e] bg-opacity-60 py-8 px-4 dark:bg-black">
                <ul className="flex flex-col items-start justify-center gap-y-7 gap-x-4 text-lg">
                  <Link href={"/"}>
                    <li
                      className="w-full border-b border-b-gray-400 pb-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="!text-white">How it works</a>
                    </li>
                  </Link>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <a
                      className="!text-white"
                      target={"_blank"}
                      href="https://github.com/curlyzik/varsity-pq-backend"
                    >
                      API
                    </a>
                  </li>
                  <Link href={"/past-questions"}>
                    <li
                      className="w-full border-b border-b-gray-400 pb-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="!text-white">Past Questions</a>
                    </li>
                  </Link>
                  <Link href={"/app"}>
                    <li
                      className="w-full border-b border-b-gray-400 pb-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="!text-white">Browse Universites</a>
                    </li>
                  </Link>
                  <Link href={"/volunteer/volunteer-request"}>
                    <li
                      className="w-full border-b border-b-gray-400 pb-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <a className="!text-white">Volunteer Request</a>
                    </li>
                  </Link>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <a className="!text-white">Contributors</a>
                  </li>
                  <li
                    className="w-full border-b border-b-gray-400 pb-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <a className="!text-white">Volunteers</a>
                  </li>

                  <li>
                    {auth.accessToken ? (
                      <Btn>
                        <button
                          onClick={() => {
                            router.push("/dashboard");
                            setIsOpen(false);
                          }}
                          className="rounded-md border border-blue-400 px-3 py-1 !text-white transition-all duration-300 hover:border-blue-800"
                        >
                          Go to Dashboard
                        </button>
                      </Btn>
                    ) : (
                      <Btn>
                        <Link href={"/login"}>
                          <a
                            onClick={() => setIsOpen(false)}
                            className="rounded-md border border-blue-400 px-3 py-1 !text-white transition-all duration-300 hover:border-blue-800"
                          >
                            Sign In
                          </a>
                        </Link>
                      </Btn>
                    )}
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
