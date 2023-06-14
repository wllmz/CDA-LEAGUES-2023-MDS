import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import Home from "../components/Home";

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
        <Home />
      </div>
      <div className="">
        <h1 className="all"> Récap all user : </h1>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Leagues username : </th>
            <th scope="col">Profile :</th>
          </tr>
        </thead>

        <tbody>
          {user &&
            user.map((league, index) => (
              <tr className="salut">
                <td className="salut">
                  <p id="leaguesuser"> {index + 1}</p>
                </td>
                <td>
                  <p id="leaguesuser">{league}</p>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => handleClick(league)}
                  >
                    Voir match
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardAdmin;
