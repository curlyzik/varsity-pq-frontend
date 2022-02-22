import axios from "axios";

export const storeUniDataToDB = async (backendData) => {
  for (let data of backendData) {
    const dataPost = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/universities/`,
      {
        name: data.name,
        address: data.address === "" ? "address" : data.address,
        website: data.website === "" ? "http://example" : data.website,
        type: data.type.toLowerCase(),
        faculty: [],
      }
    );
    console.log(dataPost.data.name);
  }
  console.log("created successfully");
};

export const storeFacultyDataToDB = async (backendData) => {
  for (let data of backendData) {
    const dataPost = await axios.post(
      // `${process.env.NEXT_PUBLIC_API_URL}/faculty/`,
      "https://varsity-pq.herokuapp.com/faculty/",
      {
        name: data.name,
      }
    );
    console.log(dataPost.data.name);
  }
  console.log("created successfully");
};

export const storeDepartmentDataToDB = async (backendData, faculty) => {
  for (let data of backendData) {
    const dataPost = await axios.post(
      // `${process.env.NEXT_PUBLIC_API_URL}/department-create/`,
      "https://varsity-pq.herokuapp.com/department-create/",
      {
        department_name: data.name,
        faculty: faculty,
      }
    );
    console.log(dataPost.data.name);
  }
  console.log("created successfully");
};
