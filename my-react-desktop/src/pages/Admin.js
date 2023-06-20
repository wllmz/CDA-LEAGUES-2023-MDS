import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Home from "../components/Home";

const Admin = () => {
  const [user, setUser] = useState();
 
  useEffect(() => {
    if (!user) {
        AuthService.getAllUsers()
            .then(response => {
                const leagues = response.data.map(u => u.leagues);
                setUser(leagues);
            })
            .catch(error => {
                console.error("Error in getting all users", error);
            });
    }
}, []);

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

export default Admin;
