import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.20.10.13:8080/api/auth/";

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


const login = async (username, leagues, password) => {
  console.log(username);
  const response = await axios
    .post(API_URL + "signin", {
      username,
      leagues,
      password,
    });
  
  const user = response.data;
  console.log(user);
  await AsyncStorage.setItem("user", JSON.stringify(user));
  return user.username;

};

const logout = async () => {
  await AsyncStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};


const getCurrentUser = async () => {
  console.log(user);
  const user = await AsyncStorage.getItem("user");
  return JSON.parse(user);
};




const AuthService = {
  register,
  login,
  logout,
  getAllUsers,
  getCurrentUser,
}

export default AuthService;
