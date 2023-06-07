const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    username:{type: String, required: true},
    body:{type : String, required: true},
    leagues: {type : String, required: true},
    gameId: {type : String, required: true}
  })
);


module.exports = Comment;
