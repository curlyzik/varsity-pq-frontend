import React from "react";
import { Table } from "..";

const CreatePastQuestion = ({ data, courseId, setCourseId }) => {
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
  return (
    <div>
      <div>
        <Table columns={columns} data={data} scroll={{ x: 900, y: 300 }} />
      </div>
    </div>
  );
};

export default CreatePastQuestion;
