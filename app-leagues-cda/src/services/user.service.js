import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : '';

  return axios.get(API_URL + 'admin', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
}

export default UserService;
