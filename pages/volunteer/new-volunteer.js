import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

import { SearchFilter } from "../../components/utils/Search";

import { useGetUniversitiesQuery } from "../../src/services/university";
import { useGetDepartmentsByFacultyQuery } from "../../src/services/department";
import { useGetFacultiesQuery } from "../../src/services/faculty";

const NewVolunteer = () => {
  const [uniValue, setUniValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [yearValue, setYearValue] = useState();
  const [years, setYears] = useState([]);

  // get the the range of years from 2000 to the current year
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    for (let i = 2000; i <= currentYear; i++) {
      setYears((years) => [...years, i]);
    }
  };

  useEffect(() => {
    getYears();
  }, []);
  console.log(years);

  const { data: universities } = useGetUniversitiesQuery();
  const { data: faculties } = useGetFacultiesQuery();
  const { data: departments } = useGetDepartmentsByFacultyQuery(facultyValue);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="px-40 pt-20">
      <div>
        <h2 className="grid place-items-center text-5xl font-bold">
          New Volunteer
        </h2>

        <div className="p-10">
          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-2 gap-x-10">
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please input full name!" }]}
              >
                <Input placeholder="name" />
              </Form.Item>

              <Form.Item
                name="university"
                label="University"
                rules={[
                  { required: true, message: "Please input university!" },
                ]}
              >
                <SearchFilter
                  handleChange={(value) => setUniValue(value)}
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
                name={"faculty"}
                rules={[{ required: true, message: "Please input faculty!" }]}
              >
                <SearchFilter
                  handleChange={(value) => setFacultyValue(value)}
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
                name={"department"}
                rules={[{ required: true, message: "Please input year!" }]}
              >
                <SearchFilter
                  handleChange={(value) => setDepartmentValue(value)}
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
                name={"year"}
                rules={[{ required: true, message: "Please input year!" }]}
                tooltip="This is the year you were admitted to the university"
              >
                <SearchFilter
                  handleChange={(value) => setYearValue(value)}
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewVolunteer;
