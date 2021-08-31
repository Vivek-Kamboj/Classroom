import axios from "axios";
import config from "../config.js";

axios.defaults.headers.common["authorization"] =
  "Bearer " + localStorage.getItem("token");

// const data = {
//   id: 123,
//   isTeacher: false,
//   name: "Swatik",
//   subjectList: [
//     {
//       id: 1,
//       name: "Maths",
//       faculty: "acbdef",
//       studentCount: 15,
//     },
//     {
//       id: 2,
//       name: "Science",
//       faculty: "avvvf",
//       studentCount: 25,
//     },
//     {
//       id: 3,
//       name: "c++",
//       faculty: "lkjhg",
//       studentCount: 50,
//     },
//     {
//       id: 4,
//       name: "dsa",
//       faculty: "vfert",
//       studentCount: 20,
//     },
//   ],
// };

export const getUserDetails = async (id) => {
  let dataToSend = {},
    err = undefined;
  try {
    const data = await axios.get(config.getUserDataByIdUrl(id));
    dataToSend = data.data;
    console.log("User data sent");
  } catch (error) {
    err = error;
  }
  return { data: dataToSend, err: err };
};

//const tempData = ["swatik", "vivek", "nikhil", "harsh"];
export const getAllStudents = async (id) => {
  let dataToSend = {},
    err = undefined;
  try {
    const data = await axios.get(config.getAllStudentsByIdUrl(id));
    dataToSend = data.data;
    console.log("User data sent");
  } catch (error) {
    err = error;
  }
  return { data3: dataToSend, err3: err };
};
