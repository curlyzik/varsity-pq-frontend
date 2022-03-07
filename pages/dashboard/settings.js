import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { setAuth } from "../../src/features/users/authSlice";
import useSWR from "swr";
import { fetcher } from "../../utils/axios";

const Settings = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const { account } = auth;
  // console.log(account);

  const { data: user, error } = useSWR("/dj-rest-auth/user/", fetcher);
  console.log("From User", user);
  console.log("From Account", account);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  // UPDATE PROFILE LOGIC
  const onUpdateProfileFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/user/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      // Update redux store with new data
      dispatch(
        setAuth({
          access_token: auth.accessToken,
          refresh_token: auth.refreshToken,
          account: data,
        })
      );
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const successMessage = () => {
    message.success("Profile updated successfully", 4, () => {
      return setSuccess(false);
    });
  };

  useEffect(() => {
    if (success) {
      successMessage();
    }
  }, [success]);

  // Get previous/initial values
  useEffect(() => {
    if (!error && user) {
      form.setFieldsValue({
        full_name: user.full_name,
        email: user.email,
        year: user.year,
      });
    }
  }, [user, error]);

  return (
    <div>
      <Layout defaultSelectedKeys="5">
        <div className="!mb-5">
          <h2 className="border-b !pb-1 text-4xl font-bold">Settings</h2>
        </div>

        <div>
          <h3 className="!mb-4 text-2xl font-semibold">Update Profile</h3>

          <Form layout="vertical" onFinish={onUpdateProfileFinish} form={form}>
            <div className="!flex flex-col lg:!grid lg:!grid-cols-2 lg:gap-x-10">
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please input course name!" },
                ]}
              >
                <Input placeholder="full name" />
              </Form.Item>

              <Form.Item
                name="year"
                label="Year of Admission"
                rules={[{ required: true, message: "Please input year!" }]}
              >
                <Input placeholder="year of admission" type="number" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please input email!" }]}
              >
                <Input placeholder="input email" type="email" />
              </Form.Item>
            </div>
            <Button onClick={form.submit} loading={loading}>
              Update
            </Button>
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default Settings;
