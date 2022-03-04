import { Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import { Table, Modal } from "..";
import { SearchFilter } from "../utils/Search";

const Courses = ({
  data,
  visible,
  setVisible,
  setCourseId,
  setCourseDetails,
  courseDetails,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setCourseId(null);
      setCourseDetails(null);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

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
        title="Update Course"
        handleCancel={handleCancel}
        handleOk={onFinish}
        confirmLoading={confirmLoading}
        loading={confirmLoading}
      >
        {/* <Form layout="vertical" onFinish={onFinish} form={form}>
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
          </div>
        </Form> */}
      </Modal>

      <Table columns={columns} data={data} scroll={{ x: 1500, y: 300 }} />
    </div>
  );
};

export default Courses;
