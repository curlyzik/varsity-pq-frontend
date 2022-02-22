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
    await storeDepartmentDataToDB(agric, "Faculty of Agricultural studies");
  };

  return (
    <div className=" flex gap-x-3 p-6">
      <Button onClick={createFaculties}>Create Faculty</Button>
      <Button onClick={createDepartments}>Create Departments</Button>
    </div>
  );
};

export default PostData;

// Faculty of Veterinary Medicine
// 	Faculty of Physical Sciences
// 	Faculty of Pharmaceutical Sciences
// 	Faculty of Social Sciences
// 	Faculty of Medical Sciences
// 	Faculty of Law
// 	Faculty of Health Sciences & Technology
// 	Faculty of Engineering
// 	Faculty of Education
// 	Faculty of Dentistry
// 	Faculty of Management Studies
// 	Faculty of Biological Sciences
// 	Faculty of Arts
// 	Faculty of Agricultural studies