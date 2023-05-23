import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

const Review_Conseil = () => {
  const { matchIds } = useParams();
   const [match, setMatch] = useState([]);
 
  useEffect(() => {
    if (matchIds) {
      axios
        .get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchIds}?api_key=${API_KEY}`)
          .then((response) => {
            match.push(response.data);
            setMatch((prevState) => prevState.concat(match));
          })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matchIds]);

  return <div>



  <h2>Informations des dernières parties jouées :</h2>
  {match.map((matchData) => (
    <div>
      <p>Match ID: {matchData.metadata.matchId}</p>
      <p>Date de début: {matchData.info.gameCreation}</p>
      <p>Durée: {matchData.info.gameDuration}</p>
<div className='equipe'>

      <div className= {matchData.info.teams[0].win ? "Victoire" : "Défaite"}> 
      <p> Résultat : {matchData.info.teams[0].win ? "Victoire" : "Défaite"}</p>
    {matchData.info.participants 
.filter((participant) => participant.teamId === 100)
  .map((participant) => (
    <div className="equipe-card">
    <p>{participant.summonerName}  
    {participant.teamPosition} 
    </p>
    <p>
       kill : {participant.kills} / Death : {participant.deaths} / Assists : {participant.assists}  {" "} 
    </p>  
    <img className='equipe'
        src={
          "http://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/" +
          participant.profileIcon +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>
    <img className='equipe'
        src={
          "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
          participant.championName +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img> 
    </div>
  ))}

</div>
  
<div className={matchData.info.teams[1].win ? "Victoire" : "Défaite"}>
<p> Résultat : {matchData.info.teams[1].win ? "Victoire" : "Défaite"}</p>
{matchData.info.participants
  .filter((participant) => participant.teamId === 200)
  .map((participant) => (
    <div className="equipe-card">
   
    <p>{participant.summonerName} :  {participant.teamPosition} </p>     
     <p>  kill : {participant.kills} / Death : {participant.deaths} / Assists : {participant.assists} / {" "}</p> 
     
      <img className='equipe'
 
        src={
          "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
          participant.championName +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>
      <img className='equipe'
        src={
          "http://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/" +
          participant.profileIcon +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img>


    </div>
  
  ))}
</div>
</div>    

</div>
  ) )}
  


  
</div>  

};

export default Review_Conseil;
