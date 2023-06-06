import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import BoardAdmin from "./pages/BoardAdmin";
import Logo from './assets/img/Logomobile.png';
import Icon from './assets/img/Icon.png';
import Footer from './components/Footer';
import Review_Match from "./pages/Review_M";
import Review_Conseil from "./pages/Review_C";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; 



// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";


const App = () => {

  const [showAdminBoard, setShowAdminBoard] = useState(false);



  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
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
    setShowAdminBoard(false);
  };

  return (
    <div class="container-fluid text-align-center">
<nav class="navbar navbar-expand-lg bg-body-tertiary">
<NavLink to={"/"} className="nav-link">   <img className="logo" src={Logo}/> </NavLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
       <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">


          {showAdminBoard && (
                  <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={"/admin"} className="nav-link">
                Admin Board
              </NavLink>
            </li>
               
    </ul>
          )}


      </ul>



      {showAdminBoard ? (
          
          <ul class="navbar-nav">
         
         <div class="dropdown">
  <img class="btn btn-secondary dropdown-toggle"   data-bs-toggle="dropdown" aria-expanded="false" className="icon" src={Icon}/>
  <ul class="dropdown-menu dropdown-menu-dark">
      <li className="nav-item"><a href="/login" className="nav-link" onClick={logOut}>Déconnexion </a></li>
      </ul>
      </div>
</ul>
         ) : (
          <ul class="navbar-nav">
            <div class="dropdown">
  <img class="btn btn-secondary dropdown-toggle"   data-bs-toggle="dropdown" aria-expanded="false" className="icon" src={Icon}/>
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

    


        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path={`/profile/match/:matchIds/:user`} element={<Review_Match />} />
          <Route path={`/profile/conseil/:matchIds/:user`} element={<Review_Conseil />} />     
       
          <Route path={`profile/:user`} element={<Profile />} />  
        
        </Routes>
      
        <Footer/>
      
    </div>



  );
};

export default App;
