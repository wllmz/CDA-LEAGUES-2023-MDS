
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Logomobile from "../assets/img/Logomobile.png";

import AuthService from "../services/auth.service";


const Connexion = () => {
  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  
  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">Ce champ est obligatoire !</div>
      );
    }
  };
  
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        const validate = await AuthService.login(username, leagues, password);
        if (validate && validate.roles == "ROLE_ADMIN")  {
          navigate("/admin");
        }else {
          setMessage("Connexion impossible.");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setMessage("Connexion impossible. Veuillez vérifier si tous vos champs sont corrects.");
      }
    } else {
      setLoading(false);
    }
  }

    
    

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
                onChange={e => setUsername(e.target.value)}
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
                onChange={e => setLeagues(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
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
                <div
                  className="success" 
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
    </div>
  );
};

export default Connexion;
