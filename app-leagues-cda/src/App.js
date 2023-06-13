import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BoardUser from "./pages/BoardUser";
import Champions from "./pages/Champions";
import Logo from "./assets/img/Logomobile.png";
import Ranks from "./pages/Ranks";
import Icon from "./assets/img/Icon.png";
import Footer from "./components/Footer";
import Review_Match from "./pages/Review_M";
import Review_Conseil from "./pages/Review_C";


import EventBus from "./common/EventBus";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div class="container-fluid text-align-center">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <NavLink to={"/home"} className="nav-link">
          {" "}
          <img className="logo" src={Logo} />{" "}
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
              <NavLink to={"/home"} className="nav-link">
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
                />
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li className="nav-item">
                    <NavLink to={"/user"} className="nav-link">
                      Mon profil
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
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
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link">
                      Inscription
                    </NavLink>
                  </li>
                </ul>
              </div>
            </ul>
          )}
        </div>
      </nav>

      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/ranks"} element={<Ranks />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/champions" element={<Champions />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path={`match/:matchIds`} element={<Review_Match />} />
        <Route path={`conseil/:matchIds`} element={<Review_Conseil />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
