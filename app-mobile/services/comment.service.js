import axios from "axios";


const API_URL = "https://api.wllmz.fr/api/comment";



const getAllComment  = () => {
    return axios.get(API_URL);
  };
  
const getCommentById = async (id) => {
  return axios.get( API_URL + "/" + id);
};


const createComment = () => {
  return axios.post(API_URL);
};  

const updateComment = () => {
  return axios.update(API_URL);
};

const deleteComment = () => {
    return axios.delete(API_URL + "/:id");
  };

const CommentServices = {
 getAllComment,
 getCommentById,
 createComment,
 updateComment,
 deleteComment
}

export default CommentServices;