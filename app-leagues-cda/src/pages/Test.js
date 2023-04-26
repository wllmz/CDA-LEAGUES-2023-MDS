import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";


const App = () => {
    const [searchText, setSearchText ] =  useState("");
    const [playerData, setPlayerdata ] =  useState({});

    const [puuid, setPuuid] = useState(''); // PUUID du joueur
    const [matchIds, setMatchIds] = useState([]); // Tableau des IDs de matchs

    const API_KEY = "RGAPI-c8735274-1237-4c6f-976a-04e7ee6f7011";
    
    const currentUser = AuthService.getCurrentUser();

    function serachForPlayer(event) {
        // et up the correct api call 
        var APICallString ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + API_KEY ; 
        
        // handle the api call 
        axios.get(APICallString).then(function(response){
            setPlayerdata(response.data);
            console.log(playerData);
        
        }).catch(function(error) {
            console.log("error");
        });
    }

    console.log(playerData);

    useEffect(()=>{

        if (currentUser.leagues){  axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`) 
         .then(response => {
           console.log(response)
           setPlayerdata(response.data);
           console.log(playerData);
         })

     .catch(error => {
       console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
     });}
    },[currentUser.leagues]
    )


    useEffect(()=>{

        if (currentUser.leagues){  axios.get(`https://euw1.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerData.puuid}ids?api_key=${API_KEY}`) 
         .then(response => {
           console.log(response)
           setPuuid(response.data);
           console.log(matchIds);
         })

     .catch(error => {
       console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
     });}
    },[currentUser.leagues]
    )


    return (
        <div>
      <label htmlFor="puuid">PUUID:</label>
      <input type="text" id="puuid" value={playerData.puuid}  />
      <button>Fetch match IDs</button>
      <ul>
        {matchIds.map((matchId) => (
          <li key={matchId}>{matchId}</li>
        ))}
      </ul>
    
            <div className='niveaux'>        
            {JSON.stringify(playerData) !='{}' ?
           <> <p>{playerData.name}</p>
           <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <p> Summoner level {playerData.summonerLevel}</p>
            <p id='puuid'> puuid : {playerData.puuid}</p>
             </>
           : <> </>
            
            } 
            </div>
        </div>
        
    );
};

export default App;