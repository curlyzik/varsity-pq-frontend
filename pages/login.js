import React from "react";
import { Form, Input, Button } from "antd";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<AiOutlineUser className="site-form-item-icon" />}
            placeholder="Username"
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
