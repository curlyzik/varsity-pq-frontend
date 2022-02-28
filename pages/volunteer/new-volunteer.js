import React, { useEffect, useState } from "react";
import { Form, Input, Select, message, Modal, Button } from "antd";
const { Option } = Select;
import emailjs from "@emailjs/browser";

import { SearchFilter } from "../../components/utils/Search";

import { useGetUniversitiesQuery } from "../../src/services/university";
import { useGetDepartmentsByFacultyQuery } from "../../src/services/department";
import { useGetFacultiesQuery } from "../../src/services/faculty";
import { Btn, Success } from "../../components";
import axios from "axios";

const NewVolunteer = () => {
  const [form] = Form.useForm();

  const [uniValue, setUniValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [yearValue, setYearValue] = useState();
  const [years, setYears] = useState([]);

  const [volunteerDetails, setVolunteerDetails] = useState();
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

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/new-volunteer/`,
        values
      );
      const { data } = await res;
      setVolunteerDetails(data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      // console.log(error);
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

  // SEND EMAIL TO VOLUNTEER WITH LOGIN CREDENTIALS
  const sendVolunteerCredentials = () => {
    const templateParams = {
      to_email: volunteerDetails.data.email,
      to_name: volunteerDetails.data.full_name,
      from_name: "Varsity PQ",
      message: `Email: ${volunteerDetails.data.email} Password: ${volunteerDetails.password}`,
    };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
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
            key={volunteerDetails && volunteerDetails.data.email}
            volunteer={volunteerDetails}
          />
        </Modal>
      </div>
      <div className="px-6 pt-10 lg:px-40 lg:pt-20">
        <div>
          <h2 className=" grid place-items-center text-3xl font-bold lg:text-5xl">
            New Volunteer Request
          </h2>

          <div className="rounded-md bg-white p-6 lg:p-10">
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
                    width
                  >
                    {universities?.map((university) => (
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
                    value={facultyValue}
                    width
                  >
                    {faculties?.map((faculty) => (
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
                    width
                  >
                    {departments?.map((department) => (
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
                    width
                  >
                    {years.map((year, index) => (
                      <Option key={index} value={year}>
                        {year}
                      </Option>
                    ))}
                  </SearchFilter>
                </Form.Item>
              </div>

              {/* <Btn className={"inline-block disabled:bg-black"}>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 py-2 px-7 text-base font-bold text-white transition-all duration-300 hover:bg-blue-600"
                >
                  Submit Request
                </button>
              </Btn> */}

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="text-black"
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
