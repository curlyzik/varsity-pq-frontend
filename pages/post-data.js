import { Button } from "antd";
import React from "react";

import { faculty } from "../helpers/facultyData";
import {
  agric,
  arts,
  bio,
  medicine,
  physical,
  pharmacy,
  engineering,
  dentistry,
  education,
  social,
  law,
  veterinary,
  management,
  health,
} from "../helpers/departmentData";

import {
  storeFacultyDataToDB,
  storeDepartmentDataToDB,
} from "../helpers/storeDataToDB";

const PostData = () => {
  const createFaculties = async () => {
    await storeFacultyDataToDB(faculty);
  };

  const createDepartments = async () => {
    await storeDepartmentDataToDB(veterinary, "Faculty of Veterinary Medicine");
  };

  return (
    <div className=" flex gap-x-3 p-6">
      <Button onClick={createFaculties}>Create Faculty</Button>
      <Button onClick={createDepartments}>Create Departments</Button>
    </div>
  );
};

export default PostData;
