import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Modal, Success } from "../components";
import { useRouter } from "next/router";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const onPasswordResetFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/password/reset/`,
        values
      );

      setLoading(false);
      showModal();
      setEmail(values.email);
      form.resetFields();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        isModalVisible={visible}
        handleCancel={handleCancel}
        footer={[]}
        title=""
      >
        <Success
          title={"Successfully sent password reset request"}
          extra={[
            <p className="!mb-4 text-sm text-gray-500" key={"text"}>
              Your have successfully request for a password reset on your
              account <span className="font-bold text-black">{email}.</span>{" "}
              Kindly check your e-mail for further instructions.
            </p>,
            <Button
              type="primary"
              key="console"
              className="font-bold !text-black"
              onClick={() => router.push("/")}
            >
              Go Home
            </Button>,
          ]}
        ></Success>
      </Modal>
      <div className="px-7 pt-60 lg:p-0">
        <div className="flex flex-col items-center justify-center gap-y-3 lg:h-[calc(100vh-5rem)]">
          <div>
            <h3 className=" text-3xl font-semibold">Reset Your Password</h3>
          </div>
          <div className="lg:!w-[500px]">
            <p className="!mb-1">
              Enter your user account's verified email address and we will send
              you a password reset link.
            </p>
            <Form
              name="normal_login"
              className="password-reset-form"
              onFinish={onPasswordResetFinish}
              form={form}
            >
              <Form.Item
                name="email"
                className="!mb-5"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email address" type="email" />
              </Form.Item>

              <Button htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
