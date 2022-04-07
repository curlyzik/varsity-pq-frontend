import React, { useEffect, useState } from "react";
import { Form, Input, Select, message, Modal, Button } from "antd";
const { Option } = Select;
import emailjs from "@emailjs/browser";

import { SearchFilter } from "../../components/utils/Search";

import { useGetUniversitiesQuery } from "../../src/services/university";
import { useGetDepartmentsByFacultyQuery } from "../../src/services/department";
import { useGetFacultiesQuery } from "../../src/services/faculty";
import { Success } from "../../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../src/app/store";

interface VolunteerValues {
  full_name: string;
  email: string;
  faculty: string;
  department: string;
  university: string;
  year: string | number;
}

interface VolunteerDetails {
  data: { full_name: string; email: string };
  password: string;
}

interface MappedData {
  id: number | string;
  name: string;
}

const NewVolunteer = () => {
  const { auth } = useSelector((state: RootState) => state.persistedReducer);
  const router = useRouter();

  useEffect(() => {
    if (auth.accessToken) {
      router.push("/dashboard");
    }
  }, []);

  const [form] = Form.useForm();

  const [uniValue, setUniValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [yearValue, setYearValue] = useState();
  const [years, setYears] = useState<number[]>([]);

  const [volunteerDetails, setVolunteerDetails] = useState<VolunteerDetails>();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: universities } = useGetUniversitiesQuery();
  const { data: faculties } = useGetFacultiesQuery();
  const { data: departments } = useGetDepartmentsByFacultyQuery(facultyValue);

  // get the the range of years from 2010 to the current year
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    for (let i = 2010; i <= currentYear; i++) {
      setYears((years) => [...years, i]);
    }
  };

  const onFinish = async (values: VolunteerValues) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/new-volunteer/`,
        values
      );
      const { data } = res;
      setVolunteerDetails(data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const messageError = () => {
    message.error("Email already exists", 5, () => setError(false));
  };

  useEffect(() => {
    getYears();
  }, []);

  useEffect(() => {
    if (error) {
      messageError();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setIsModalVisible(true);
      form.resetFields();
    }
  }, [success]);

  // Set department value to null when faculty value changes
  useEffect(() => {
    form.setFieldsValue({ department: null });
  }, [facultyValue]);

  // SEND EMAIL TO VOLUNTEER WITH LOGIN CREDENTIALS
  const sendVolunteerCredentials = () => {
    const templateParams = {
      to_email: volunteerDetails?.data.email,
      to_name: volunteerDetails?.data.full_name,
      from_name: "Varsity PQ",
      message: `Email: ${volunteerDetails?.data.email} Password: ${volunteerDetails?.password}`,
    };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    if (success) {
      // SEND EMAIL TO VOLUNTEER WITH LOGIN CREDENTIALS
      sendVolunteerCredentials();
    }
  }, [success]);

  return (
    <div>
      <div>
        <Modal
          key={volunteerDetails && volunteerDetails.data.email}
          visible={isModalVisible}
          footer={[]}
          className="!px-8 md:px-0"
          closable={false}
        >
          <Success
            title={
              <div className="font-semibold dark:text-white">
                "Successfully Sent Volunteer Request!!!"
              </div>
            }
            extra={[
              <p className="mb-4 text-sm text-gray-500" key={"text"}>
                Thank you for your interest in volunteering for us. We have sent
                an email to{" "}
                <span className="font-bold text-black dark:text-white">
                  {volunteerDetails?.data.email}
                </span>{" "}
                Please check your mail for login credentials
              </p>,
              <Button
                type="primary"
                key="console"
                className="border-white font-bold !text-black dark:text-white"
                onClick={() => router.push("/")}
              >
                Go Home
              </Button>,
            ]}
          />
        </Modal>
      </div>
      <div className="lg:pt-18 px-6 pt-10 pb-7 lg:px-40">
        <div>
          <h2 className=" grid place-items-center pb-5 text-3xl font-bold dark:text-white lg:text-5xl">
            New Volunteer Request
          </h2>

          <div className="rounded-md border bg-white p-6 dark:border dark:bg-black lg:p-10">
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <div className="mb-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-10">
                <Form.Item
                  name="full_name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input fullname!" },
                  ]}
                >
                  <Input placeholder="full name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: "Please input email!" }]}
                >
                  <Input placeholder="email" type={"email"} />
                </Form.Item>

                <Form.Item
                  name="university"
                  label="University"
                  rules={[
                    { required: true, message: "Please input university!" },
                  ]}
                >
                  <SearchFilter
                    handleChange={(value) => {
                      form.setFieldsValue({ university: value });
                      setUniValue(value);
                    }}
                    value={uniValue}
                    description="university"
                  >
                    {universities?.map((university: MappedData) => (
                      <Option key={university.id} value={university.name}>
                        {university.name}
                      </Option>
                    ))}
                  </SearchFilter>
                </Form.Item>

                <Form.Item
                  label="Faculty"
                  name="faculty"
                  rules={[{ required: true, message: "Please input faculty!" }]}
                >
                  <SearchFilter
                    handleChange={(value) => {
                      form.setFieldsValue({ faculty: value });
                      setFacultyValue(value);
                    }}
                    description="faculty"
                  >
                    {faculties?.map((faculty: MappedData) => (
                      <Option key={faculty.id} value={faculty.name}>
                        {faculty.name}
                      </Option>
                    ))}
                  </SearchFilter>
                </Form.Item>

                <Form.Item
                  label="Department"
                  name="department"
                  rules={[{ required: true, message: "Please input year!" }]}
                >
                  <SearchFilter
                    handleChange={(value) => {
                      form.setFieldsValue({ department: value });
                      setDepartmentValue(value);
                    }}
                    description="department"
                    value={departmentValue}
                  >
                    {departments?.map((department: MappedData) => (
                      <Option key={department.id} value={department.name}>
                        {department.name}
                      </Option>
                    ))}
                  </SearchFilter>
                </Form.Item>

                <Form.Item
                  label="Year"
                  name="year"
                  rules={[{ required: true, message: "Please input year!" }]}
                  tooltip="This is the year you were admitted to the university"
                >
                  <SearchFilter
                    handleChange={(value) => {
                      form.setFieldsValue({ year: value });
                      setYearValue(value);
                    }}
                    description="year"
                    value={yearValue}
                  >
                    {years.map((year, index) => (
                      <Option key={index} value={year.toString()}>
                        {year.toString()}
                      </Option>
                    ))}
                  </SearchFilter>
                </Form.Item>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="border text-black dark:border-white dark:text-white"
              >
                Submit Request
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVolunteer;
