import React, { useState, useEffect } from "react";
import Logo from "../assets/img/Logomobile.png";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";


const Footer = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

  });
  return (
    <footer class="text-center text-lg-start bg-light text-muted">
      <section class="footer">
        {showAdminBoard ? (
          <div class="container text-center text-md-start mt-5">
            <NavLink to={"/admin"} className="nav-link">
              {" "}
              <img className="logo" src={Logo} />{" "}
            </NavLink>
          </div>
        ) : (
          <div class="container text-center text-md-start mt-5">
            <NavLink to={"/"} className="nav-link">
              {" "}
              <img className="logo" src={Logo} />{" "}
            </NavLink>
          </div>
        )}
      </section>
    </footer>
  );
};

export default Footer;
