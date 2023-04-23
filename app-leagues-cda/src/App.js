import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BoardUser from "./pages/BoardUser";
import BoardModerator from "./pages/BoardModerator";
import BoardAdmin from "./pages/BoardAdmin";
import Champions from "./pages/Champions";
import Logo from './assets/img/Logo.png';

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="menu">
       <ul className="nav-list">
      <li>
        <NavLink to={"/"} className="navbar">
        <img className="logo" src={Logo}/>
        </NavLink>
        </li>
        <div className="navbar-nav-1">
          <li className="nav-item">
            <NavLink to={"/home"} className="nav-link">
             Home 
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={"/Champions"} className="nav-link">
            Champions 
            </NavLink>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <NavLink to={"/mod"} className="nav-link">
                Moderator Board
              </NavLink>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <NavLink to={"/admin"} className="nav-link">
                Admin Board
              </NavLink>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <NavLink to={"/user"} className="nav-link">
                User
              </NavLink>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav-2">
            <li className="nav-item">
              <NavLink to={"/profile"} className="nav-link">
                {currentUser.username}
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
               Déconnexion 
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav-3">
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link">
                Connexion
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={"/register"} className="nav-link">
                S'inscrire  
              </NavLink>
            </li>
          </div>
        )}
        </ul>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/champions" element={<Champions />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
