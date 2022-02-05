import React from "react";
import Link from "next/link";
import { Btn } from "../index";

const Header = () => {
  return (
    <div className="border-b border-b-gray-600 bg-black">
      <div className="font-body overflow-hidden bg-[#00044e] bg-opacity-60 py-4 px-4">
        <div className="mx-4 flex items-center justify-between text-white">
          <Link href="/">
            <a>
              <div className="text-3xl font-bold">Vartsity PQ</div>
            </a>
          </Link>
          <ul className="hidden items-center justify-center gap-x-4 text-base lg:flex">
            <li>
              <a>How it works</a>
            </li>
            <li>
              <a>API</a>
            </li>
            <li>
              <a>Admin/Volunteer Request</a>
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
        </div>
      </div>
    </div>
  );
};

export default Header;
