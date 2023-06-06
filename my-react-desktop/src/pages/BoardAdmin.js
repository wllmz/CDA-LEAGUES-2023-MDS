import React, { useState, useEffect, useRef } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import Home from "./Home";

const BoardAdmin = () => {
  const [content, setContent] = useState();
  const [user, setUser] = useState();


  useEffect(() => {

    if (!user) {
      AuthService.getAllUsers().then((value) => {
        const leagues = value.data.map((u) => u.leagues);
        setUser(leagues);
      });
    }
    




    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, [user]);


  function handleClick(user) {
    const url = `profile/${user}`;
    window.location.href = url;
  }


  return (
    <div className="container-fluid text-center">
<div className="home">
<Home/>

</div>
    <div className="container text-center" >
      <div className="admin">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" id="all">All user</th>
              <th scope="col" id="all">Profile</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 
    {user && user.map((league, index) => (
            <div className="alluser">
      <p id="leaguesuser" key={index}>{league}</p>
      </div>
    ))}

              </td>
              <td> 
               {user && user.map((league, index) => (
            <div className="bouttonprofile">
<button type="button" class="btn btn-primary"onClick={() => handleClick(league)}>Voir match </button>
      </div>
    ))}
              </td>




            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    </div>
  );
};



export default BoardAdmin;
