import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../config.js";
import { toast } from "react-toastify";

axios.defaults.headers.common["authorization"] =
  "Bearer " + localStorage.getItem("token");

export const register = async (data) => {
  let err = undefined;
  try {
    await axios.post(config.registerUserUrl(), data);
    toast.success("Registered");
  } catch (e) {
    err = e;
    if (e.response && e.response.data) toast.error(e.response.data.message);
    else toast.error("Something went wrong.");
  }
  return err;
};

export const login = async (email, password) => {
  let err = undefined;
  try {
    const x = await axios.post(config.loginUserUrl(), {
      email: email,
      password: password,
    });

    localStorage.setItem("token", x.data.jwt);
    console.log("LoggedIn");
  } catch (e) {
    err = e;
    if (e.response && e.response.data) toast.error(e.response.data.message);
    else toast.error("Something went wrong.");
  }
  return err;
};

export const logout = async () => {
  localStorage.removeItem("token");
};

export const isAuthorised = () => {
  if (!localStorage.getItem("token")) return false;
  let exp = jwtDecode(localStorage.getItem("token")).exp;
  if (!exp || exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return false;
  }
  return true;
};
