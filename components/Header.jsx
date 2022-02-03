import React from "react";
import Link from "next/link";
import { Btn } from ".";

const Header = () => {
  return (
    <div className="bg-heroBG font-body overflow-hidden py-4 px-4">
      <div className="mx-4 flex grid-cols-[30%,70%] justify-between text-white lg:grid">
        <Link href="/">
          <a>
            <div className="text-3xl font-bold">Vartsity PQ</div>
          </a>
        </Link>
        <ul className="hidden items-center justify-center gap-x-5 text-base lg:flex">
          <li>How it works API</li>
          <li>Feature</li>
          <li>Requests</li>
          <li>Contributors</li>
          <li>On Review</li>
          <li>Collections</li>
          <li>Bookmarks</li>
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
  );
};

export default Header;
