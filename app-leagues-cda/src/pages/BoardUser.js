import React from "react";
import AuthService from "../services/auth.service";
import CommentServices from "../services/comment.service";

const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();
  const comment = CommentServices.getCommentById();
  
  return (
    <div className="profile">
      <header className="jumbotron">
        <h3>
          <strong>Profile:</strong> {currentUser.username}
        </h3>
      </header>
      <p>
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Leagues:</strong> {currentUser.leagues}
      </p>
      <p>
        <strong>username :</strong> {comment.username}
      </p>
    </div>
  );
};

export default BoardUser;
