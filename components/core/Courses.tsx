import { Input, Form, Select, Button, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal } from "..";
import { RootState } from "../../src/app/store";
import {
  removeCourseDetails,
  removeCourseId,
} from "../../src/features/courses/courseDetailSlice";
import { useGetLevelsQuery } from "../../src/services/level";
import { useGetSemesterQuery } from "../../src/services/semester";
import { SearchFilter } from "../utils/Search";

const { Option } = Select;

interface CoursesProps {
  data: any;
  updateVisible: boolean;
  updateSetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tableLoading: boolean;
}

interface CourseUpdateValue {
  course_name: string;
  course_course_code: string;
  course_year: string | number;
  course_level: string | number;
  course_semester: string | number;
  course_university: string;
  course_faculty: string;
  course_department: string;
}

const Courses: React.FC<CoursesProps> = ({
  data,
  updateVisible,
  updateSetVisible,
  tableLoading,
}) => {
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();

  const { courseDetail, auth } = useSelector(
    (state: RootState) => state.persistedReducer
  );
  const { courseId } = courseDetail;

  const { data: levels } = useGetLevelsQuery();
  const { data: semesters } = useGetSemesterQuery();

  // UPDATE COURSE
  const updateCourse = async (
    values: CourseUpdateValue,
    id: string | number
  ) => {
    setConfirmLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}/`,
        {
          name: values.course_name,
          course_code: values.course_course_code,
          year: values.course_year,
          level: values.course_level,
          semester: values.course_semester,
          university: values.course_university,
          faculty: values.course_faculty,
          department: values.course_department,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setConfirmLoading(false);
      dispatch(removeCourseDetails());
      updateSetVisible(false);
      dispatch(removeCourseId());
      setSuccess(true);
      form.resetFields();
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setConfirmLoading(false);
    }
  };

  const onUpdateFinish = (values: CourseUpdateValue) => {
    updateCourse(values, courseId!);
  };

  const handleUpdateCancel = () => {
    dispatch(removeCourseDetails());
    setConfirmLoading(false);
    dispatch(removeCourseId());
    updateSetVisible(false);
  };

  const setSuccessMessage = () => {
    message.success("Course Updated", 2, () => {
      setSuccess(false);
    });
  };

  useEffect(() => {
    if (success) {
      setSuccessMessage();
    }
  }, [success]);

  // set previous values to form field
  useEffect(() => {
    if (updateVisible) {
      form.setFieldsValue({
        course_name: courseDetail.course_name,
        course_course_code: courseDetail.course_code,
        course_year: courseDetail.course_year,
        course_level: courseDetail.course_level,
        course_semester: courseDetail.course_semester,
        course_university: courseDetail.course_university,
        course_faculty: courseDetail.course_faculty,
        course_department: courseDetail.course_department,
      });
    }
  }, [courseDetail, updateVisible]);

  const columns = [
    {
      title: <h3 className="font-extrabold dark:text-black">Course Code</h3>,
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
      {/* COURSE DATA */}
      <Table
        columns={columns}
        loading={tableLoading}
        data={data}
        scroll={{ x: 1500, y: 300 }}
      />

      {/* UPDATE COURSE MODAL */}
      <Form form={form}>
        <Modal
          isModalVisible={updateVisible}
          title={<h3 className="text-2xl font-extrabold">Update Course</h3>}
          handleCancel={handleUpdateCancel}
          handleOk={onUpdateFinish}
          confirmLoading={confirmLoading}
          footer={[
            <Button
              key="back"
              className="dark:text-white"
              onClick={handleUpdateCancel}
            >
              Cancel
            </Button>,
            <Button
              key="cancel"
              type="primary"
              onClick={() => form.submit()}
              loading={confirmLoading}
              className="text-black dark:text-white"
            >
              OK
            </Button>,
          ]}
        >
          <Form
            layout="vertical"
            onFinish={onUpdateFinish}
            form={form}
            initialValues={{
              course_name: courseDetail.course_name,
              course_course_code: courseDetail.course_code,
              course_year: courseDetail.course_year,
              course_level: courseDetail.course_level,
              course_semester: courseDetail.course_semester,
              course_university: courseDetail.course_university,
              course_faculty: courseDetail.course_faculty,
              course_department: courseDetail.course_department,
            }}
          >
            <div className="!mb-2 !flex flex-col lg:!grid lg:!grid-cols-2 lg:!gap-x-10">
              <Form.Item
                name="course_name"
                label="Course Name"
                rules={[
                  { required: true, message: "Please input course name!" },
                ]}
              >
                <Input placeholder="course name" />
              </Form.Item>

              <Form.Item
                name="course_course_code"
                label="Course Code"
                rules={[
                  { required: true, message: "Please input course code!" },
                ]}
              >
                <Input
                  placeholder="course code"
                  type={"text"}
                  onChange={(e) => {
                    form.setFieldsValue({
                      course_course_code: e.target.value.toUpperCase(),
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Year"
                name="course_year"
                rules={[{ required: true, message: "Please input year!" }]}
              >
                <Input placeholder="year" type="number" />
              </Form.Item>

              <Form.Item
                label="Level"
                name="course_level"
                rules={[{ required: true, message: "Please input level!" }]}
              >
                <SearchFilter
                  handleChange={(value) => {
                    form.setFieldsValue({ course_level: value });
                  }}
                  description="level"
                >
                  {levels?.map(
                    (level: {
                      id: string | number;
                      level: string | number;
                    }) => (
                      <Option key={level.id} value={level.level}>
                        {level.level}
                      </Option>
                    )
                  )}
                </SearchFilter>
              </Form.Item>

              <Form.Item
                label="Semester"
                name="course_semester"
                rules={[{ required: true, message: "Please input semester!" }]}
              >
                <SearchFilter
                  handleChange={(value) => {
                    form.setFieldsValue({ course_semester: value });
                  }}
                  description="semester"
                >
                  {semesters?.map(
                    (semester: { id: string | number; name: string }) => (
                      <Option key={semester.id} value={semester.name}>
                        {semester.name}
                      </Option>
                    )
                  )}
                </SearchFilter>
              </Form.Item>

              {/* Hidden Fields */}
              <Form.Item label="University" name="course_university" hidden>
                <Input placeholder="university" type={"text"} />
              </Form.Item>

              <Form.Item label="Faculty" name="course_faculty" hidden>
                <Input placeholder="faculty" type={"text"} />
              </Form.Item>

              <Form.Item label="Department" name="course_department" hidden>
                <Input placeholder="department" type={"text"} />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </Form>
    </div>
  );
};

export default Courses;
