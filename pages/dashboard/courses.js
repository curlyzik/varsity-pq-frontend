import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Layout,
  Courses as CourseComponent,
} from "../../components";
import { Card } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";

const Courses = () => {
  const { auth } = useSelector((state) => state.persistedReducer);

  const [courses, setCourses] = useState();
  const [courseId, setCourseId] = useState(null);
  const [courseDetails, setCourseDetails] = useState();

  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const showModal = () => {
    setVisible(true);
  };

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

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourse = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setCourseDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      action: (
        <div
          onClick={() => {
            showModal();
            setCourseId(course.id);
          }}
          className="flex cursor-pointer items-center justify-center gap-x-3"
        >
          <AiOutlineEdit fill="green" />
          <span>Update</span>
        </div>
      ),
    };
  })

  useEffect(() => {
    if (courseId !== null) {
      fetchCourse(courseId);
    }
  }, [courseId]);

  return (
    <div>
      <Layout defaultSelectedKeys="3">
        <div>
          <h2 className="mb-6 border-b pb-2 text-4xl font-bold">Courses</h2>
        </div>
        {/* For desktop  view */}
        <div className="hidden md:block">
          <CourseComponent
            visible={visible}
            setVisible={setVisible}
            data={mappedData}
            setCourseId={setCourseId}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
          />
        </div>

        {/* For mobile view */}
        <div className="block md:hidden">
          <div className="!flex !flex-col !gap-y-6">
            {courses?.map((course) => (
              <Card className="!border-2" key={course.id}>
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
