import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Table } from "../../components";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { PastQuestionCreate, PastQuestionUpdate } from "../../components";
import axios from "axios";
import { Button } from "antd";

const CreatePastQuestion = () => {
  const { auth, courseDetail } = useSelector((state) => state.persistedReducer);

  const router = useRouter();

  const [courses, setCourses] = useState(null);

  const [courseDetails, setCourseDetails] = useState({});
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

  // filter courses that has doesnt have past question yet
  const coursesHaveNoPQ = () =>
    courses?.filter((course) => {
      if (course.has_pastquestion === false) {
        return courses;
      }
    });

  console.log(coursesHaveNoPQ());
  // get the mapped data
  const mappedData = coursesHaveNoPQ()?.map((course) => {
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
                setCourseDetails({
                  id: course.id,
                  name: course.name,
                  code: course.course_code,
                  year: course.course_details[0].year,
                  level: course.course_details[0].level,
                  semester: course.course_details[0].semester,
                });
                setShowCreateModal(true);
              }}
            >
              <AiOutlinePlus fill="green" />
              <span>
                Create <span className="font-bold">{course.course_code}</span>{" "}
                PQ
              </span>
            </Button>
          </div>
          {/* <Button
            key="button"
            className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
            onClick={() => {
              setCourseDetails({
                id: course.id,
                name: course.name,
                code: course.course_code,
                year: course.course_details[0].year,
                level: course.course_details[0].level,
                semester: course.course_details[0].semester,
              });
              setShowUpdateModal(true);
            }}
          >
            <AiOutlineEdit fill="green" />
            <span>Update</span>
          </Button> */}
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
            <span className="block text-base text-gray-400">
              These are list of courses that doesnt have past questions yet
            </span>
          </h2>
        </div>
        <div className="hidden md:block">
          <Table
            columns={columns}
            data={mappedData}
            scroll={{ x: 900, y: 300 }}
          />

          <PastQuestionCreate
            setCourseDetails={setCourseDetails}
            courseDetails={courseDetails}
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
          />

          {/* <PastQuestionUpdate
            setCourseDetails={setCourseDetails}
            courseDetails={courseDetails}
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
          /> */}
        </div>
      </Layout>
    </div>
  );
};

export default CreatePastQuestion;
