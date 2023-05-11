const ComentServices = require("../services/comment.services");

exports.getAllComment = async (req, res) => {
  try {
    const comments = await ComentServices.getAllComment();
    res.json({ data: comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comments = await ComentServices.createComment(req.body);
    res.json({ data: comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comments = await ComentServices.getCommentById(req.params.id);
    res.json({ data: comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comments = await ComentServices.updateComment(req.params.id, req.body);
    res.json({ data: comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comments = await ComentServices.deleteComment(req.params.id);
    res.json({ data: comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
