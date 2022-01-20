import React from "react";
import Btn from "./utils/Btn";

const Header = () => {
  return (
    <div className="bg-heroBG shadow-2xl ">
      <div className="backdrop-filter backdrop-blur-3xl bg-opacity-70 bg-[#ffffff20] flex justify-between px-4 py-3 border-b border-gray-600 items-center text-white">
        <div className="">
          <div className="text-3xl font-bold">Vartsity PQ</div>
        </div>
        <div className="hidden lg:block">
          <ul className="flex space-x-5 items-center text-base font-bold">
            <li>How it works API</li>
            <li>Feature</li>
            <li>Requests</li>
            <li>Contributors</li>
            <li>On Review</li>
            <li>Collections</li>
            <li>Bookmarks</li>
            <li></li>
            <a>
              <Btn
                classNames={
                  "border px-2 py-[4px] text-blue-400 border-blue-400"
                }
              >
                New Past Question
              </Btn>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
