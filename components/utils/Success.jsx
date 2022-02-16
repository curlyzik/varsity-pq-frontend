import React from "react";
import { Result, Button } from "antd";
import { useRouter } from "next/router";

const Success = ({ volunteer }) => {
  const router = useRouter();
  return (
    <Result
      status="success"
      title="Successfully Sent Volunteer Request!!! "
      subTitle={`Thank you for your interest in volunteering with us. We will send you an email (${volunteer.data.email}) once we have reviewed your request.`}
      extra={[
        <Button
          type="primary"
          key="console"
          className="font-bold !text-black"
          onClick={() => router.push("/")}
        >
          Go Home
        </Button>,
      ]}
    />
  );
};

export default Success;
