import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Home from "./pages/Accueil";
import Profile from "./pages/Profile";
import MonProfile from "./pages/MonProfile";
import Champions from "./pages/Champions";
import Ranks from "./pages/Ranks";
import Footer from "./components/Footer";
import ReviewMatch from "./pages/Review_M";
import ReviewConseil from "./pages/Review_C";
import Menu from "./components/Menu";




const App = () => {
  return (
   <div className="app">
<Menu/>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/ranks"} element={<Ranks />} />
        <Route exact path="/connexion" element={<Connexion />} />
        <Route exact path="/champions" element={<Champions />} />
        <Route exact path="/inscription" element={<Inscription />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/mon-profile" element={<MonProfile />} />
        <Route path={`match/:matchIds`} element={<ReviewMatch />} />
        <Route path={`conseil/:matchIds`} element={<ReviewConseil />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
