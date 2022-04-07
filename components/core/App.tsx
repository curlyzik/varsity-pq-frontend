import React, { useEffect, useState } from "react";
import { AppHeader, Btn, Item, InfiniteScrolling } from "../index";
import { useGetUniversitiesQuery } from "../../src/services/university";
import { Spin } from "antd";

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

  const filteredUniversity = () => {
    const filteredData = universities?.filter((university) =>
      university.name.toLowerCase().includes(keyword.toLowerCase())
    );
    return filteredData;
  };

  useEffect(() => {
    filteredUniversity();
  }, [keyword]);

  // filter university by sort
  const handleUniTypeFiltering = () => {
    if (sort === "federal") {
      return filteredUniversity()?.filter(
        (university) => university.type === "federal"
      );
    } else if (sort === "private") {
      return filteredUniversity()?.filter(
        (university) => university.type === "private"
      );
    } else if (sort === "state") {
      return filteredUniversity()?.filter(
        (university) => university.type === "state"
      );
    } else {
      return filteredUniversity();
    }
  };

  const orderBy = handleUniTypeFiltering();

  return (
    <div className="bg-[#ECF2F5] pt-8 dark:bg-[#111]">
      <AppHeader
        setKeyword={setKeyword}
        sort={sort}
        setSort={setSort}
        placeholder={data && `search over ${data?.length} universities`}
      />
      {isLoading ? (
        <div className="grid place-items-center p-8">
          <Spin />
        </div>
      ) : !keyword ? (
        <div>
          <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 !pb-8 lg:grid lg:px-20">
            {orderBy?.slice(0, keyword ? 25 : count).map((university) => (
              <Item university={university} key={university.id} />
            ))}
          </div>
          <div className="grid place-items-center !pb-10">
            <Btn classNames={"my-12 cursor-pointer"}>
              <div
                onClick={() => setCount(count + 20)}
                className="bg-blue-400 px-5 py-[10px] text-base font-semibold capitalize text-black lg:text-lg"
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
          <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 !pb-8 lg:grid lg:px-20">
            {orderBy?.slice(0, count).map((university) => (
              <Item university={university} key={university.id} />
            ))}
            {orderBy?.length === 0 && (
              <div className=" dark:text-white">No results found</div>
            )}
          </div>
        </InfiniteScrolling>
      )}
    </div>
  );
};

export default App;
