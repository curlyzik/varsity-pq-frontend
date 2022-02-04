import React from "react";
import Link from "next/link";

const Item = ({ university }) => {
  return (
    <Link
      href={`/university/${university.name}/${university.id}`}
      key={university.id}
    >
      <div
        data-aos="fade-left"
        className={`cursor-pointer bg-white p-6 rounded-md ${
          university.type === "federal"
            ? "border-2 border-blue-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-blue-700"
            : university.type === "state"
            ? "border-2 border-orange-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-orange-700"
            : "border-2 border-green-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-green-700"
        }`}
      >
        <div>
          <span
            className={` px-2 py-1 text-xs font-bold text-gray-600 ${
              university.type === "federal"
                ? "bg-blue-100"
                : university.type === "state"
                ? "bg-orange-100"
                : "bg-green-100"
            }`}
          >
            {university.type}
          </span>
          <h2 className="mt-2 mb-2 text-xl font-bold">{university.name}</h2>
          <p className="text-sm text-gray-600">
            <span className="italic text-black">Address:</span>{" "}
            {university.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
