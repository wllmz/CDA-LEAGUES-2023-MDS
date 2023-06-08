import React, { useState } from "react";
import axios from "axios";

const Niveaux = () => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerdata] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

  function serachForPlayer(event) {
    // et up the correct api call
    var APICallString =
      "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      API_KEY;

    // handle the api call
    axios
      .get(APICallString)
      .then(function (response) {
        setPlayerdata(response.data);
      })
      .catch(function (error) {
        console.log("error");
      });
  }

  return (
    <div className="component">
      <div className="section-bleu">
        <div className="border">
          <h2>Recherche de joueurs :</h2>
          <p> Veuillez entrer votre nom : </p>
          <input
            id="summonerName"
            type="text"
            placeholder="Entrez un pseudo"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="bouttons">
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={(e) => serachForPlayer(e)}
        >
          {" "}
          Rechercher
        </button>
      </div>

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
