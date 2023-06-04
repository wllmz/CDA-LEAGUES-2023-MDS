const CommentModel = require("../models/comment.model");

exports.getAllComment = async () => {
  return await CommentModel.find();
};

exports.createComment = async (comment) => {
  return await CommentModel.create(comment);
};

// exports.getCommentByIdComment = async (id) => {
//   return await CommentModel.find(id);
// };

exports.getCommentById = async (leagues, gameId) => {
  return await CommentModel.find({ leagues: leagues, gameId: gameId });
};


exports.updateComment = async (id, comment) => {
  return await CommentModel.findByIdAndUpdate(id, comment);
};

exports.deleteComment = async (id) => {
  return await CommentModel.findByIdAndDelete(id);
};
