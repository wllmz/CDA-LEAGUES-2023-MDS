import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Logomobile from "../assets/img/Logomobile.png";
import axios from "axios";

import AuthService from "../services/auth.service";

const Register = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [leaguesacces, setLeaguesacces] = useState(false);
  const [message, setMessage] = useState("");

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
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;
    if (
      value.length < 8 ||
      value.length > 40 ||
      !upperCaseRegex.test(value) ||
      !numberRegex.test(value) ||
      !specialCharRegex.test(value)
    ) {
      return (
        <div className="invalid-feedback d-block">
          Le mot de passe doit comporter entre 8 et 40 caractères, contenir au
          moins une lettre majuscule, au moins un chiffre et un caractères
          spéciale.
        </div>
      );
    }
  };

  const form = useRef();
  const checkBtn = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      var APICallString =
        "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        leagues +
        "?api_key=" +
        API_KEY;
      const response = await axios.get(APICallString);
      setLeaguesacces(true);
      setMessage(""); // Réinitialisation du message
      setSuccessful(false); // Réinitialisation du succès

      form.current.validateAll(); // Validation de tous les champs du formulaire

      if (checkBtn.current.context._errors.length === 0) {
        // Vérification si aucun message d'erreur n'a été généré lors de la validation des champs du formulaire
        try {
          // Appel à la méthode AuthService.register() pour effectuer l'inscription
          const response = await AuthService.register(
            username,
            email,
            password,
            leagues
          );
          setMessage(response.data.message); // Mise à jour du message avec la réponse de l'inscription
          setSuccessful(true); // Indication de succès de l'inscription
        } catch (error) {
          // Gestion des erreurs lors de l'inscription
          const errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(errorMessage); // Mise à jour du message avec le message d'erreur
          setSuccessful(false); // Indication d'échec de l'inscription
        }
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      window.alert("Pas de leagues");
    }
  };

  return (
    <div className="col-md-12">
      <div className="inscription">
        <div className="card card-container">
          <img className="logomobile" src={Logomobile} />

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div className="formulaire">
                <div className="form-group">
                  <label htmlFor="username">Nom utilisateur :</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    onChange={(e) => setLeagues(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="success" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
