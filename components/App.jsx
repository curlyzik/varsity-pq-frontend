import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUniSearchQuery } from "../src/services/searchServices/uniSearchApi";
import { useGetUniversitiesQuery } from "../src/services/university";
import AppHeader from "./utils/AppHeader";

const App = () => {
  const { data: universities } = useGetUniversitiesQuery();

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
  const uniData = universities?.slice().sort(compare);

  return (
    <div className="bg-[#ECF2F5] pt-6">
      <AppHeader />

      <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-10 pt-6 lg:grid lg:px-20">
        {uniData?.map((university) => (
          <div
            key={university.id}
            data-aos="fade-left"
            className={`cursor-pointer bg-white p-4 ${
              university.type === "federal"
                ? "border border-blue-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-blue-700"
                : university.type === "state"
                ? "border border-orange-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-orange-700"
                : "border border-green-300 transition-all hover:!scale-105 hover:border-0 hover:ring-1 hover:ring-inset hover:ring-green-700"
            }`}
          >
            <div className="flex flex-row">
              <h2 className=" text-lg font-semibold">{university.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
