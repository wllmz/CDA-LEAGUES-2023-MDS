import React from "react";
import Ranks from "../components/Ranks";
import akali from "../assets/img/akali-classement.png";
import classement from "../assets/img/classement.png";

const Rank = () => {
  return (
    <div className="container-fluid text-center">
      <div class="row justify-content-md-center" id="section">
        <div class="col col-lg-5" id="home">
          <h1 id="home">Bienvenue sur</h1>
          <img className="logo-page" src={classement} />
        </div>
        <div class="col-md-auto">
          <a>
            {" "}
            <img className="img-champions" src={akali} />
          </a>
        </div>
      </div>

      <Ranks />
    </div>
  );
};

export default Rank;
