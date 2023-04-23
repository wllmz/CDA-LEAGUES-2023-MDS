import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Niveaux from "../components/Niveaux";


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
    <div className="container">
 
       <Niveaux/>

     
 </div>
  );
};

export default Home;
