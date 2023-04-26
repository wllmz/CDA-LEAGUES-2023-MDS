import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";

const App = () => {
  const [playerData, setPlayerdata ] =  useState({});
  const [matchIds, setMatchIds] = useState([]);
  const API_KEY = "RGAPI-c1a6d3b3-5466-49e3-b4d3-1cbfd5dbf3c0";
  const COUNT = 20;

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser.leagues) {
      axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`)
        .then(response => {
          const puuid = response.data.puuid;
          axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${COUNT}&api_key=${API_KEY}`)
            .then(response => {
              setMatchIds(response.data);
            })
            .catch(error => {
              console.log(error);
            });
          setPlayerdata(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [currentUser.leagues]);

  return (
    <div className=''>        
      <p id='puuid'> puuid : {playerData.puuid}</p>
      <div>
        <h2>Liste des dernières parties jouées :</h2>
        <ul>
          {matchIds.map(matchId => (
            <li key={matchId}>{matchId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
