import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";


const register = (username, email, password, leagues, id ) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    leagues,
    id,
  });
};



const getAllUsers = (username, email, leagues) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
 
  return axios.get(API_URL + "getallusers", {
    params: {
      username,
      email,
      leagues
    },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .catch(error => {
    console.error('Error during API call', error);
  });
};




const login = (username, leagues ,password) => {

  
  return axios
    .post(API_URL + "signin", {
      username,
      leagues,
      password ,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response)
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
