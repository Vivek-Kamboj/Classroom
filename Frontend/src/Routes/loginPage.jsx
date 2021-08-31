import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../Components/styles/forms.module.css";
import { login, isAuthorised } from "../Services/auth";
import jwt_decode from "jwt-decode";

const LoginPage = (p) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthorised()) {
    let id = jwt_decode(localStorage.getItem("token")).foo;
    window.location.assign("/dashboard/user/" + id);
    toast.success("Already Logged In....");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(email, password);
    if (error === undefined) {
      let id = jwt_decode(localStorage.getItem("token")).foo;
      window.location = "/dashboard/user/" + id;
    } else {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else toast.error("Something went wrong");
    }
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
                    Welcome back!
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
                        placeholder="Your email address"
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
                        placeholder="Your password"
                        required={true}
                      ></input>
                    </div>

                    <div className="d-grid">
                      <button
                        className={`btn btn-lg btn-primary btn-block ${styles.btnLogin} text-uppercase fw-bold mb-2`}
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        Don't have an account? &nbsp;
                        <Link to="/signup">Create one</Link>
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

export default LoginPage;
