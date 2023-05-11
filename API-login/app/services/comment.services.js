const CommentModel = require("../models/comment.model");

exports.getAllComment = async () => {
  return await CommentModel.find();
};

exports.createComment = async (blog) => {
  return await CommentModel.create(blog);
};
exports.getCommentById = async (id) => {
  return await CommentModel.findById(id);
};

exports.updateComment = async (id, blog) => {
  return await CommentModel.findByIdAndUpdate(id, blog);
};

exports.deleteComment = async (id) => {
  return await CommentModel.findByIdAndDelete(id);
};
