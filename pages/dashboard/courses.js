import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Table } from "../../components";
import { Card } from "antd";
import { AiOutlineEdit, AiOutlineSetting } from "react-icons/ai";

const Courses = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);

  const fetchCourses = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/course-create/`,
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

  console.log(courses);

  const columns = [
    {
      title: "Course Code",
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
  ];

  const mappedData = courses?.map((course) => {
    return {
      key: course.id,
      course_code: course.course_code,
      course_name: course.name,
      year: course.course_details[0].year,
      level: course.course_details[0].level,
      semester: course.course_details[0].semester,
      faculty: course.course_details[0].faculty,
      department: course.course_details[0].department,
    };
  });

  return (
    <div>
      <Layout defaultSelectedKeys="3">
        <div>
          <h2 className="mb-6 border-b pb-2 text-4xl font-bold">Courses</h2>
        </div>
        {/* For desktop  view */}
        <div className="hidden md:block">
          <Table
            columns={columns}
            data={mappedData}
            scroll={{ x: 1500, y: 300 }}
          />
        </div>

        {/* For mobile view */}
        <div className="block md:hidden">
          <div className="!flex !flex-col !gap-y-6">
            {courses?.map((course) => (
              <Card className="!border-2">
                <h3 className=" text-2xl font-bold">{course.name}</h3>
                <p className=" mb-2 text-lg italic">{course.course_code}</p>
                <div className="text-base">
                  <p>
                    <b>Year:</b> {course.course_details[0].year}
                  </p>
                  <p>
                    <b>Level:</b> {course.course_details[0].level}
                  </p>
                  <p>
                    <b>Semester:</b>{" "}
                    {course.course_details[0].semester === "2" ? "2nd" : "1st"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Courses;
