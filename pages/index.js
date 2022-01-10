import Search from "../components/Search";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useGetUniversitiesQuery } from "../src/services/university";
import { useGetFacultiesQuery } from "../src/services/faculty";
import { useGetDepartmentsQuery } from "../src/services/department";
import { useGetYearsQuery } from "../src/services/year";
import { useGetLevelsQuery } from "../src/services/level";
import { useGetSemesterQuery } from "../src/services/semester";
import axios from "axios";
const { Option } = Select;

export default function Home() {
  const [uniValue, setUniValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [levelValue, setLevelValue] = useState("");
  const [semesterValue, setSemesterValue] = useState("");
  const [courses, setCourses] = useState([]);

  const { data: universities } = useGetUniversitiesQuery();
  const { data: faculties } = useGetFacultiesQuery(uniValue);
  const { data: departments } = useGetDepartmentsQuery(facultyValue);
  const { data: years } = useGetYearsQuery();
  const { data: levels } = useGetLevelsQuery();
  const { data: semesters } = useGetSemesterQuery();

  const handleUniversityChange = (value) => {
    setUniValue(value);
  };

  const handleFacultyChange = (value) => {
    setFacultyValue(value);
  };

  const handleDepartmentChange = (value) => {
    setDepartmentValue(value);
  };

  const handleLevelChange = (value) => {
    setLevelValue(value);
  };

  const handleYearChange = (value) => {
    setYearValue(value);
  };

  const handleSemesterChange = (value) => {
    setSemesterValue(value);
  };

  // Using axios to get the list of course 
  // filtered by the parameters in the getCourse function
  const getCourse = async (
    university,
    faculty,
    department,
    level,
    year,
    semester
  ) => {
    const res = await axios.get(
      `http://localhost:8000/course/?university__name=${university}&faculty__name=${faculty}&department__name=${department}&level__level=${level}&year__year=${year}&semester__semester=${semester}`
    );
    console.log(res.data);
    setCourses(res.data);
  };

  for (let course of courses) {
    console.log(course.id)
    console.log(course)
  }

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

  return (
    <div className="flex flex-col gap-y-7">
      <h1 className="text-4xl">Select Past Question</h1>
      <div className="grid grid-cols-3 gap-3">
        <Search
          handleChange={handleUniversityChange}
          description={"Select University"}
        >
          {universities?.map((university) => (
            <Option key={university.id} value={university.name}>
              {university.name}
            </Option>
          ))}
        </Search>

        <Search
          handleChange={handleFacultyChange}
          description={"Select Faculty"}
        >
          {faculties?.map((faculty) => (
            <Option key={faculty.id} value={faculty.name}>
              {faculty.name}
            </Option>
          ))}
        </Search>

        <Search
          handleChange={handleDepartmentChange}
          description={"Select Department"}
        >
          {departments?.map((department) => (
            <Option key={department.id} value={department.name}>
              {department.name}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleLevelChange} description={"Select level"}>
          {levels?.map((level) => (
            <Option key={level.id} value={level.level}>
              {level.level}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleYearChange} description={"Select Year"}>
          {years?.map((year) => (
            <Option key={year.id} value={year.year}>
              {year.year}
            </Option>
          ))}
        </Search>

        <Search
          handleChange={handleSemesterChange}
          description={"Select semester"}
        >
          {semesters?.map((semester) => (
            <Option key={semester.id} value={semester.semester}>
              {semester.semester}
            </Option>
          ))}
        </Search>

        <Search description={"Select Courses"}>
          {courses?.map((course) => (
            <Option key={course.id} value={course.course_code}>
              {course.course_code}
            </Option>
          ))}
        </Search>
      </div>
    </div>
  );
}
