const ComentServices = require("../services/comment.services");
const db = require("../models");
const User = db.user;
var mongoose = require("mongoose");

exports.getAllComment = async (req, res) => {
  try {
    const comments = await ComentServices.getAllComment();
    res.json({ data: comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  const userId = req.body.userId;

const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
