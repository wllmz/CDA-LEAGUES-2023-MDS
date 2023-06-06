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
   
      <div class="row mt-3">
  
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"><NavLink to={"/home"} className="nav-link">   <img className="logo" src={Logo}/> </NavLink></i>
          </h6>
          <p>
          Nous souhaitons offrir aux utilisateurs la possibilité de progresser gratuitement ainsi que d’avoir aussi accès à un maximum d’information de base sur le jeu. 
          </p>
        </div>

        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

          <h6 class="text-uppercase fw-bold mb-4">
            Page site 
          </h6>
          <p>
            <a href="#!" class="text-reset"> <NavLink to={"/home"} className="nav-link">Accueil </NavLink></a>
          </p>
          <p>
            <a href="#!" class="text-reset"><NavLink to={"/Champions"} className="nav-link">Champions </NavLink></a>
          </p>
          <p>
            <a href="#!" class="text-reset"><NavLink to={"/Ranks"} className="nav-link">Classements </NavLink></a>
          </p>
        </div>


        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        
          <h6 class="text-uppercase fw-bold mb-4">
          Se connecter
          </h6>
          {currentUser ? (
          
<div>   
      <p><NavLink to={"/user"} className="nav-link">Mon profil</NavLink></p>
      <p><a href="/login" className="nav-link" onClick={logOut}>Déconnexion </a></p>
 </div>


        ) : (
    <div>
              <NavLink to={"/login"} className="nav-link">
              <p>  Connexion </p>
              </NavLink>
            
              <NavLink to={"/register"} className="nav-link">
          <p>      Inscription </p>  
              </NavLink>
          
      </div>
        )}
        </div>
    

       


        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
     
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i class="fas fa-home me-3"></i> Nice, 80 avenue des acacias </p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            william.martinez065000@gmail.com
          </p>
          <p><i class="fas fa-phone me-3"></i> +33 6 26 52 21 18</p>
        </div>
    
      </div>

    </div>
  </section>
 

</footer>


    );
};

export default Footer;