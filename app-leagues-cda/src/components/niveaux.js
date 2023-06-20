
import React, { useState } from "react";
import axios from "axios";

const Niveaux = () => {
  const [summonerName, setSummonerName] = useState("");
  const [playerData, setPlayerdata] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

  const handleInputChange = (event) => {
    setSummonerName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
      )
      .then((response) => {
        setPlayerdata(response.data);
        console.log(playerData);
  })
  .catch((error) => {
    console.error("Une erreur s'est produite lors de la récupération des données :", error);
  });
    }

  return (
    <div className="component">
    <form onSubmit={handleSubmit}>
      <div className="section-bleu">
        <div className="border">
          <h2>Vérifier le niveaux d'un joueur :</h2>
          <p>Nom d'invocateur :</p>
          <label htmlFor="summonerName"></label>
          <input
            id="summonerName"
            type="text"
            placeholder="Entrez un pseudo"
            value={summonerName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button class="btn btn-outline-primary" type="submit">
        Rechercher
      </button>
    </form>

      {Object.keys(playerData).length !== 0 ? (
        <div className="container">
          <div className="resulat">
            <h3>{playerData.name}</h3>
            <p>Summoner level {playerData.summonerLevel}</p>
            <img
              className="img-niveaux"
              width="100"
              height="100"
              src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${playerData.profileIconId}.png`}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Niveaux;
