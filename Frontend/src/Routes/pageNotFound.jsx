import React from "react";
import styles from "../Components/styles/pageNotFound.module.css";
import NotFound from "../Components/assets/page-not-found.jpg";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <img className={styles.image} src={NotFound} alt="PageNotFound" />
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
