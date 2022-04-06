import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ChangePasswordForm,
  Layout,
  ProfileUpdateForm,
} from "../../components";

const Settings = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const router = useRouter();

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Layout defaultSelectedKeys="7">
        <div className="!mb-5">
          <h2 className="border-b !pb-1 text-4xl font-bold">Settings</h2>
        </div>

        {/* UPDATE PROFILE FORM */}
        <ProfileUpdateForm />

        {/* CHANGE PASSWORD FORM */}
        <ChangePasswordForm />
      </Layout>
    </div>
  );
};

export default Settings;
