import React from "react";
import { SearchBar } from "../Search";

const AppHeader = ({ setKeyword, sort, setSort }) => {
  return (
    <div className="lg:mx-10 px-5 lg:px-0">
      <div className="flex lg:flex-row flex-col-reverse items-center justify-between bg-white px-4 py-4">
        <SearchBar setKeyword={setKeyword} />
        <div className="">
          <ul className="flex items-center justify-center gap-x-5 !text-lg">
            <li onClick={() => setSort("federal")}>Federal</li>
            <li onClick={() => setSort("private")}>Private</li>
            <li onClick={() => setSort("state")}>State</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
