import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/navbar.module.css";
import { logout } from "../Services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const isTeacher = props.details.isTeacher;
  const name = "Hii " + props.details.name;

  let id = props.match.params.id;
  console.log("id2 is ", id);
  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark sticky-top ${styles.navbar}`}
      >
        <Link
          to={{
            pathname: "/dashboard/" + id,
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
                      pathname: "/createClass/" + id,
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
                      pathname: "/joinClass/" + id,
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
                <Link to="/" className={styles.navLink}>
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
                title={name}
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
