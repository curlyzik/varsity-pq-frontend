import React from "react";
import Link from "next/link";
import { PastQuestionDetails } from "../../types";

const PQItems: React.FC<{ pq: PastQuestionDetails }> = ({ pq }) => {
  return (
    <div
      data-aos="fade-left"
      className={`flex flex-col rounded-md border bg-white p-6 transition-all duration-500 hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset dark:bg-black  ${
        pq?.pq_details![0]?.university_type === "federal"
          ? "border-blue-300 hover:ring-blue-500"
          : pq?.pq_details![0]?.university_type === "state"
          ? "border-orange-300 hover:ring-orange-500"
          : "border-green-300 hover:ring-green-500"
      }`}
    >
      <div>
        <span
          className={` rounded-md px-2 py-1 text-xs font-bold text-gray-600 ${
            pq?.pq_details![0]?.university_type === "federal"
              ? "bg-blue-100"
              : pq?.pq_details![0]?.university_type === "state"
              ? "bg-orange-100"
              : "bg-green-100"
          }`}
        >
          {pq?.pq_details![0]?.university_type}
        </span>
        <h2 className="!mb-1 mt-3 text-2xl font-bold dark:text-white">
          {pq?.pq_details![0]?.course_code}
        </h2>
        <div className="mb-5 flex flex-col gap-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold italic text-black dark:text-gray-400">
              Course Name:
            </span>{" "}
            {pq?.pq_details![0]?.course}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold italic text-black dark:text-gray-400">
              Session:
            </span>{" "}
            {pq?.pq_details![0]?.year}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold italic text-black dark:text-gray-400">
              Semester:
            </span>{" "}
            {pq?.pq_details![0]?.semester}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold italic text-black dark:text-gray-400">
              University:
            </span>{" "}
            {pq?.pq_details![0]?.university}
          </p>
        </div>

        <div className="grid grid-cols-[auto,auto] gap-x-3 lg:flex lg:flex-col lg:gap-y-2">
          <Link href={`${pq?.file}`}>
            <a
              download={`${pq?.pq_details![0]?.course_code}`}
              className={`grid place-items-center rounded-md border !px-1 py-2 text-sm font-bold text-black dark:text-white ${
                pq?.pq_details![0]?.university_type === "federal"
                  ? "border-blue-400 hover:bg-blue-400 hover:text-white"
                  : pq?.pq_details![0]?.university_type === "state"
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
