import axios from "axios";


const API_URL = "http://localhost:3000/api/comment";


const user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.token : '';


const getAllComment  = () => {
  return axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const getCommentById = (id) => {
  return axios.get(API_URL + "/" + id);
};

const createComment = (comment)  => {
  return axios.post(API_URL, comment, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};  

const updateComment = (id) => {
  return axios.put(API_URL + "/" + id, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const deleteComment = (id) => {
  return axios.delete(API_URL + "/" + id, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const CommentServices = {
 getAllComment,
 getCommentById,
 createComment,
 updateComment,
 deleteComment
}

export default CommentServices;
