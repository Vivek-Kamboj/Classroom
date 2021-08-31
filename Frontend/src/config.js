const backendURL = "https://classroom-backend.vercel.app/";

export const registerUserUrl = () => {
  return backendURL + "api/user/signup";
};

export const loginUserUrl = () => {
  return backendURL + "api/user/signin";
};

export const getUserDataByIdUrl = (id) => {
  return backendURL + "api/user/" + id;
};

export const createNewSubjectUrl = () => {
  return backendURL + "api/subject/";
};

export const joinNewSubjectUrl = () => {
  return backendURL + "api/subject/join";
};

export const getSubjectDataByIdUrl = (id) => {
  return backendURL + "api/subject/" + id;
};

export const getAllStudentsByIdUrl = (id) => {
  return backendURL + "api/user/?subjectId=" + id;
};

const toExport = {
  registerUserUrl,
  loginUserUrl,
  getUserDataByIdUrl,
  createNewSubjectUrl,
  joinNewSubjectUrl,
  getSubjectDataByIdUrl,
  getAllStudentsByIdUrl,
};

export default toExport;
