import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Courses as CourseComponent } from "../../components";
import { Button, Card } from "antd";
import { AiOutlineEdit, AiFillPlusSquare} from "react-icons/ai";
import { useRouter } from "next/router";
import { setCourseDetails } from "../../src/features/courses/courseDetailSlice";

const Courses = () => {
  const { auth, courseDetail } = useSelector((state) => state.persistedReducer);
  const dispatch = useDispatch();

  const [courses, setCourses] = useState(null);
  const [courseId, setCourseId] = useState(null);

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
      `${process.env.NEXT_PUBLIC_API_URL}/courses/`,
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

  useEffect(() => {
    fetchCourses();
  }, [courseDetail]);

  // fetch single course
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
      dispatch(
        setCourseDetails({
          course_id: data.id,
          course_name: data.name,
          course_code: data.course_code,
          course_university: data.course_details[0].university,
          course_department: data.course_details[0].department,
          course_faculty: data.course_details[0].faculty,
          course_year: data.course_details[0].year,
          course_level: data.course_details[0].level,
          course_semester: data.course_details[0].semester,
          author_name: data.author.full_name,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // set course id
  useEffect(() => {
    if (courseId !== null) {
      fetchCourse(courseId);
    }
  }, [courseId]);

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
        <Button
          key="button"
          className="flex cursor-pointer items-center justify-center gap-x-3"
          onClick={() => {
            setCourseId(course.id);
            showModal();
          }}
        >
          <AiOutlineEdit fill="green" />
          <span>Update</span>
        </Button>
      ),
    };
  });

  return (
    <div>
      <Layout defaultSelectedKeys="3">
        <div className="!flex !items-center justify-between mb-4 pb-4 border-b">
          <h2 className="text-4xl font-bold">Courses</h2>
          <Button
            key="button"
            className="!flex cursor-pointer items-center justify-center gap-x-3"
            onClick={() => {
              setCourseId(course.id);
              showModal();
            }}
          >
            <AiFillPlusSquare fill="green" />
            <span>Add Course</span>
          </Button>
        </div>

        {/* For desktop  view */}
        <div className="hidden md:block">
          <CourseComponent
            visible={visible}
            setVisible={setVisible}
            data={mappedData}
            courseId={courseId}
            setCourseId={setCourseId}
          />
        </div>

        {/* For mobile view */}
        <div className="md:hidden">
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
                  <Button
                    key="button"
                    className="mt-4 flex cursor-pointer items-center justify-center gap-x-3 text-lg"
                    onClick={() => {
                      setCourseId(course.id);
                      showModal();
                    }}
                  >
                    <AiOutlineEdit fill="green" />
                    <span>Update</span>
                  </Button>
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
