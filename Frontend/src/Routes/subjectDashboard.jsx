import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Components/navbar";
import styles from "../Components/styles/subjectDashboard.module.css";
import { isAuthorised } from "../Services/auth";
import { getUserDetails, getAllStudents } from "../Services/user";
import { getSubjectDetails } from "../Services/subject";
import { toast } from "react-toastify";

const SubjectDashboard = (p) => {
  const [userDetail, setUserDetail] = useState("");
  const [subjectDetail, setSubjectDetail] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    async function getDetails() {
      const { data, err } = await getUserDetails(p.match.params.userID);
      if (err === undefined) {
        setUserDetail(data);
        //p.history.push(data);
      } else {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else toast.error("Something went wrong");
      }

      const { data2, err2 } = await getSubjectDetails(p.match.params.subID);
      if (err2 === undefined) {
        setSubjectDetail(data2);
        //p.history.push(data);
      } else {
        if (err2.response && err2.response.data) {
          toast.error(err2.response.data.message);
        } else toast.error("Something went wrong");
      }

      const { data3, err3 } = await getAllStudents(p.match.params.subID);
      if (err3 === undefined) {
        setAllStudents(data3);
        //p.history.push(data);
      } else {
        if (err3.response && err3.response.data) {
          toast.error(err3.response.data.message);
        } else toast.error("Something went wrong");
      }
    }
    getDetails();
    return null;
  }, []);

  if (!isAuthorised()) {
    return <Redirect to="/login" />;
  }

  console.log(subjectDetail);
  return (
    <React.Fragment>
      <NavBar {...p} details={userDetail} />
      <div className={`col-md-10 m-auto border ${styles.container}`}>
        <h5>Subject name : {subjectDetail.name}</h5>
        <p> Description: {subjectDetail.description}</p>
        <br />
        <h5>
          {" "}
          Faculty Name : {subjectDetail.teacher && subjectDetail.teacher.name}
        </h5>
        <h6>
          {" "}
          For any subject related queries, contact at{" "}
          {subjectDetail.teacher && subjectDetail.teacher.email}
        </h6>
        <br />
        <p>
          Total no. of student :{" "}
          {subjectDetail.students && subjectDetail.students.length}
        </p>
        <br />
        <h5> List of Students :</h5>
        <br />
        {subjectDetail.students &&
          subjectDetail.students.map((x) => <li> {x} </li>)}
      </div>
    </React.Fragment>
  );
};

export default SubjectDashboard;
