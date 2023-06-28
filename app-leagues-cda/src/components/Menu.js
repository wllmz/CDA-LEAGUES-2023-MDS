
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";
import Icon from "../assets/img/Icon.png";
import Logo from "../assets/img/Logomobile.png";

const Menu = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

    return (
        <div>
             <div class="container-fluid text-align-ceSnter">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <NavLink to={"/"} className="nav-link">
          <img className="logo" src={Logo} alt="Description" />
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/Champions"} className="nav-link">
                Champions
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={"/Ranks"} className="nav-link">
                Classements
              </NavLink>
            </li>

            {currentUser && (
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link">
                  {currentUser.leagues}
                </NavLink>
              </li>
            )}
          </ul>

          {currentUser ? (
            <ul class="navbar-nav">
              <div class="dropdown">
                <img
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="icon"
                  src={Icon}
                  alt="Description" 
                />
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item">
                    <NavLink to={"/mon-profile"} className="nav-link">
                      Mon profil
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a href="/connexion" className="nav-link" onClick={logOut}>
                      Déconnexion{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </ul>
          ) : (
            <ul class="navbar-nav">
              <div class="dropdown">
                <img
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="icon"
                  src={Icon}
                  alt="Description" 
                />
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item">
                    <NavLink to={"/connexion"} className="nav-link">
                      Connexion
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/inscription"} className="nav-link">
                      Inscription
                    </NavLink>
                  </li>
                </ul>
              </div>
            </ul>
          )}
        </div>
      </nav>
</div>
        </div>
    );
};

export default Menu;