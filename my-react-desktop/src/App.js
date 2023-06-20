import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";



import Connexion from "./pages/Connexion";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import Review_Conseil from "./pages/Review_C";
import Profile from "./pages/Profile";
import Menu from "./components/Menu";


const App = () => {
  return (
    
<div className="connexion">
  <Menu/>
      <Routes>
        <Route exact path="/" element={<Connexion />} />
        <Route exact path="/login" element={<Connexion />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path={`/profile/conseil/:matchIds/:user/:puuid/`}
          element={<Review_Conseil />}
        />
        <Route path={`profile/:user`} element={<Profile />} />
      </Routes>

      <Footer />
  </div>
  );
};

export default App;
