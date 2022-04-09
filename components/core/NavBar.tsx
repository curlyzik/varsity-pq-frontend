import { Switch } from "antd";
import React, { useState } from "react";
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../src/app/store";

const NavBar: React.FC = () => {
  const router = useRouter();

  const { auth } = useSelector((state: RootState) => state.persistedReducer);

  const { theme, setTheme } = useTheme();
  const handleDarkMode = theme === "dark" ? true : false;

  return (
    <div className="bg-[#f5f6fa] px-28 pb-36 pt-12 font-poppins">
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wider text-slate-900">
          Varsity PQ
        </h1>
        <div>
          <ul className="flex items-center justify-between gap-x-6 text-base font-medium">
            <li>
              <a>API</a>
            </li>
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
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
