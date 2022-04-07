import React, { useEffect, useState } from "react";
import { AppHeader, MainHeader, PQItems } from "../../components";
import { Input, Spin } from "antd";
import { useGetPastQuestionsQuery } from "../../src/services/pastquestion";

const AllPastQuestions = () => {
  const { data, isLoading } = useGetPastQuestionsQuery();
  const [sort, setSort] = useState("");
  const [keyWord, setKeyword] = useState("");

  // filter data by keyword
  const filterByKeyword = (keyword: string) => {
    const filteredData = data?.filter((pq: any) =>
      pq?.pq_details[0]?.course_code
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
    return filteredData;
  };

  useEffect(() => {
    filterByKeyword(keyWord);
  }, [keyWord]);

  const pastQuestions = filterByKeyword(keyWord);

  // filter university by sort
  const handleUniTypeFiltering = () => {
    if (sort === "federal") {
      return pastQuestions?.filter(
        (pq: any) => pq.pq_details[0].university_type === "federal"
      );
    } else if (sort === "private") {
      return pastQuestions?.filter(
        (pq: any) => pq.pq_details[0].university_type === "private"
      );
    } else if (sort === "state") {
      return pastQuestions?.filter(
        (pq: any) => pq.pq_details[0].university_type === "state"
      );
    } else {
      return pastQuestions;
    }
  };

  const filteredPq = handleUniTypeFiltering();

  return (
    <div className="dark:bg-[#111]">
      <div className="pt-8">
        <div className="px-5 pb-3 text-xl font-bold dark:text-white lg:mx-10 lg:px-0">
          Search Over ({data && data.length}) Availbale Past Questions
        </div>
        <AppHeader
          setKeyword={setKeyword}
          sort={sort}
          setSort={setSort}
          placeholder={"e.g, CSC 213"}
        />
      </div>
      <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 !pb-10 lg:grid lg:px-20">
        {isLoading ? (
          <Spin />
        ) : (
          filteredPq?.map((pq: any) => <PQItems key={pq.id} pq={pq} />)
        )}

        {filteredPq?.length === 0 && (
          <div className="dark:text-white">No Past Question</div>
        )}
      </div>
    </div>
  );
};

export default AllPastQuestions;
