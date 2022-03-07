import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { logout } from "../../src/features/users/authSlice";

const ChangePasswordForm = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // UPDATE PROFILE LOGIC
  const onChangePasswordFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/password/change/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      form.resetFields();
    } catch (error) {
      if (error.response.data.old_password) {
        setErrorMessage(error.response.data.old_password[0]);
      } else {
        setErrorMessage(error.response.data.new_password2[0]);
      }
      setError(true);
      setLoading(false);
      setSuccess(false);
    }
  };

  const setSuccessandLogout = () => {
    setSuccess(false);
    dispatch(logout());
    router.push("/login");
  };

  const successMessage = () => {
    message.success("Password changed successfully", 4, () =>
      setSuccessandLogout()
    );
  };

  const messageError = () => {
    message.error(errorMessage, 4, () => {
      return setError(false);
    });
  };

  useEffect(() => {
    if (success) {
      successMessage();
    }
  }, [success, auth]);

  useEffect(() => {
    if (error) {
      messageError();
    }
  }, [error]);

  return (
    <div className="!mb-12">
      <div className="!mb-5">
        <h3 className="text-2xl font-semibold">Change Password</h3>
        <span className="text-gray-400">
          Note: Changing your password would log you out
        </span>
      </div>

      <Form
        layout="vertical"
        onFinish={onChangePasswordFinish}
        id="changePassword"
        form={form}
      >
        <div className="!flex flex-col lg:!grid lg:!grid-cols-2 lg:gap-x-10">
          <Form.Item
            name="old_password"
            label="Old Password"
            rules={[{ required: true, message: "Please input old password!" }]}
          >
            <Input placeholder="old password" />
          </Form.Item>

          <Form.Item
            name="new_password1"
            label="New Password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password placeholder="password" type="text" />
          </Form.Item>

          <Form.Item
            name="new_password2"
            label="Confirm Password"
            rules={[
              { required: true, message: "Please input confirm password!" },
            ]}
          >
            <Input.Password placeholder="confirm password" type="text" />
          </Form.Item>
        </div>
        <Button htmlType="submit" loading={loading} form="changePassword">
          Change
        </Button>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
