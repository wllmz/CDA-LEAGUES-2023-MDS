import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";
import Icon from "../assets/img/Icon.png";
import Logo from "../assets/img/Logomobile.png";



const Menu = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
  
    }, []);
  
    const logOut = () => {
      AuthService.logout();
      setShowAdminBoard(false);
    };
  
    return (
        <div>
                <div class="container-fluid text-align-center">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        {showAdminBoard ? (
          <div>
            <NavLink to={"/admin"} className="nav-link">
              {" "}
              <img className="logo" src={Logo} />{" "}
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to={"/"} className="nav-link">
              {" "}
              <img className="logo" src={Logo} />{" "}
            </NavLink>
          </div>
        )}
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {showAdminBoard ? (
            <ul class="navbar-nav">
              <div class="dropdown">
                <img
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="icon"
                  src={Icon}
                />
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item">
                    <a href="/" className="nav-link" onClick={logOut}>
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
                />
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Connexion
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