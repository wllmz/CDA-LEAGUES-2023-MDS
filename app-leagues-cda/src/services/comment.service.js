import axios from "axios";

const API_URL = "http://localhost:3000/api/comment";

const getAllComment  = (username, body ) => {
    return axios.get(API_URL);
  };
const getCommentById = () => {
  return axios.get(API_URL);
};

const createComment = () => {
  return axios.get(API_URL);
};

const updateComment = () => {
  return axios.get(API_URL);
};

const deleteComment = () => {
    return axios.get(API_URL);
  };

const CommentServices = {
 getAllComment,
 getCommentById,
 createComment,
 updateComment,
 deleteComment
}

export default CommentServices;
