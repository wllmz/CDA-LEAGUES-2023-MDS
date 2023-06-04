const controllerComment = require("../controllers/comment.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/comment",[authJwt.verifyToken, authJwt.isAdmin],controllerComment.getAllComment);

  // app.get("/api/comment/:id", [authJwt.verifyToken], controllerComment.getCommentByIdComment);

  
  app.get("/api/comment/:leagues/:gameId", [authJwt.verifyToken], controllerComment.getCommentById);

  app.post("/api/comment",[authJwt.verifyToken, authJwt.isAdmin], controllerComment.createComment);

  app.put("/api/comment/:id",[authJwt.verifyToken, authJwt.isAdmin], controllerComment.updateComment);

  app.delete("/api/comment/:id",[authJwt.verifyToken, authJwt.isAdmin], controllerComment.deleteComment);

};
