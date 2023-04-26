import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'RGAPI-c1a6d3b3-5466-49e3-b4d3-1cbfd5dbf3c0';
const PUUID = '0Kv-KOBRH0uCiIPRYLMZR13vyAqMeqCgtHW9huwMFJLV9u4xdMCmnfAvf80uk0_NQKMwqW4j2XytEQ';
const COUNT = 20;

const MatchList = () => {
  const [matchIds, setMatchIds] = useState([]);

  useEffect(() => {
    axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?count=${COUNT}&api_key=${API_KEY}`)
      .then(response => {
        setMatchIds(response.data);
      })
      .catch(error => {
        console.log(`Une erreur est survenue : ${error}`);
      });
  }, []);

  return (
    <div>
      <h2>Liste des dernières parties jouées :</h2>
      <ul>
        {matchIds.map(matchId => (
          <li key={matchId}>{matchId}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
