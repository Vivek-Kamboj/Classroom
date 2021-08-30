import React from "react";
import styles from "./styles/subjectCard.module.css";

const SubjectCard = ({ userID, subID, name, faculty, count }) => {
  return (
    <React.Fragment>
      <div className={`col-md-3 col-12 ${styles.projectCard}`}>
        <div className={styles.color}>
          {/* <h5 className={`card-title ${styles.name}`}>{name}</h5> */}
        </div>
        <br />
        <p className="card-text">Subject Name : {name}</p>
        <p className="card-text">Subject Code : {faculty}</p>
        <p className="card-text">No. of students : {count}</p>
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
