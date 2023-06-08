import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const Niveaux = () => {
  const [playerData, setPlayerdata] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser.leagues) {
      axios
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`
        )
        .then((response) => {
          setPlayerdata(response.data);
        })

        .catch((error) => {
          setPlayerdata(error.message);
        });
    }
  }, [currentUser.leagues]);

  return (
    <div className="">
      {JSON.stringify(playerData) != "{}" ? (
        <>
          <img
            className="img-niveaux"
            width="100"
            height="100"
            src={
              "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" +
              playerData.profileIconId +
              ".png"
            }
          ></img>
          <p> Summoner level {playerData.summonerLevel}</p>
        </>
      ) : (
        <>
          <p>Utilisateur non classé </p>{" "}
        </>
      )}
    </div>
  );
};

export default Niveaux;
