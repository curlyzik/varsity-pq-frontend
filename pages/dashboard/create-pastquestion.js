import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../../components";
import PicturesWall from "../../components/utils/PictureWall";

const CreatePastQuestion = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const router = useRouter();

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Layout defaultSelectedKeys="4">
        <div>
          <h2 className="border-b pb-2 text-4xl font-bold">
            Create Past Question
          </h2>
        </div>

        <PicturesWall />
      </Layout>
    </div>
  );
};

export default CreatePastQuestion;
