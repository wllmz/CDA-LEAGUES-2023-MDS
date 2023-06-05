import React from 'react';
import Review_Match from '../components/Review_Match'
import Review_Conseil from '../components/Review_Conseil'
import Jinx from '../assets/img/Jinx-user.png';
import AuthService from "../services/auth.service";

const Review_M = () => {
    const currentUser = AuthService.getCurrentUser();
  
      return (
          <div>
                 <div className="container-fluid text-center">
      <div class="row justify-content-md-center" id='section'>
        <div class="col col-lg-5" id="home">
        <h1 id="home">Bienvenue sur</h1>
        
         <span id='user'>{currentUser.leagues} </span> 
        </div>
        <div class="col-md-auto">
        <a> <img className="img-champions" src={Jinx}/></a> 
        </div>
        </div>
        <div className="page-profile">
              <Review_Match/>
              </div>
              </div>
          </div>
      );
  };

export default Review_M;