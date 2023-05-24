import React from "react";
import AuthService from "../services/auth.service";
import Niveaux_profile from '../components/Niveaux_profile'


const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();
  
  return (
    <div className="container-fluid text-center">
      <div className="user">
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
        <strong>Id:</strong> {currentUser.id}
      </p>
      <Niveaux_profile/>


</div>
    </div>
  );
};

export default BoardUser;
