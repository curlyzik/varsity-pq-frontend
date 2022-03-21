import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Table } from "../../components";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { PastQuestionCreate } from "../../components";
import axios from "axios";
import { Button, Card, Spin } from "antd";

const CreatePastQuestion = () => {
  const { auth } = useSelector((state) => state.persistedReducer);

  const router = useRouter();

  const [tableLoading, setTableLoading] = useState(false);

  const [courses, setCourses] = useState(null);

  const [courseDetails, setCourseDetails] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);

  // FETCH ALL COURSES
  const fetchCourses = async () => {
    setTableLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/`,
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    );
    setCourses(data);
    setTableLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // table columns
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

  // get the mapped data
  const mappedData = coursesHaveNoPQ()?.map((course) => {
    return {
      key: course.id,
      course_code: (
        <h3 className="ml-2 font-bold dark:text-black">{course.course_code}</h3>
      ),
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
        </div>
      ),
    };
  });

  return (
    <div>
      <Layout defaultSelectedKeys="4">
        <div className="h-screen">
          <div>
            <h2 className="!mb-4 border-b pb-2 text-4xl font-bold dark:text-white">
              Create Past Question
              <span className="block text-base text-gray-400">
                These are {coursesHaveNoPQ()?.length} course(s) that doesnt have
                past questions yet
              </span>
            </h2>
          </div>
          <div className="hidden md:block">
            <Table
              columns={columns}
              data={mappedData}
              scroll={{ x: 900, y: 300 }}
              loading={tableLoading}
            />

            <PastQuestionCreate
              setCourseDetails={setCourseDetails}
              courseDetails={courseDetails}
              showCreateModal={showCreateModal}
              setShowCreateModal={setShowCreateModal}
              fetchCourses={fetchCourses}
            />
          </div>

          {/* For mobile view */}
          <div className="md:hidden">
            <div className="!flex !flex-col !gap-y-6">
              {tableLoading && <Spin />}
              {coursesHaveNoPQ()?.map((course) => (
                <Card className="!border dark:bg-black" key={course.id}>
                  <h3 className="!text-2xl font-bold">{course.name}</h3>
                  <p className="!mb-2 text-lg italic">{course.course_code}</p>
                  <div className="text-base">
                    <p>
                      <b>Year:</b> {course.course_details[0].year}
                    </p>
                    <p>
                      <b>Level:</b> {course.course_details[0].level}
                    </p>
                    <p>
                      <b>Semester:</b>{" "}
                      {course.course_details[0].semester === "2"
                        ? "2nd"
                        : "1st"}
                    </p>
                    <Button
                      key="button"
                      className="!mt-4 !flex cursor-pointer !items-center !justify-center !gap-x-3 !text-lg dark:text-white dark:focus:bg-black"
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
                      <AiOutlineEdit fill="green" />
                      <span>Create</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreatePastQuestion;
