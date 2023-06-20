import React from "react";
import Review_Conseil from "../components/Review_Conseil";
import Jinx from "../assets/img/Jinx-user.png";
import Logo from "../assets/img/Logo.png";
import Review_Match from "../components/Review_Match";

const Review_C = () => {

  return (
    <div>
      <div className="container-fluid text-center">
        <div class="row justify-content-md-center" id="section">
          <div class="col col-lg-5" id="home">
            <h1 id="home">Bienvenue sur</h1>

            <img className="logo-page" src={Logo} />
            <br></br><h1>ADMIN</h1>
          </div>
          <div class="col-md-auto">
            <a>
              {" "}
              <img className="img-champions" src={Jinx} />
            </a>
          </div>
        </div>
        <div className="page-profile">
          <Review_Conseil />
        </div>
      </div>

      <div className="page-profile">
        <Review_Match />
      </div>
    </div>
  );
};

export default Review_C;
