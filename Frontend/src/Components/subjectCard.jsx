import React, { useState, useEffect } from "react";
import styles from "./styles/subjectCard.module.css";
import { getSubjectDetails } from "../Services/subject";
import { toast } from "react-toastify";

const SubjectCard = ({ userID, subID }) => {
  const [subjectDetail, setSubjectDetail] = useState("");

  useEffect(() => {
    async function getDetails() {
      const { data2, err2 } = await getSubjectDetails(subID);
      if (err2 === undefined) {
        setSubjectDetail(data2);
        console.log(data2);
        //p.history.push(data);
      } else {
        if (err2.response && err2.response.data) {
          toast.error(err2.response.data.message);
        } else toast.error("Something went wrong");
      }
    }
    getDetails();
    return null;
  }, []);

  return (
    <React.Fragment>
      <div className={`col-md-3 col-12 ${styles.projectCard}`}>
        <div className={styles.color}>
          {/* <h5 className={`card-title ${styles.name}`}>{name}</h5> */}
        </div>
        <br />
        <p className="card-text">Subject : {subjectDetail.name}</p>
        <p className="card-text">
          Faculty : {subjectDetail.teacher && subjectDetail.teacher.name}
        </p>
        <button
          className={`btn btn-info ${styles.button}`}
          onClick={() => {
            window.location.assign("/user/" + userID + "/subject/" + subID);
          }}
        >
          View
        </button>
      </div>
    </React.Fragment>
  );
};

export default SubjectCard;
