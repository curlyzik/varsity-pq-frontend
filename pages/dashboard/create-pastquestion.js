import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Table } from "../../components";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { PastQuestionCreate, PastQuestionUpdate } from "../../components";
import axios from "axios";
import { Button, Popconfirm } from "antd";

const CreatePastQuestion = () => {
  const { auth, courseDetail } = useSelector((state) => state.persistedReducer);
  const router = useRouter();

  const [courseId, setCourseId] = useState(null);
  const [courses, setCourses] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);

  // FETCH ALL COURSES
  const fetchCourses = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [courseDetail]);

  // table columns
  const columns = [
    {
      title: <h3 className="font-extrabold">Course Code</h3>,
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
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
    },
  ];

  // get the mapped data
  const mappedData = courses?.map((course) => {
    return {
      key: course.id,
      course_code: <h3 className="font-bold">{course.course_code}</h3>,
      course_name: course.name,
      year: course.course_details[0].year,
      level: course.course_details[0].level,
      semester: course.course_details[0].semester,
      action: (
        <div className="!flex gap-x-2">
          <div>
            <Button
              key="button"
              className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
              onClick={() => {
                setCourseId(course.id);
                setShowCreateModal(true);
              }}
            >
              <AiOutlinePlus fill="green" />
              <span>Create</span>
            </Button>
          </div>
          <Button
            key="button"
            className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
            onClick={() => {
              setCourseId(course.id);
              setShowUpdateModal(true);
            }}
          >
            <AiOutlineEdit fill="green" />
            <span>Update</span>
          </Button>
        </div>
      ),
    };
  });

  return (
    <div>
      <Layout defaultSelectedKeys="4">
        <div>
          <h2 className="!mb-4 border-b pb-2 text-4xl font-bold">
            Create Past Question
          </h2>
        </div>
        <div className="hidden md:block">
          <Table
            columns={columns}
            data={mappedData}
            scroll={{ x: 900, y: 300 }}
          />
          <PastQuestionCreate
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            courseId={courseId}
            setCourseId={setCourseId}
          />

          <PastQuestionUpdate
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            courseId={courseId}
            setCourseId={setCourseId}
          />
        </div>
      </Layout>
    </div>
  );
};

export default CreatePastQuestion;
