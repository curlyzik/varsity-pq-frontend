import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout, UserDashboard } from "../../components";
import { RootState } from "../../src/app/store";

const Dashboard: NextPage = () => {
  const { auth } = useSelector((state: RootState) => state.persistedReducer);
  const router = useRouter();

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
