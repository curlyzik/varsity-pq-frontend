import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "..";
import { fetcher } from "../../utils/axios";
import useSWR from "swr";
import { useRouter } from "next/router";

const UserDashboard = () => {
  const router = useRouter();
  const { auth } = useSelector((state) => state.persistedReducer);

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);

  const { data: user, error } = useSWR("/dj-rest-auth/user/", fetcher);
  if (!error && !user) return <div>...loading</div>;

  return (
    <div>
      <Layout>
        <div>
          <h2 className="border-b pb-2 text-4xl font-bold">Profile Details</h2>
        </div>
        <div className="grid grid-cols-3">
          <div>{user.full_name || "name"}</div>
          <div>{user.university}</div>
          <div>{user.faculty}</div>
          <div>{user.department}</div>
          <div>{user.year}</div>
          <div>{user.email}</div>
          <div>{user.is_vounteer}</div>
        </div>
      </Layout>
    </div>
  );
};

export default UserDashboard;
