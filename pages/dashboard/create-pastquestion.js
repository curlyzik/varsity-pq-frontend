import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../../components";
import { AiOutlineEdit, AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import { CreatePastQuestion as CreatePastQuestionComponent } from "../../components";
import axios from "axios";
import { Button, Popconfirm } from "antd";

const CreatePastQuestion = () => {
  const { auth, courseDetail } = useSelector((state) => state.persistedReducer);
  const router = useRouter();

  const [courseId, setCourseId] = useState(null);
  const [courses, setCourses] = useState(null);

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
            <Popconfirm
              title="Select file format you want to upload"
              icon={<AiOutlineUpload />}
            >
              <Button
                key="button"
                className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
              >
                <AiOutlinePlus fill="green" />
                <a href="#">Create</a>
              </Button>
            </Popconfirm>
          </div>
          <Button
            key="button"
            className="!flex cursor-pointer !items-center !justify-center !gap-x-3"
            onClick={() => {
              setCourseId(course.id);
              showUpdateModal();
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
          <CreatePastQuestionComponent
            data={mappedData}
            courseId={courseId}
            setCourseId={setCourseId}
          />
        </div>
      </Layout>
    </div>
  );
};

export default CreatePastQuestion;
