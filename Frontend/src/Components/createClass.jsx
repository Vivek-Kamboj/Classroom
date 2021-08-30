import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../Components/styles/forms.module.css";
import Navbar from "./navbar";
import { isAuthorised } from "../Services/auth";
import { createSubject } from "../Services/subject";
import { getUserDetails } from "../Services/user";

const CreateClass = (p) => {
  const [userDetail, setUserDetail] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [conferenceLink, setConferenceLink] = useState("");
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

  const data = {
    userId: p.match.params.id,
    subjectName: subjectName,
    description: description,
    link: conferenceLink,
    subjectCode: subjectCode,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubject(data);
  };

  return (
    <React.Fragment>
      <Navbar details={userDetail} />
      <div
        className={`col-8 mx-auto my-2 border p-2 align-items-center ${styles.createClass}`}
      >
        <h3 className={`${styles.loginHeading} mb-4`}>
          Create a new classroom
        </h3>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="form-floating mb-3">
            <label htmlFor="Subject Name" className="form-label">
              Subject Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter subject name"
              required={true}
            />
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="Subject Description" className="form-label">
              Subject Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="floatingInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter subject description"
              required={true}
            ></textarea>
          </div>

          <div className="form-floating mb-3">
            <label htmlFor="Conference Link" className="form-label">
              Conference Link :
            </label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={conferenceLink}
              onChange={(e) => setConferenceLink(e.target.value)}
              placeholder="Enter conference link"
              required={true}
            />
          </div>

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
              Create
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateClass;
