import React from "react";
import SubjectCard from "./subjectCard";
import styles from "./styles/dashboard.module.css";

const Dashboard = (props) => {
  const subjects = props.details.subjects;

  console.log(subjects);
  return (
    <React.Fragment>
      <div className={`container ${styles.subjects}`}>
        <div className={`row ${styles.section}`}>
          {subjects &&
            subjects.map((x) => (
              <SubjectCard userID={props.details._id} subID={x} />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
