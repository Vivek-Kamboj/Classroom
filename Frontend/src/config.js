const backendURL = "";

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
  return backendURL + "api/subjects/create";
};

export const joinNewSubjectUrl = () => {
  return backendURL + "api/subjects/join";
};

export const getSubjectDataByIdUrl = (id) => {
  return backendURL + "api/subjects/" + id;
};

export const getAllStudentsByIdUrl = (id) => {
  return backendURL + "api/user/?subjectId=" + id;
};

const toExport = {
  registerUserUrl,
};

export default toExport;
