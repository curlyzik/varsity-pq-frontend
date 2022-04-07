import { Input, Switch } from "antd";
import React, { FormEvent } from "react";

interface AppHeaderProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string | undefined;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  setKeyword,
  sort,
  setSort,
  placeholder,
}) => {
  return (
    <div className="px-5 lg:mx-10 lg:px-0">
      <div className="flex flex-col-reverse items-center justify-between gap-y-3 rounded-md bg-white px-6 py-4 dark:bg-black lg:flex-row">
        <div className="w-full lg:!w-[28rem]">
          <Input
            placeholder={placeholder}
            onChange={(e) => setKeyword(e.target.value)}
            size="large"
            allowClear={true}
          />
        </div>
        <div className="">
          <ul className="flex items-center justify-center gap-x-5 dark:!text-white lg:!text-lg">
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
