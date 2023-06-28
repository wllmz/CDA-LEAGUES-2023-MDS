import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Logomobile from "../assets/img/Logomobile.png";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">Ce champ est obligatoire !</div>
    );
  }
};

const Login = () => {
  const form = useRef();
 

  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeLeagues = (e) => {
    const leagues = e.target.value;
    setLeagues(leagues);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    setMessage(""); // Réinitialisation du message
    setLoading(true); // Activation du chargement
  
    form.current.validateAll(); 
    if (form.current.validateAll) {
      // Vérification de la validation de tous les champs du formulaire
      // Si tous les champs sont valides, procéder à la connexion via le service d'authentification
      AuthService.login(username, leagues, password).then(
        () => {
          // Redirection vers la page de profil après une connexion réussie
          navigate("/profile");
          window.location.reload(); // Rechargement de la page pour mettre à jour l'état de connexion
        },
        (error) => {
          // Gestion des erreurs lors de la tentative de connexion
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          setLoading(false); // Désactivation du chargement
          setMessage(resMessage); // Mise à jour du message d'erreur
        }
      );
    } else {
      setLoading(false); 
    }
  };

  return (
    <div className="col-md-12">
      <div className="inscription">
        <div className="card card-container">
          <img className="logomobile" src={Logomobile} />
          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Nom utilisateur : </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Nom d'utilisateur leagues : </label>
              <Input
                type="Leagues"
                className="form-control"
                name="Leagues"
                value={leagues}
                onChange={onChangeLeagues}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe : </label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <br></br>
              <button className="btn btn-primary" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Se connecter</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} onChange= {handleLogin} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
