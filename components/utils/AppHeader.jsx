import React from "react";
import { SearchBar } from "../Search";

const AppHeader = ({ setKeyword }) => {
  return (
    <div className="lg:mx-10">
      <div className="flex items-center justify-between bg-white px-4 py-4">
        <SearchBar setKeyword={setKeyword} />
        <div className="">
          <ul className="flex items-center justify-center gap-x-5 !text-lg">
            <li>State</li>
            <li>Private</li>
            <li>Federal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
