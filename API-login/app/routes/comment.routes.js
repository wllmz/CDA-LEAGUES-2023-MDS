const controller = require("../controllers/comment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });



  app.get("/api/auth/comment", controller.getAllComment);

  app.get("/api/auth/comment/:id", controller.getCommentById);

  app.post("/api/auth/comment", controller.createComment);

  app.put("/api/auth/comment", controller.updateComment);

};
