import React, { useState, useEffect, useRef } from "react";
import Logo from '../assets/img/Logomobile.png';
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.service";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "../common/EventBus";

const Footer = () => {
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


    <footer class="text-center text-lg-start bg-light text-muted">

      <section class="footer">
        <div class="container text-center text-md-start mt-5">
          <i class="fas fa-gem me-3"><NavLink to={"/"} className="nav-link">   <img className="logo" src={Logo} /> </NavLink></i>

        </div>






      </section>


    </footer>


  );
};

export default Footer;