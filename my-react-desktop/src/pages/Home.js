import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import Logo from '../assets/img/Logo.png';
import Yasuo from '../assets/img/yasuo-home.png';

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container-fluid text-center">
  <div class="row justify-content-md-center" id="section">
    <div class="col col-lg-5" id="home">
    <h1 id="home">Bienvenue sur</h1>
     <img className="logo-page" src={Logo}/>
    </div>
    <div class="col-md-auto">
    <a> <img className="img-champions" src={Yasuo}/></a> 
    </div>
  
  </div> 


 </div>
  );
};

export default Home;
