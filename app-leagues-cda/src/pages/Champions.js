import React from 'react';
import Champion from '../components/Champion'
import thresh from '../assets/img/thresh-champions.png';
import Logo from '../assets/img/champions.png';

const Champions = () => {
    return (

        <div className="container-fluid text-center">
        <div class="row justify-content-md-center" id='section'>
          <div class="col col-lg-5" id="home">
          <h1 id="home">Découvrez les</h1>
           <img className="logo-page" src={Logo}/>
          </div>
          <div class="col-md-auto">
          <a> <img className="img-champions" src={thresh}/></a> 
          </div>
        
        </div> 
        <br></br>
      <Champion/>
      </div>
           
    );
};

export default Champions;