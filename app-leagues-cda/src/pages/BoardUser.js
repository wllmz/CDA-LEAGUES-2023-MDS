import React from "react";
import AuthService from "../services/auth.service";

const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();

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
    </div>
  );
};

export default BoardUser;
