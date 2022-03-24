import { useEffect, useState } from "react";

import axios from "axios";

import { Button } from "antd";
import { Select as AntSelect } from "antd";
const { Option } = AntSelect;

import { useGetUniversitiesQuery } from "../../src/services/university";
import { useGetFacultiesQuery } from "../../src/services/faculty";
import { useGetDepartmentsByFacultyQuery } from "../../src/services/department";
import { useGetYearsQuery } from "../../src/services/year";
import { useGetLevelsQuery } from "../../src/services/level";
import { useGetSemesterQuery } from "../../src/services/semester";

import { SearchFilter } from "./../utils/Search";
import { useRouter } from "next/router";
import { useGetPastQuestionsQuery } from "../../src/services/pastquestion";

const Select = ({ uniData, width }) => {
  const router = useRouter();

  const [uniValue, setUniValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [semesterValue, setSemesterValue] = useState("");
  const [courseValue, setCourseValue] = useState("");

  const { data: pqData } = useGetPastQuestionsQuery();
  const { data: universities } = useGetUniversitiesQuery();
  const { data: faculties } = useGetFacultiesQuery();
  const { data: departments } = useGetDepartmentsByFacultyQuery(facultyValue);
  const { data: years } = useGetYearsQuery();
  const { data: levels } = useGetLevelsQuery();
  const { data: semesters } = useGetSemesterQuery();

  const [pqId, setPqId] = useState("");
  const [courses, setCourses] = useState([]);
  const [pastQuestion, setPastQuestion] = useState();

  // Get the list of course
  // filtered by the parameters
  const getCourse = async (
    university,
    faculty,
    department,
    level,
    year,
    semester
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/course/?university__name=${university}&faculty__name=${faculty}&department__name=${department}&level__level=${level}&year__year=${year}&semester__semester=${semester}`
    );
    const data = await res.json();
    setCourses(data);
  };

  const getPastQuestionById = async (id) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/past_question/${id}/`
    );
    setPastQuestion(data.data);
  };

  // Get past question  by course ID
  const setPq = (courseValue) => {
    if (pqData && pqData) {
      for (let pq of pqData) {
        for (let details of pq.pq_details) {
          for (let course of courses) {
            if (
              course.id === details.course_id &&
              details.course_code === courseValue
            ) {
              setPqId(pq.id);
            } else {
              console.log("Not found");
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    getCourse(
      uniValue,
      facultyValue,
      departmentValue,
      levelValue,
      yearValue,
      semesterValue
    );
  }, [
    uniValue,
    facultyValue,
    departmentValue,
    levelValue,
    yearValue,
    semesterValue,
  ]);

  useEffect(() => {
    if (pastQuestion !== undefined) {
      router.push(pastQuestion.file);
    }
  }, [pastQuestion]);

  useEffect(() => {
    setPq(courseValue);
  }, [courseValue]);

  useEffect(() => {
    setCourseValue(null);
    setPqId("");
  }, [
    uniValue,
    facultyValue,
    departmentValue,
    levelValue,
    yearValue,
    semesterValue,
  ]);

  useEffect(() => {
    setDepartmentValue(null);
  }, [facultyValue]);

  useEffect(() => {
    if (uniData) {
      setUniValue(uniData.name);
    }
  }, [uniData]);

  return (
    <>
      <SearchFilter
        handleChange={(value) => !uniData && setUniValue(value)}
        description={"Select University"}
        value={uniData && uniData.name}
        width={width}
      >
        {uniData ? (
          <Option key={uniData.id} value={uniData.name}>
            {uniData.name}
          </Option>
        ) : (
          universities?.map((university) => (
            <Option key={university.id} value={university.name}>
              {university.name}
            </Option>
          ))
        )}
      </SearchFilter>

      <SearchFilter
        handleChange={(value) => setFacultyValue(value)}
        description={"Select Faculty"}
        disabled={uniValue === ""}
        width={width}
      >
        {faculties?.map((faculty) => (
          <Option key={faculty.id} value={faculty.name}>
            {faculty.name}
          </Option>
        ))}
      </SearchFilter>

      <SearchFilter
        handleChange={(value) => setDepartmentValue(value)}
        description={"Select Department"}
        value={departmentValue}
        disabled={facultyValue === ""}
        width={width}
      >
        {departments?.map((department) => (
          <Option key={department.id} value={department.name}>
            {department.name}
          </Option>
        ))}
      </SearchFilter>

      <SearchFilter
        handleChange={(value) => setLevelValue(value)}
        description={"Select level"}
        disabled={departmentValue === null}
        width={width}
      >
        {levels?.map((level) => (
          <Option key={level.id} value={level.level}>
            {level.level}
          </Option>
        ))}
      </SearchFilter>

      <SearchFilter
        handleChange={(value) => setYearValue(value)}
        description={"Select Year"}
        disabled={levelValue === ""}
        width={width}
      >
        {years?.map((year) => (
          <Option key={year.id} value={year.year}>
            {year.year}
          </Option>
        ))}
      </SearchFilter>

      <SearchFilter
        handleChange={(value) => setSemesterValue(value)}
        description={"Select semester"}
        disabled={yearValue === ""}
        width={width}
      >
        {semesters?.map((semester) => (
          <Option key={semester.id} value={semester.semester}>
            {semester.semester}
          </Option>
        ))}
      </SearchFilter>

      <SearchFilter
        description={
          courses.length === 0 ? "No Avalable Course" : "Select Course"
        }
        handleChange={(value) => setCourseValue(value)}
        value={courseValue}
        disabled={courses.length === 0}
        width={width}
      >
        {courses.map((course) => (
          <Option key={course.id} value={course.course_code}>
            {course.course_code}
          </Option>
        ))}
      </SearchFilter>

      {pqId !== "" ? (
        <Button
          type="primary"
          className="border-0 bg-black hover:border hover:border-black hover:bg-white hover:text-black"
          onClick={() => getPastQuestionById(pqId)}
          style={{ width: width }}
        >
          Fetch Past Question
        </Button>
      ) : (
        <Button
          type="primary"
          className="border border-black bg-white text-black hover:border hover:border-black hover:bg-white hover:text-black"
          disabled
          style={{ width: width }}
        >
          No Available Past Question Yet
        </Button>
      )}
    </>
  );
};

export default Select;
