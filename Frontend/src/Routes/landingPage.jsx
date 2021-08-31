import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Components/navbar";
import Dashboard from "../Components/dashboard";
import { isAuthorised } from "../Services/auth";
import { getUserDetails } from "../Services/user";
import { toast } from "react-toastify";

const LandingPage = (p) => {
  const [userDetail, setUserDetail] = useState("");

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
  }, []);

  if (!isAuthorised()) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <NavBar {...p} details={userDetail} />
      <Dashboard {...p} details={userDetail} />
    </React.Fragment>
  );
};

export default LandingPage;
