import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Logomobile from "../assets/img/Logomobile.png";
import axios from "axios";

import AuthService from "../services/auth.service";

const Register = () => {
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [leaguesacces, setLeaguesacces] = useState(false);

  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          Ce champ est obligatoire !
        </div>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="invalid-feedback d-block">
          Cet e-mail n'est pas valide.
        </div>
      );
    }
  };

  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="invalid-feedback d-block">
          Le nom d'utilisateur doit comporter entre 3 et 20 caractères.
        </div>
      );
    }
  };

  const vleagues = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="invalid-feedback d-block">
          Le nom d'utilisateur leagues n'est pas valide.
        </div>
      );
    }
  };

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="invalid-feedback d-block">
          Le mot de passe doit comporter entre 6 et 40 caractères.
        </div>
      );
    }
  };

  const form = useRef();


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

  const handleRegister = async (e) => {
    e.preventDefault();

    var APICallString =
      "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      leagues +
      "?api_key=" +
      API_KEY;
    axios
      .get(APICallString)
      .then(function (response) {
        //si league est ok
        setLeaguesacces(true);
        setMessage("");
        setSuccessful("false");
        form.current.validateAll();
          AuthService.register(username, email, password, leagues).then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
            },
            (error) => {
              //si league et false ou error
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
        
      })
      .catch(function (error) {
        console.log("error");
        window.alert("Pas de leagues");
      });
  };
  return (
    <div className="col-md-12">
      <div className="inscription">
        <div className="card card-container">
          <img className="logomobile" src={Logomobile} />

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Nom utilisateur :</label>
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
                  <label htmlFor="leagues">Nom utilisateur leagues :</label>
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
                  <label htmlFor="password">Mot de passe :</label>
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
                  <br></br>
                  <button class="btn btn-primary">S'inscrire</button>
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
            <CheckButton style={{ display: "none" }} onChange={handleRegister} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
