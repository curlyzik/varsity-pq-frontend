import React from "react";
import { Select } from "../components/index";

const PastQuestion = ({ pqs }) => {
  return (
    <div>
      <Select pqData={pqs} />
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
