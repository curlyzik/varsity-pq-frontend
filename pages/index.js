import Search from "../components/Search";
import { Select } from "antd";
import { useEffect, useState } from "react";
import {
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
} from "../src/services/university";
import axios from "axios";
const { Option } = Select;

export default function Home() {
  const [universities, setUniversities] = useState();
  const [faculties, setFaculties] = useState();
  const [departments, setDepartments] = useState();
  const [courses, setCourses] = useState();
  const [years, setYears] = useState();
  const [levels, setLevels] = useState();
  const [semesters, setSemesters] = useState();

  const [name, setName] = useState("");

  useEffect(() => {
    const getUrls = async () => {
      const [
        universityRes,
        facultyRes,
        departmentRes,
        courseRes,
        yearRes,
        levelRes,
        semesterRes,
      ] = await Promise.all([
        fetch("http://localhost:8000/universities/"),
        fetch(`http://localhost:8000/faculty/?university__name=${name}`),
        fetch(`http://localhost:8000/department/?faculty__name=${name}`),
        fetch("http://localhost:8000/course/"),
        fetch("http://localhost:8000/year/"),
        fetch("http://localhost:8000/level/"),
        fetch("http://localhost:8000/semester/"),
      ]);

      const [universities, faculties, departments, courses, years, levels, semesters] =
        await Promise.all([
          universityRes.json(),
          facultyRes.json(),
          departmentRes.json(),
          courseRes.json(),
          yearRes.json(),
          levelRes.json(),
          semesterRes.json(),
        ]);

      setUniversities(universities);
      setFaculties(faculties)
      setDepartments(departments);
      setCourses(courses);
      setYears(years);
      setLevels(levels);
      setSemesters(semesters);
    };

    getUrls();
  }, [name]);

  const handleChange = (value) => {
    setName(value);
  };

  console.log(name)
  return (
    <div className="flex flex-col gap-y-7">
      <h1 className="text-4xl">Select Past Question</h1>
      <div className="grid grid-cols-3 gap-3">
        <Search handleChange={handleChange} description={"Select University"}>
          {universities?.map((university) => (
            <Option key={university.id} value={university.name}>
              {university.name}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleChange} description={"Select Faculty"}>
          {faculties?.map((faculty) => (
            <Option key={faculty.id} value={faculty.name}>
              {faculty.name}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleChange} description={"Select Department"}>
          {departments?.map((department) => (
            <Option key={department.id} value={department.name}>
              {department.name}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleChange} description={"Select Courses"}>
          {courses?.map((course) => (
            <Option key={course.id} value={course.name}>
              {course.name}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleChange} description={"Select Year"}>
          {years?.map((year) => (
            <Option key={year.id} value={year.year}>
              {year.year}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleChange} description={"Select level"}>
          {levels?.map((level) => (
            <Option key={level.id} value={level.level}>
              {level.level}
            </Option>
          ))}
        </Search>

        <Search handleChange={handleChange} description={"Select semester"}>
          {semesters?.map((semester) => (
            <Option key={semester.id} value={semester.semester}>
              {semester.semester}
            </Option>
          ))}
        </Search>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  console.log(query);
  const [
    universityRes,
    departmentRes,
    courseRes,
    yearRes,
    levelRes,
    semesterRes,
  ] = await Promise.all([
    fetch("http://localhost:8000/universities/"),
    fetch("http://localhost:8000/department/"),
    fetch("http://localhost:8000/course/"),
    fetch("http://localhost:8000/year/"),
    fetch("http://localhost:8000/level/"),
    fetch("http://localhost:8000/semester/"),
  ]);

  const [universities, departments, courses, years, levels, semesters] =
    await Promise.all([
      universityRes.json(),
      departmentRes.json(),
      courseRes.json(),
      yearRes.json(),
      levelRes.json(),
      semesterRes.json(),
    ]);

  return {
    props: {
      universities,
      departments,
      courses,
      years,
      levels,
      semesters,
    },
  };
}
