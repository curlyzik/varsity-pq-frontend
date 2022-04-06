import { Form, Input, InputNumber, message, Button, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../../components";
import { SearchFilter } from "../../components/utils/Search";
import { useGetLevelsQuery } from "../../src/services/level";
import { useGetSemesterQuery } from "../../src/services/semester";

const { Option } = Select;

const CreateCourse = () => {
  const [form] = Form.useForm();
  const { auth } = useSelector((state) => state.persistedReducer);
  const router = useRouter();

  const [courseError, setCourseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: levels } = useGetLevelsQuery();
  const { data: semesters } = useGetSemesterQuery();

  const { account } = auth;

  useEffect(() => {
    if (!auth.accessToken || !auth) {
      router.push("/login");
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setCourseError(true);
    }
  };

  const messageError = () => {
    message.error("You have already created this course", 5, () =>
      setCourseError(false)
    );
  };

  useEffect(() => {
    if (success) {
      router.push("/dashboard/create-pastquestion");
    }
  });

  useEffect(() => {
    if (courseError) {
      messageError();
    }
  });

  return (
    <div>
      <Layout defaultSelectedKeys="2">
        <div>
          <h2 className="mb-6 border-b pb-2 text-4xl font-bold">
            Create Course
          </h2>
        </div>

        <div className="rounded-md border bg-white p-6 dark:border-gray-400 dark:bg-black lg:p-10">
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <div className="mb-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-10">
              <Form.Item
                name="name"
                label="Course Name"
                rules={[
                  { required: true, message: "Please input course name!" },
                ]}
              >
                <Input
                  placeholder="course name"
                  onChange={(e) => {
                    let splitStr = e.target.value.toLowerCase().split(" ");
                    for (let i = 0; i < splitStr.length; i++) {
                      splitStr[i] =
                        splitStr[i].charAt(0).toUpperCase() +
                        splitStr[i].substring(1);
                    }
                    form.setFieldsValue({
                      name: splitStr.join(" "),
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                name="course_code"
                label="Course Code"
                rules={[
                  { required: true, message: "Please input course code!" },
                ]}
              >
                <Input
                  placeholder="course code, e.g MEC 441"
                  type="text"
                  onChange={(e) => {
                    form.setFieldsValue({
                      course_code: e.target.value.toUpperCase(),
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                name="university"
                label="University"
                rules={[
                  { required: true, message: "Please input university!" },
                ]}
              >
                <Input
                  placeholder="university"
                  onChange={form.setFieldsValue({
                    university: account?.university,
                  })}
                  type={"text"}
                  disabled
                />
              </Form.Item>

              <Form.Item
                name="faculty"
                label="Faculty"
                rules={[{ required: true, message: "Please input faculty!" }]}
              >
                <Input
                  placeholder="faculty"
                  onChange={form.setFieldsValue({
                    faculty: account?.faculty,
                  })}
                  type={"text"}
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please input department!" },
                ]}
              >
                <Input
                  placeholder="department"
                  onChange={form.setFieldsValue({
                    department: account?.department,
                  })}
                  type={"text"}
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="Year"
                name="year"
                rules={[{ required: true, message: "Please input year!" }]}
              >
                <Input
                  type="number"
                  onChange={(e) => {
                    if (e.target.value.length > e.target.maxLength) {
                      form.setFieldsValue({
                        year: e.target.value.slice(0, e.target.maxLength),
                      });
                    }
                  }}
                  maxLength="4"
                  placeholder="input year"
                />
              </Form.Item>

              <Form.Item
                label="Level"
                name="level"
                rules={[{ required: true, message: "Please input level!" }]}
              >
                <SearchFilter
                  handleChange={(value) => {
                    form.setFieldsValue({ level: value });
                  }}
                  description="level"
                  width
                >
                  {levels?.map((level) => (
                    <Option key={level.id} value={level.level}>
                      {level.level}
                    </Option>
                  ))}
                </SearchFilter>
              </Form.Item>

              <Form.Item
                label="Semester"
                name="semester"
                rules={[{ required: true, message: "Please input semester!" }]}
              >
                <SearchFilter
                  handleChange={(value) => {
                    form.setFieldsValue({ semester: value });
                  }}
                  description="semester"
                  width
                >
                  {semesters?.map((semester) => (
                    <Option key={semester.id} value={semester.name}>
                      {semester.name}
                    </Option>
                  ))}
                </SearchFilter>
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="border-white text-black dark:text-white"
            >
              Create Course
            </Button>
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default CreateCourse;
