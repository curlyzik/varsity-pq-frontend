import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { UserDashboard } from "../../components";

const Dashboard = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
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
