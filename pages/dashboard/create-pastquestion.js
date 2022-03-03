import React from "react";
import { Layout } from "../../components";

const CreatePastQuestion = () => {
  return (
    <div>
      <Layout defaultSelectedKeys="4">
        <div>
          <h2 className="border-b pb-2 text-4xl font-bold">
            Create Past Question
          </h2>
        </div>
      </Layout>
    </div>
  );
};

export default CreatePastQuestion;
