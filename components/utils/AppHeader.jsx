import React from "react";
import { SearchBar } from "../Search";
import Btn from "./Btn";

const AppHeader = ({ setKeyword, sort, setSort }) => {
  return (
    <div className="px-5 lg:mx-10 lg:px-0">
      <div className="flex flex-col-reverse items-center justify-between gap-y-3 bg-white px-4 py-4 lg:flex-row">
        <SearchBar setKeyword={setKeyword} />
        <div className="">
          <ul className="flex items-center justify-center gap-x-5 lg:!text-lg">
            <Btn classNames={"cursor-pointer"}>
              <li onClick={() => setSort("all")} className="">
                All
              </li>
            </Btn>
            <li
              onClick={() => setSort("federal")}
              className={`${
                sort === "federal" && "text-blue-400 font-semibold"
              } cursor-pointer`}
            >
              Federal
            </li>
            <li
              onClick={() => setSort("private")}
              className={`${
                sort === "private" && "text-green-400 font-semibold"
              } cursor-pointer`}
            >
              Private
            </li>
            <li
              onClick={() => setSort("state")}
              className={`${
                sort === "state" && "text-orange-400 font-semibold"
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
