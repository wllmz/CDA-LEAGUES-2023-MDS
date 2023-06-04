import axios from "axios";

const API_URL = "http://192.168.1.126:8080/api/auth/";

const register = (username, email, leagues, password ) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    leagues, 
    password,
  });
};

const getAllUsers = (username, email, leagues ) => {
  return axios.get(API_URL + "getallusers", {
    username,
    email,
    leagues,
  });
};


const login = (username, leagues, password) => {
  console.log(username);
  return axios
    .post(API_URL + "signin", {
      username,
      leagues,
      password,
    })
    .then((response) => {
      return response.data.username;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};



const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getAllUsers,
  getCurrentUser,
}

export default AuthService;
