import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/navbar.module.css";
import { logout } from "../Services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";

const Navbar = (props) => {
  const isTeacher = props.details.isTeacher;
  const details =
    "Hii " +
    props.details.name +
    "\n" +
    props.details.email +
    "\nRole : " +
    (props.details.isTeacher ? "Teacher" : "Student");

  let id = jwt_decode(localStorage.getItem("token")).foo;
  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark sticky-top ${styles.navbar}`}
      >
        <Link
          to={{
            pathname: "/dashboard/user/" + id,
          }}
          className={`navbar-brand ${styles.brand}`}
        >
          {" "}
          E-Classroom{" "}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${styles.items}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            {isTeacher === true && (
              <li className={`nav-item ${styles.item}`}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Create Class"
                >
                  <Link
                    to={{
                      pathname: "/user/" + id + "/createClass/",
                      details: props.details,
                    }}
                    className={styles.navLink}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </button>
              </li>
            )}
            {isTeacher === false && (
              <li className={`nav-item ${styles.item}`}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Join Class"
                >
                  <Link
                    to={{
                      pathname: "/user/" + id + "/joinClass/",
                      details: props.details,
                    }}
                    className={styles.navLink}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </button>
              </li>
            )}

            <li className={` nav-item ${styles.item}`}>
              <a className="nav-link">
                <Link to="/calender" className={styles.navLink}>
                  Calender
                </Link>
              </a>
            </li>
            <li className={`nav-item ${styles.item}`}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  logout().then(() => {
                    window.location = "/login";
                  });
                }}
              >
                Logout
              </button>
            </li>
            <li className={`nav-item ${styles.item}`}>
              <button
                type="button"
                className="btn btn-dark"
                data-toggle="tooltip"
                data-placement="left"
                data-html="true"
                title={details}
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
