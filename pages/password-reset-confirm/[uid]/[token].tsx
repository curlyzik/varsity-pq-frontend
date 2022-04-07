import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Form, Input, message } from "antd";

interface PasswordResetValues {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}

const PasswordResetConfirm = () => {
  const router = useRouter();
  const { uid, token } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [form] = Form.useForm();

  const onPasswordResetConfirmFinish = async (values: PasswordResetValues) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/password/reset/confirm/${uid}/${token}/`,
        values
      );
      setSuccessMessage(data.detail);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error.response);
      if (error.response.data) {
        if (error.response.data.new_password2) {
          setErrorMessage(error.response.data.new_password2[0]);
        } else {
          setErrorMessage(error.response.data.token[0]);
        }
      } else {
        setErrorMessage("Wrong details");
      }
      setError(true);
      setLoading(false);
      setSuccess(false);
    }
  };

  const setSuccessandRedirect = () => {
    setSuccess(false);
    form.resetFields();
    router.push("/login");
  };

  const messageSuccess = () => {
    message.success(
      `${successMessage}. Redirecting to login page...`,
      4,
      () => {
        return setSuccessandRedirect();
      }
    );
  };

  const messageError = () => {
    message.error(errorMessage, 2, () => {
      return setError(false);
    });
  };

  useEffect(() => {
    if (success) {
      messageSuccess();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      messageError();
    }
  }, [error]);

  useEffect(() => {
    form.setFieldsValue({
      uid: uid,
      token: token,
    });
  }, [uid, token]);

  return (
    <>
      <div className="px-7 pt-60 lg:p-0">
        <div className="flex flex-col items-center justify-center gap-y-3 lg:h-[calc(100vh-5rem)]">
          <div>
            <h3 className=" text-3xl font-semibold">Create New Password</h3>
          </div>
          <div className="lg:!w-[500px]">
            <p className="!mb-2">
              Enter your new password and confirm it to reset your password.{" "}
              <span>
                You will be redirected to the login page after this action is
                successful
              </span>
            </p>

            <Form
              name="normal_login"
              className="password-reset-form"
              onFinish={onPasswordResetConfirmFinish}
              form={form}
            >
              <Form.Item
                name="new_password1"
                className="!mb-3"
                rules={[
                  {
                    required: true,
                    message: "Please input new password!",
                  },
                ]}
              >
                <Input placeholder="Enter new password" type="password" />
              </Form.Item>

              <Form.Item
                name="new_password2"
                className="!mb-3"
                rules={[
                  {
                    required: true,
                    message: "Please input confirm password!",
                  },
                ]}
              >
                <Input placeholder="Confirm new password" type="password" />
              </Form.Item>

              {/* Hidden Fields */}
              <Form.Item
                name="uid"
                hidden
                className="!mb-3"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="" type="text" />
              </Form.Item>

              <Form.Item
                name="token"
                hidden
                className="!mb-3"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="" type="text" />
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

export default PasswordResetConfirm;
