import React from "react";
import Link from "next/link";
import { SecButton } from "..";

const Item = ({ university }) => {
  return (
    <div
      data-aos="fade-left"
      className={`flex flex-col rounded-md border dark:bg-black bg-white p-6 transition-all duration-500 hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset  ${
        university.type === "federal"
          ? "border-blue-300 hover:ring-blue-500"
          : university.type === "state"
          ? "border-orange-300 hover:ring-orange-500"
          : "border-green-300 hover:ring-green-500"
      }`}
    >
      <div>
        <span
          className={` px-2 py-1 text-xs font-bold text-gray-600 rounded-md ${
            university.type === "federal"
              ? "bg-blue-100"
              : university.type === "state"
              ? "bg-orange-100"
              : "bg-green-100"
          }`}
        >
          {university.type}
        </span>
        <h2 className="!mt-2 !mb-2 text-xl font-bold dark:text-white">{university.name}</h2>
        <p className="!mb-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="italic text-black dark:text-white font-semibold">Address:</span>{" "}
          {university.address}
        </p>

        <div className="grid grid-cols-[auto,auto] gap-x-3 lg:flex lg:flex-col lg:gap-y-2">
          <Link href={`/university/${university.name}/${university.id}`}>
            <a
              className={`grid place-items-center rounded-md border !px-1 py-2 text-sm font-bold dark:text-white text-black ${
                university.type === "federal"
                  ? "border-blue-400 hover:bg-blue-400 hover:text-white"
                  : university.type === "state"
                  ? "border-orange-400 hover:bg-orange-400 hover:text-white"
                  : "border-green-400 hover:bg-green-400 hover:text-white"
              }`}
            >
              View Details
            </a>
          </Link>
          {/* <a
            className={`grid place-items-center rounded-md border px-1 py-2 text-sm font-bold text-white transition-all duration-300 hover:text-white ${
              university.type === "federal"
                ? "bg-blue-400 hover:bg-blue-600"
                : university.type === "state"
                ? "bg-orange-400 hover:bg-orange-600"
                : "bg-green-400 hover:bg-green-600"
            }`}
          >
            Select Past Question
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Item;
