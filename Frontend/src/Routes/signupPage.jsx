import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../Components/styles/forms.module.css";
import { register, isAuthorised } from "../Services/auth";

const SignUpPage = (p) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("");

  const data = {
    name: name,
    email: email,
    password: password,
    isTeacher: role === "teacher" ? true : false,
  };

  if (isAuthorised()) {
    p.history.replace("/");
    toast.success("Already Logged In....");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(data);
    //window.location = "/login";
  };

  return (
    <div className={`container-fluid ps-md-0 ${styles.entire}`}>
      <div className="row g-0">
        <div
          className={`d-none d-md-flex col-md-4 col-lg-6 ${styles.bgImage}`}
        ></div>
        <div className="col-md-8 col-lg-6">
          <div className={`${styles.login} d-flex align-items-center py-5`}>
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className={`${styles.loginHeading} mb-4`}>
                    Create a new account
                  </h3>

                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        required={true}
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username"
                        required={true}
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required={true}
                      ></input>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="radio"
                        value="teacher"
                        id="teacher"
                        onChange={(e) => setRole(e.target.value)}
                        name="role"
                        required={true}
                      />
                      <label className={styles.radio} for="teacher">
                        {" "}
                        &nbsp; Teacher
                      </label>

                      <input
                        type="radio"
                        value="student"
                        id="student"
                        onChange={(e) => setRole(e.target.value)}
                        name="role"
                        required={true}
                      />
                      <label className={styles.radio} for="student">
                        {" "}
                        &nbsp; Student
                      </label>
                    </div>

                    <div className="d-grid">
                      <button
                        className={`btn btn-lg btn-primary btn-block ${styles.btnLogin} text-uppercase fw-bold mb-2`}
                        type="submit"
                      >
                        Sign Up
                      </button>
                      <div className="text-center">
                        Already have an account? &nbsp;
                        <Link to="/login">Sign In</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
