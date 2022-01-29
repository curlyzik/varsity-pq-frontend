import React, { useState } from "react";
import { useGetUniversitiesQuery } from "../src/services/university";
import AppHeader from "./utils/AppHeader";
import Item from "./utils/Item";

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
          <Item university={university} key={university.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
