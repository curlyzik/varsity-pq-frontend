import { Input, Form, Select, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal } from "..";
import { removeCourseDetails } from "../../src/features/courses/courseDetailSlice";
import { useGetLevelsQuery } from "../../src/services/level";
import { useGetSemesterQuery } from "../../src/services/semester";
import { SearchFilter } from "../utils/Search";

const { Option } = Select;

const Courses = ({ data, visible, setVisible, setCourseId, courseId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { courseDetail, auth } = useSelector((state) => state.persistedReducer);
  console.log(courseDetail);
  const dispatch = useDispatch();

  const { data: levels } = useGetLevelsQuery();
  const { data: semesters } = useGetSemesterQuery();

  const updateCourse = async (values, id) => {
    setConfirmLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(data);
      setConfirmLoading(false);
      dispatch(removeCourseDetails());
      setVisible(false);
      setCourseId(null);
      form.resetFields();
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };

  const onFinish = (values) => {
    console.log(values);
    updateCourse(values, courseId);
  };

  const handleCancel = () => {
    dispatch(removeCourseDetails());
    setConfirmLoading(false);
    setCourseId(null);
    setVisible(false);
    form.resetFields();
  };

  // set initial course values
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: courseDetail.course_name,
        course_code: courseDetail.course_code,
        year: courseDetail.course_year,
        level: courseDetail.course_level,
        semester: courseDetail.course_semester,
        university: courseDetail.course_university,
        faculty: courseDetail.course_faculty,
        department: courseDetail.course_department,
      });
    }
  }, [courseDetail, visible]);

  const columns = [
    {
      title: <h3 className="font-bold">Course Code</h3>,
      dataIndex: "course_code",
      key: "course_code",
      fixed: "left",
      width: 50,
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "name",
      width: 100,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 50,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 50,
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      width: 50,
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 100,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 50,
      fixed: "right",
    },
  ];

  return (
    <div>
      <Modal
        isModalVisible={visible}
        title={<h3 className="text-2xl font-extrabold">Update Course</h3>}
        handleCancel={handleCancel}
        handleOk={onFinish}
        confirmLoading={confirmLoading}
        loading={confirmLoading}
        formSubmit={() => form.submit()}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={{
            name: courseDetail.course_name,
            course_code: courseDetail.course_code,
            year: courseDetail.course_year,
            level: courseDetail.course_level,
            semester: courseDetail.course_semester,
            university: courseDetail.course_university,
            faculty: courseDetail.course_faculty,
            department: courseDetail.course_department,
          }}
        >
          <div className="mb-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-10">
            <Form.Item
              name="name"
              label="Course Name"
              rules={[{ required: true, message: "Please input course name!" }]}
            >
              <Input placeholder="course name" />
            </Form.Item>

            <Form.Item
              name="course_code"
              label="Course Code"
              rules={[{ required: true, message: "Please input course code!" }]}
            >
              <Input placeholder="course code" type={"text"} />
            </Form.Item>

            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Please input year!" }]}
            >
              <Input placeholder="year" type={"text"} />
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

            {/* Hidden Fields */}
            <Form.Item label="University" name="university" hidden>
              <Input placeholder="university" type={"text"} />
            </Form.Item>

            <Form.Item label="Faculty" name="faculty" hidden>
              <Input placeholder="faculty" type={"text"} />
            </Form.Item>

            <Form.Item label="Department" name="department" hidden>
              <Input placeholder="department" type={"text"} />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Table columns={columns} data={data} scroll={{ x: 1500, y: 300 }} />
    </div>
  );
};

export default Courses;
