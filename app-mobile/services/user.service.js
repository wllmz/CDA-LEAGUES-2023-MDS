import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://172.20.10.13:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};



const getAdminBoard = async () => {
  const user = await AsyncStorage.getItem('user');
  const parsedUser = JSON.parse(user);
  const token = parsedUser ? parsedUser.token : '';

  return axios.get(API_URL + 'admin', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
}

export default UserService;
