import React, { useState, useEffect } from "react";
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

import Review_Conseil from "./pages/Review_C";
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
{showAdminBoard ? (
  <div>
<NavLink to={"/"} className="nav-link">   <img className="logo" src={Logo}/> </NavLink>
    </div>
    ) : (   
      <div>
<NavLink to={"/login"} className="nav-link">   <img className="logo" src={Logo}/> </NavLink>
    </div>

    )}
       <div class="collapse navbar-collapse" id="navbarSupportedContent">



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
          <Route exact path="/login" element={<Login />} />
          <Route path="/" element={<BoardAdmin />} />
          <Route path={`/profile/conseil/:matchIds/:user`} element={<Review_Conseil />} />     
          <Route path={`profile/:user`} element={<Profile />} />  
  
        </Routes>
      
        <Footer/>
      
    </div>



  );
};

export default App;
