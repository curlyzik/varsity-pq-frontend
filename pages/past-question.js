import React from "react";
import { Select } from "../components/index";

const PastQuestion = ({ pqs }) => {
  return (
    <div>
      <div className="mx-auto flex h-[calc(100vh-100px)] flex-col place-items-center pt-32">
        <p className="text-3xl font-bold">Select Past Question</p>
        <div className="!grid grid-cols-3 items-center justify-center gap-3 p-5">
          <Select pqData={pqs} />
        </div>
      </div>
    </div>
  );
};

export default PastQuestion;

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/past_question/`);
  const data = await res.json();
  return {
    props: {
      pqs: data,
    },
  };
};
