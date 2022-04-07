import React from "react";
import { Result } from "antd";

interface SuccessProps {
  title: string;
  extra?: React.ReactNode;
}

const Success: React.FC<SuccessProps> = ({ title, extra }) => {
  return (
    <Result
      status="success"
      title={title}
      //   subTitle={`Thank you for your interest in volunteering with us. We will send you an email (${volunteer.data.email}) once we have reviewed your request.`}
      extra={extra}
    />
  );
};

export default Success;
