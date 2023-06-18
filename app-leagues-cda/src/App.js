import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BoardUser from "./pages/BoardUser";
import Champions from "./pages/Champions";
import Ranks from "./pages/Ranks";
import Footer from "./components/Footer";
import Review_Match from "./pages/Review_M";
import Review_Conseil from "./pages/Review_C";
import Menu from "./components/Menu";


const App = () => {
  return (
   <div className="app">
<Menu/>
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
