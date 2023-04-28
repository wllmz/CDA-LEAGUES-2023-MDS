import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";

const App = () => {
  const [playerData, setPlayerdata ] =  useState({});
  const [matchIds, setMatchIds] = useState([]);
  const [match, setMatch] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API
  
  const COUNT = 1;
 const [puuid, setPuuid] = useState("")

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser.leagues) {
      axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`)
        .then(response => {
          setPuuid(response.data.puuid)
          const puuidId = response.data.puuid
          axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuidId}/ids?count=${COUNT}&api_key=${API_KEY}`)
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

  useEffect (() => {
    if (matchIds) {
      const matches = [];
  
      matchIds.forEach(element => {
        axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${element}?api_key=${API_KEY}`)
          .then(response => {
            matches.push(response.data);
            setMatch(prevState => prevState.concat(matches));
          })
          .catch(error => {
            console.log(error);
          });
      }); 
    }
  }, [matchIds]);
  
  
  return (
  
<div>
  <h2>Informations des dernières parties jouées :</h2>
  {match.map((matchData) => (
    <div>
      <p>Match ID: {matchData.metadata.matchId}</p>
      <p>Date de début: {matchData.info.gameCreation}</p>
      <p>Durée: {matchData.info.gameDuration}</p>

    {matchData.info.participants
  .filter((participant) => participant.teamId === 100)
  .map((participant) => (
    <p>
      {participant.summonerName} {participant.teamId} {participant.teamPosition} {participant.championName}{" "}

      <img
        width="100"
        height="100"
        src={
          "https://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/" +
          participant.championName +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>

      <img
        width="100"
        height="100"
        src={
          "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" +
          participant.profileIcon +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>
    </p>
  ))}

<p>Résultat: {matchData.info.teams[0].win ? "Victoire" : "Défaite"}</p>
  
{matchData.info.participants
  .filter((participant) => participant.teamId === 200)
  .map((participant) => (
    <p>
      {participant.summonerName} {participant.teamId} {participant.teamPosition} {participant.championName}{" "}


      <img
        width="100"
        height="100"
        src={
          "https://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/" +
          participant.championName +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>

      <img
        width="100"
        height="100"
        src={
          "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" +
          participant.profileIcon +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>
    </p>
  ))}

    
      <p>Résultat: {matchData.info.teams[1].win ? "Victoire" : "Défaite"}</p>

    </div>
  ))}


  
</div>

  );
};

export default App;
