import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../Components/styles/forms.module.css";
import { isAuthorised } from "../Services/auth";
import { joinSubject } from "../Services/subject";
import { getUserDetails } from "../Services/user";
import Navbar from "./navbar";

const JoinClass = (p) => {
  const [userDetail, setUserDetail] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  useEffect(() => {
    async function getDetails() {
      const { data, err } = await getUserDetails(p.match.params.id);
      if (err === undefined) {
        setUserDetail(data);
        p.history.push(data);
      } else {
        if (err.response && err.response.data) {
          toast.error(err.response.data.message);
        } else toast.error("Something went wrong");
      }
    }
    getDetails();
    return null;
  }, [p.match.params.id]);

  if (!isAuthorised()) {
    toast.error("Not authorised");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await joinSubject(subjectCode, userDetail.id);
  };

  return (
    <React.Fragment>
      <Navbar details={userDetail} />
      <div
        className={`col-8 mx-auto my-2 border p-2 align-items-center ${styles.joinClass}`}
      >
        <h3 className={`${styles.loginHeading} mb-4`}>Join a classroom</h3>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="form-floating mb-3">
            <label htmlFor="Subject Code" className="form-label">
              Subject Code :
            </label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              placeholder="Enter subject code"
              required={true}
            />
          </div>

          <div className="d-grid">
            <button
              className={`btn btn-lg btn-primary btn-block ${styles.btnLogin} text-uppercase fw-bold mb-2`}
              type="submit"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default JoinClass;
