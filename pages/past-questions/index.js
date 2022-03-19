import React, { useEffect, useState } from "react";
import { MainHeader, PQItems } from "../../components";
import { Input, Spin } from "antd";
import { useGetPastQuestionsQuery } from "../../src/services/pastquestion";

const AllPastQuestions = () => {
  const { data, isFetching } = useGetPastQuestionsQuery();

  const [keyWord, setKeyword] = useState("");

  const filterByKeyword = (keyword) => {
    const filteredData = data?.filter((pq) =>
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

  console.log(pastQuestions);
  return (
    <div>
      <MainHeader />
      <div className="px-8 pt-6 md:!w-[40rem] lg:px-20">
        <span className=" text-xl font-bold">Search Course</span>
        <Input
          placeholder="e.g, CSC 221"
          size="large"
          allowClear
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-6 !pb-10 lg:grid lg:px-20">
        {isFetching ? (
          <Spin />
        ) : (
          pastQuestions?.map((pq) => <PQItems key={pq.id} pq={pq} />)
        )}

        {pastQuestions?.length === 0 && <div>No Past Question</div>}
      </div>
    </div>
  );
};

export default AllPastQuestions;
