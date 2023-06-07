import React from 'react';
import Ranks_profile from '../components/Ranks_profile'
import Niveaux_profile from '../components/Niveaux_profile'
import Match from '../components/Match';
import Jinx from '../assets/img/Jinx-user.png';
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
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
    <Link to= "/">
  <span>&#8592;</span> Retour
</Link>
    <div className='section-bleu-profile'>
            <div className="border-profile">

    <Niveaux_profile/>

      <Ranks_profile/>
</div>
</div>
<br></br>
<div className="match-profile">
      <Match/>
      </div>
      </div>
    </div>
  );
};

export default Profile;