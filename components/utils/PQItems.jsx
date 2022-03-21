import React from "react";
import Link from "next/link";

const PQItems = ({ pq }) => {
  return (
    <div
      data-aos="fade-left"
      className={`flex flex-col rounded-md border bg-white p-6 transition-all duration-500 hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset dark:bg-black  ${
        pq?.pq_details[0]?.university_type === "federal"
          ? "border-blue-300 hover:ring-blue-500"
          : pq?.pq_details[0]?.university_type === "state"
          ? "border-orange-300 hover:ring-orange-500"
          : "border-green-300 hover:ring-green-500"
      }`}
    >
      <div>
        <span
          className={` rounded-md px-2 py-1 text-xs font-bold text-gray-600 ${
            pq?.pq_details[0]?.university_type === "federal"
              ? "bg-blue-100"
              : pq?.pq_details[0]?.university_type === "state"
              ? "bg-orange-100"
              : "bg-green-100"
          }`}
        >
          {pq?.pq_details[0]?.university_type}
        </span>
        <h2 className="!mt-3 !mb-2 text-xl font-bold dark:text-white">
          {pq?.pq_details[0]?.course_code}
        </h2>
        <p className="!mb-3 text-sm text-gray-600">
          <span className="font-semibold italic text-black dark:text-white">
            University:
          </span>{" "}
          {pq?.pq_details[0]?.university}
        </p>

        <div className="grid grid-cols-[auto,auto] gap-x-3 lg:flex lg:flex-col lg:gap-y-2">
          <Link href={`${pq?.file}`}>
            <a
              download={`${pq?.pq_details[0]?.course_code}`}
              className={`grid place-items-center rounded-md border !px-1 py-2 text-sm font-bold text-black dark:text-white ${
                pq?.pq_details[0]?.university_type === "federal"
                  ? "border-blue-400 hover:bg-blue-400 hover:text-white"
                  : pq?.pq_details[0]?.university_type === "state"
                  ? "border-orange-400 hover:bg-orange-400 hover:text-white"
                  : "border-green-400 hover:bg-green-400 hover:text-white"
              }`}
            >
              Download
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PQItems;
