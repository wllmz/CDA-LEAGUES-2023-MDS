import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";


      

const App = () => {
  const [playerData, setPlayerdata ] =  useState({});
  const [matchIds, setMatchIds] = useState([]);
  const [match, setMatch] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API
  
  const COUNT = 5;
 const [puuid, setPuuid] = useState("")

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser.leagues) {
      axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`)
        .then(response => {
          setPuuid(response.data.puuid)
          const puuidId = response.data.puuid
          axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuidId}/ids?count=${COUNT}&sort=asc&api_key=${API_KEY}`)
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
<div className='profile-match'>

  
    {matchData.info.participants 
    .filter((participant) => participant.puuid === puuid)
.filter((participant) => participant.teamId === 100)
  .map((participant) => (
    <div className= {matchData.info.teams[0].win ? "Victoire-perso" : "Défaite-perso"}> 
    <h2> Résultat : {matchData.info.teams[0].win ? "Victoire" : "Défaite"}</h2>
    <div className={participant.puuid ? "particpantpuid" : "none"}>
    <img className='perso-champion'
        src={
          "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
          participant.championName +
          ".png"
        }
        alt={`Profile icon of ${participant.summonerName}`}
      ></img> 
       
    <div className="equipe-card-perso">
    <p id='perso'>{participant.summonerName}  / Poste :  {participant.teamPosition} </p>
    <p id='perso'> Kill : {participant.kills} / Death : {participant.deaths} / Assists : {participant.assists}  {" "} </p>  

    <img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`}
  alt={``}
></img><br></br>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`}
  alt={``}
></img>

  
   </div>
   <button className='perso'>Voir plus </button>
  
    </div>
    </div>
    
  ))}



{matchData.info.participants
    .filter((participant) => participant.puuid === puuid)
  .filter((participant) => participant.teamId === 200)
  .map((participant) => (
<div className={matchData.info.teams[1].win ? "Victoire-perso" : "Défaite-perso"}>
<h2> Résultat : {matchData.info.teams[1].win ? "Victoire" : "Défaite"}</h2>
    <div className={participant.puuid === puuid ? "particpantpuid" : "none"}>
    <div className="equipe-card-perso">

    <img className='perso-champion'
 
 src={
   "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
   participant.championName +
   ".png"
 }
 alt={`Profile icon of ${participant.summonerName}`}
></img>


    <div className='2'> </div>
    <p id='perso'>{participant.summonerName} / Poste :  {participant.teamPosition} </p>     
     <p id='perso'>  Kill : {participant.kills} / Death : {participant.deaths} / Assists : {participant.assists}  {" "}</p> 

     <img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`}
  alt={``}
></img><br></br>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`}
  alt={``}
></img>
<img className='object'
  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`}
  alt={``}
></img>
   
     </div>
     <button className='perso'>Voir plus </button>


    </div>
   </div>
  ))}
</div>
</div>    
  ) )}



  
</div>  
  );
};

export default App;
