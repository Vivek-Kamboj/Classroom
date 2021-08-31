import React from "react";
import SubjectCard from "./subjectCard";
import styles from "./styles/dashboard.module.css";

const Dashboard = (props) => {
  const subjects = props.details.subjectList;
  return (
    <React.Fragment>
      <div className={`container ${styles.subjects}`}>
        <div className={`row ${styles.section}`}>
          {subjects &&
            subjects.map((x) => (
              <SubjectCard
                userID={props.details.id}
                subID={x._id}
                name={x.name}
                faculty={x.faculty}
                count={x.studentCount}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
