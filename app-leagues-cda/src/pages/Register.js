import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Logomobile from '../assets/img/Logomobile.png';
import axios from "axios";


import AuthService from "../services/auth.service";



const Register  = () => {

  const api_key = "RGAPI-c1a6d3b3-5466-49e3-b4d3-1cbfd5dbf3c0";

  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [leaguesacces, setLeaguesacces] = useState(false)
  
  const Validleague = () => {
    var APICallString ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ leagues + "?api_key=" + api_key ; 
      
      // handle the api call 
      axios.get(APICallString).then(function(response){
          setLeaguesacces(true);
          console.log(leaguesacces);
      
      }).catch(function(error) {
          console.log("error");
      });
 
  };

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vleagues = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};


const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

  const form = useRef();
  const checkBtn = useRef();


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeLeagues = (e) => {
    const leagues = e.target.value;
    setLeagues(leagues);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    Validleague()
    if (leaguesacces){
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, leagues ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  }
  else {window.alert("Pas de leagues")}
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
         <img className="logomobile" src={Logomobile}/>
      

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username :</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

          
              <div className="form-group">
                <label htmlFor="leagues">Leagues name :</label>
                <Input
                  type="text"
                  className="form-control"
                  name="leagues"
                  value={leagues}
                  onChange={onChangeLeagues}
                  validations={[required, vleagues]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email :</label> 
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="password">Password :</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn">S'inscrire</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );

};

export default Register;
