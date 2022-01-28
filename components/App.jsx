import axios from "axios";
import React, { useState } from "react";
import { useGetUniversitiesQuery } from "../src/services/university";
import AppHeader from "./utils/AppHeader";

const App = () => {
  const { data } = useGetUniversitiesQuery();
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");

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

  // filter university by keyword search
  const filteredUniversity = universities?.filter((university) => {
    if (keyword === "") {
      return universities;
    } else {
      return university.name.toLowerCase().includes(keyword);
    }
  });

  // filter university by sort
  const handleUniTypeFiltering = () => {
    if (sort === "federal") {
      return filteredUniversity?.filter(
        (university) => university.type === "federal"
      );
    } else if (sort === "private") {
      return filteredUniversity?.filter(
        (university) => university.type === "private"
      );
    } else if (sort === "state") {
      return filteredUniversity?.filter(
        (university) => university.type === "state"
      );
    } else {
      return filteredUniversity;
    }
  };

  const orderBy = handleUniTypeFiltering();

  return (
    <div className="bg-[#ECF2F5] pt-6">
      <AppHeader setKeyword={setKeyword} sort={sort} setSort={setSort} />

      <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 lg:grid lg:px-20">
        {orderBy?.map((university) => (
          <div
            key={university.id}
            data-aos="fade-left"
            className={`cursor-pointer bg-white p-6 ${
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
        ))}
      </div>
    </div>
  );
};

export default App;
