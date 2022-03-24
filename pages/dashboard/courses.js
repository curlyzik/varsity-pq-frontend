import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Courses as CourseComponent } from "../../components";
import { Button, Card, Input, Spin } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  setCourseDetails,
  setCourseId,
} from "../../src/features/courses/courseDetailSlice";
import Link from "next/link";

const Courses = () => {
  const { auth, courseDetail } = useSelector((state) => state.persistedReducer);
  const { courseId } = courseDetail;
  const dispatch = useDispatch();
  const router = useRouter();

  const [courses, setCourses] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [keyWord, setKeyword] = useState("");

  // redirect user when they try this route without
  // beign authenticated
  useEffect(() => {
    if (!auth.accessToken) {
      router.push("/login");
    }
  }, []);

  const showUpdateModal = () => {
    setUpdateVisible(true);
  };

  // fetch all courses
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

  useEffect(() => {
    fetchCourses();
  }, [courseDetail]);

  // filter courses by keyword
  const filterByKeyword = (keyword) => {
    const filteredData = courses?.filter(
      (course) =>
        course?.course_code.toLowerCase().includes(keyword.toLowerCase()) ||
        course?.name.toLowerCase().includes(keyword.toLowerCase())
    );
    return filteredData;
  };

  // fetch new data when keyword changes
  useEffect(() => {
    filterByKeyword(keyWord);
  }, [keyWord]);

  const newCourses = filterByKeyword(keyWord);

  // fetch single courses
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

  // fetch course when course id is not null
  useEffect(() => {
    if (courseId !== null) {
      fetchCourse(courseId);
    }
  }, [courseId]);

  // course to be displayed in the table
  const mappedData = newCourses?.map((course) => {
    return {
      key: course.id,
      course_code: (
        <h3 className="ml-2 font-bold dark:text-black">{course.course_code}</h3>
      ),
      course_name: course.name,
      year: course.course_details[0].year,
      level: course.course_details[0].level,
      semester: course.course_details[0].semester,
      faculty: course.course_details[0].faculty,
      department: course.course_details[0].department,
      action: (
        <Button
          key="button"
          className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
          onClick={() => {
            dispatch(setCourseId(course.id));
            showUpdateModal();
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
        <div className="!mb-4 border-b !pb-2">
          <h2 className="text-4xl font-bold">Courses</h2>
          {courses?.length === 0 ? (
            <div className="dark:text-white">
              You have not created any course yet. Click{" "}
              <>
                <Link href={"/dashboard/create-course"}>
                  <a>here</a>
                </Link>
              </>{" "}
              to create
            </div>
          ) : (
            <div className="dark:text-white">You have {courses?.length} course(s)</div>
          )}
        </div>
        <div>
          <div className="mb-3 md:w-96">
            <Input
              placeholder="search by course code or name."
              size="large"
              allowClear
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
        {/* For desktop  view */}
        <div className="hidden md:block">
          <CourseComponent
            updateVisible={updateVisible}
            updateSetVisible={setUpdateVisible}
            data={mappedData}
            tableLoading={tableLoading}
          />
        </div>

        {/* For mobile view */}
        <div className="md:hidden">
          <div className="!flex !flex-col !gap-y-6">
            {tableLoading && <Spin />}
            {newCourses?.map((course) => (
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
                    {course.course_details[0].semester === "2" ? "2nd" : "1st"}
                  </p>
                  <Button
                    key="button"
                    className="!mt-4 !flex cursor-pointer !items-center !justify-center !gap-x-3 !text-lg dark:!text-white dark:focus:!bg-black"
                    onClick={() => {
                      dispatch(setCourseId(course.id));
                      showUpdateModal();
                    }}
                  >
                    <AiOutlineEdit fill="green" />
                    <span>View & Update</span>
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
