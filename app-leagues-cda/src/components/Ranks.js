import React, { useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [rank, setRank] = useState(null);
  const [playerData, setPlayerdata] = useState({});

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
        const summonerId = response.data.id;
        axios
          .get(
            `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
          )
          .then((response) => {
            const soloRank = response.data.find(
              (entry) => entry.queueType === "RANKED_SOLO_5x5"
            );
            setRank(soloRank);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // handle the api call
  console.log(playerData);

  return (
    <div className="component">
      <form onSubmit={handleSubmit}>
        <div className="section-bleu">
          <div className="border">
            <h2>Vérifier le rang d'un joueur :</h2>
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

      {rank && (
        <div className="container">
          <div className="resulat-rank">
            <h2>
              {summonerName} est classé {rank.tier} {rank.rank}
            </h2>
            <p>
              {rank.wins} victoires / {rank.losses} défaites
            </p>
            <p> Summoner level {playerData.summonerLevel}</p>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
