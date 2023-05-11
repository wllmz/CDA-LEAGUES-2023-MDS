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

  app.get("/api/auth/comment",[authJwt.verifyToken, authJwt.isAdmin],controllerComment.getAllComment);

  app.get("/api/auth/comment/:id", [authJwt.verifyToken], controllerComment.getCommentById);

  app.post("/api/auth/comment",[authJwt.verifyToken, authJwt.isAdmin], controllerComment.createComment);

  app.put("/api/auth/comment/:id",[authJwt.verifyToken, authJwt.isAdmin], controllerComment.updateComment);

  app.delete("/api/auth/comment/:id",[authJwt.verifyToken, authJwt.isAdmin], controllerComment.deleteComment);

};
