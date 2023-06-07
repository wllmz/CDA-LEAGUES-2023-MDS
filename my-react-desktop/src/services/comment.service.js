import axios from "axios";

const API_URL = "http://localhost:3000/api/comment";

const getAllComment  = () => {
    return axios.get(API_URL);
  };
  
const getCommentById = (id) => {
  return axios.get(API_URL + "/" + id);
};

const createComment = () => {
  return axios.post(API_URL);
};  

const updateComment = () => {
  return axios.update(API_URL);
};

const deleteComment = (id) => {
    return axios.delete(API_URL + "/" + id);
  };

const CommentServices = {
 getAllComment,
 getCommentById,
 createComment,
 updateComment,
 deleteComment
}

export default CommentServices;
