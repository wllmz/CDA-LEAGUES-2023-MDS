import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const API_KEY = process.env.REACT_APP_API_KEY; 
function App() {
  const [summonerName, setSummonerName] = useState(""); 
  const [rank, setRank] = useState(null);

  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    if (currentUser.leagues) {
      axios
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`
        )
        .then((response) => {
          const summonerId = response.data.id; 
          axios
            .get(
              `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
            )
            .then((response) => {
              console.log(response);
              const soloRank = response.data.find(
                (entry) => entry.queueType === "RANKED_SOLO_5x5"
              ); 
              setRank(soloRank); 
              setSummonerName(response.data[0].summonerName);
            })
            .catch((error) => {
              console.log(error); // Gérer les erreurs de récupération des informations de rang
            });
        })
        .catch((error) => {
          console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
        });
    }
  }, [currentUser.leagues]);

  return (
    <div className="">
      {rank ? (
        <div>
          <h4>
            {summonerName} est classé {rank.tier} {rank.rank}
          </h4>{" "}
          {/* Afficher le rang actuel */}
          <p>
            {rank.wins} victoires / {rank.losses} défaites
          </p>{" "}
          {/* Afficher les statistiques de victoires/défaites */}
        </div>
      ) : (
        <div>
          <h1> salut</h1>
        </div>
      )}
    </div>
  );
}

export default App;
