import React, { useState } from "react";
import { AppHeader, Btn, Item, Loader, InfiniteScrolling } from ".";
import { useGetUniversitiesQuery } from "../src/services/university";

const App = () => {
  const { data, isLoading } = useGetUniversitiesQuery();
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [count, setCount] = useState(20);

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
      {isLoading ? (
        <div className="grid place-items-center p-8">
          <Loader />
        </div>
      ) : !keyword ? (
        <div>
          <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 lg:grid lg:px-20">
            {orderBy?.slice(0, keyword ? 25 : count).map((university) => (
              <Item university={university} key={university.id} />
            ))}
          </div>
          <div className="grid place-items-center">
            <Btn classNames={"my-12 cursor-pointer"}>
              <div
                onClick={() => setCount(count + 20)}
                className="bg-blue-400 px-5 py-[10px] text-base font-semibold capitalize text-black lg:text-lg "
              >
                Load More
              </div>
            </Btn>
          </div>
        </div>
      ) : (
        <InfiniteScrolling
          next={() => {
            setCount(count + 10);
          }}
          count={count}
          data={orderBy}
        >
          <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 lg:grid lg:px-20">
            {orderBy?.slice(0, count).map((university) => (
              <Item university={university} key={university.id} />
            ))}
          </div>
        </InfiniteScrolling>
      )}
    </div>
  );
};

export default App;
