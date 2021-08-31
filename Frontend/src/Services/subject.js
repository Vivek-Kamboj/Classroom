import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.js";

axios.defaults.headers.common["authorization"] =
  "Bearer " + localStorage.getItem("token");

export const createSubject = async (data, props) => {
  let err = undefined;
  try {
    //const x =
    await axios.post(config.createNewSubjectUrl(), data);
    // props.history.push("/subject/" + x.data._id);
    console.log("Subject Created", data);
  } catch (e) {
    err = e;
    if (e.response && e.response.data) {
      toast.error(e.response.data.message);
    } else toast.error("Something went wrong");
  }

  return err;
};

export const joinSubject = async (subjectCode, userId, props) => {
  let err = undefined;
  try {
    //const x =
    await axios.post(config.joinNewSubjectUrl(), {
      subjectCode: subjectCode,
      userId: userId,
    });
    // props.history.push("/subject/" + x.data._id);
    console.log("Subject Joined", subjectCode);
  } catch (e) {
    err = e;
    if (e.response && e.response.data) {
      toast.error(e.response.data.message);
    } else toast.error("Something went wrong");
  }

  return err;
};

export const getSubjectDetails = async (id) => {
  let dataToSend = {},
    err = undefined;
  try {
    const data = await axios.get(config.getSubjectDataByIdUrl(id));
    dataToSend = data.data;
    console.log("Subject data sent");
  } catch (error) {
    err = error;
  }
  return { data2: dataToSend, err2: err };
};
