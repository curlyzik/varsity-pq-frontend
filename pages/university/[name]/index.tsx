import { Input, Spin } from "antd";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PQItems } from "../../../components";
import { useGetPastQuestionsQuery } from "../../../src/services/pastquestion";

const UniPastQuestions: NextPage = () => {
  const { data, isLoading } = useGetPastQuestionsQuery();
  const router = useRouter();
  const { query } = router;

  const filterPqByUniversity = () => {
    const filteredData = data?.filter(
      (university: any) => university.pq_details[0]?.university === query.name
    );
    return filteredData;
  };
  const past_questions = filterPqByUniversity();

  return (
    <div className="dark:bg-[#111]">
      <div className="pt-8">
        <div className="px-5 pb-3 text-xl font-bold dark:text-white lg:px-20">
          {past_questions?.length === 0 ? (
            <div>No Availbale Past Question for {query?.name}, Yet</div>
          ) : (
            <>
              <div className="mb-3">
                <span className=" mr-2 font-normal">
                  Search Over ({past_questions && past_questions?.length})
                  Availbale Past Questions for
                </span>
                <span>{query?.name}</span>
              </div>
              <div className="lg:w-[500px]">
                <Input placeholder="e.g, CSC 213" size="large" />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex grid-cols-4 flex-col items-stretch justify-center gap-6 overflow-hidden px-8 pt-3 !pb-10 lg:grid lg:px-20">
        {isLoading ? (
          <Spin />
        ) : (
          past_questions?.map((pq) => <PQItems key={pq.id} pq={pq} />)
        )}
      </div>
    </div>
  );
};

export default UniPastQuestions;
