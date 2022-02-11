import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;

import { SearchFilter } from "../../components/utils/Search";

import { useGetUniversitiesQuery } from "../../src/services/university";
import { useGetDepartmentsByFacultyQuery } from "../../src/services/department";
import { useGetFacultiesQuery } from "../../src/services/faculty";
import { Btn, MainHeader } from "../../components";

const NewVolunteer = () => {
  const [form] = Form.useForm();

  const [uniValue, setUniValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [yearValue, setYearValue] = useState();
  const [years, setYears] = useState([]);

  const { data: universities } = useGetUniversitiesQuery();
  const { data: faculties } = useGetFacultiesQuery();
  const { data: departments } = useGetDepartmentsByFacultyQuery(facultyValue);

  // get the the range of years from 2000 to the current year

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    for (let i = 2000; i <= currentYear; i++) {
      setYears((years) => [...years, i]);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <div>
      <div className="px-6 pt-10 lg:px-40 lg:pt-20">
        <div>
          <h2 className=" grid place-items-center text-3xl font-bold lg:text-5xl">
            New Volunteer Request
          </h2>

          <div className="rounded-md bg-white p-6 lg:p-10">
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <div className="mb-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-10">
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please input first name!" },
                  ]}
                >
                  <Input placeholder="first name" />
                </Form.Item>

                <Form.Item name="last_name" label="Last Name">
                  <Input placeholder="last name" />
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

              <Btn className={"inline-block"}>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 py-2 px-7 text-base font-bold text-white transition-all duration-300 hover:bg-blue-600"
                >
                  Submit Request
                </button>
              </Btn>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVolunteer;
