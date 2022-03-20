import { Input, Switch } from "antd";
import React from "react";
import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";

const AppHeader = ({ setKeyword, sort, setSort, placeholder }) => {
  const { theme, setTheme } = useTheme();
  const handleDarkMode = theme === "dark" ? true : false;

  console.log(theme);

  return (
    <div className="px-5 lg:mx-10 lg:px-0">
      <div className="flex flex-col-reverse items-center justify-between gap-y-3 dark:bg-black rounded-md bg-white px-4 py-4 lg:flex-row">
        <div className="w-full lg:!w-[28rem]">
          <Input
            placeholder={placeholder}
            onChange={(e) => setKeyword(e.target.value)}
            size="large"
            allowClear={true}
          />
        </div>
        <div className="">
          <ul className="flex items-center justify-center gap-x-5 lg:!text-lg dark:!text-white">
            <li onClick={() => setSort("")} className="cursor-pointer">
              All
            </li>
            <li
              onClick={() => setSort("federal")}
              className={`${
                sort === "federal" && "font-semibold text-blue-400"
              } cursor-pointer`}
            >
              Federal
            </li>
            <li
              onClick={() => setSort("private")}
              className={`${
                sort === "private" && "font-semibold text-green-400"
              } cursor-pointer`}
            >
              Private
            </li>
            <li
              onClick={() => setSort("state")}
              className={`${
                sort === "state" && "font-semibold text-orange-400"
              } cursor-pointer`}
            >
              State
            </li>
            <li className="rounded-full bg-black px-2 py-[2px] dark:bg-gray-700">
              <Switch
                className=" "
                checkedChildren={
                  <BsFillMoonFill className=" dark:text-black" />
                }
                unCheckedChildren={<BsFillBrightnessHighFill />}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                checked={handleDarkMode}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
