import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password, leagues ) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    leagues,
  });
};

const getAllUsers = (username, email, leagues ) => {
  return axios.get(API_URL + "getallusers", {
    username,
    email,
    leagues,
  });
};


const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
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
