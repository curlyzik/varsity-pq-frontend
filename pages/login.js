import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import axios from "axios";

import { setAuthToken, setAccount } from "../src/features/users/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/login/`,
        values
      );
      const { data } = await res;
      dispatch(
        setAuthToken({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );
      dispatch(setAccount(data.user));
      console.log(data);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="grid items-center justify-center gap-y-5 pt-24">
      <h2 className="text-center text-4xl">Login</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<AiOutlineUser className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          className="!mb-0"
        >
          <Input
            prefix={<AiOutlineLock className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item className="!mb-3">
          <a
            className="login-form-forgot inline-block font-semibold text-black"
            href=""
          >
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item className="">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full text-black"
          >
            Log in
          </Button>
          <p>
            Or{" "}
            <span>
              <a href="" className="inline-block font-semibold text-black">
                register now!
              </a>
            </span>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
