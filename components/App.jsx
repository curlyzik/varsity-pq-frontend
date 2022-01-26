import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUniSearchQuery } from "../src/services/searchServices/uniSearchApi";
import { useGetUniversitiesQuery } from "../src/services/university";
import AppHeader from "./utils/AppHeader";

const App = () => {
  const { data } = useGetUniversitiesQuery();

  // sort universites alphabetically
  const compare = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };
  const universities = data?.slice().sort(compare);

  return (
    <div className="bg-[#ECF2F5] pt-6">
      <AppHeader />

      <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 lg:grid lg:px-20">
        {universities?.map((university) => (
          <div
            key={university.id}
            data-aos="fade-left"
            className={`cursor-pointer bg-white p-6 ${
              university.type === "federal"
                ? "border border-blue-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-blue-700"
                : university.type === "state"
                ? "border border-orange-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-orange-700"
                : "border border-green-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-green-700"
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
        ))}
      </div>
    </div>
  );
};

export default App;
