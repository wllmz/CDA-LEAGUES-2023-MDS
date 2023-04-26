import React, { useState } from 'react';
import axios from 'axios';



const Niveaux = () => {
    const [searchText, setSearchText ] =  useState("");
    const [playerData, setPlayerdata ] =  useState({});
    const api_key = "RGAPI-c1a6d3b3-5466-49e3-b4d3-1cbfd5dbf3c0";
    
    function serachForPlayer(event) {
        // et up the correct api call 
        var APICallString ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + api_key ; 
        
        // handle the api call 
        axios.get(APICallString).then(function(response){
            setPlayerdata(response.data);
            console.log(playerData);
        
        }).catch(function(error) {
            console.log("error");
        });
    }

    console.log(playerData);

    return (
        
    
            <div className='niveaux'>
            <h1>League of legends Player Searcher</h1>
            <p> Veuillez entrer votre nom : </p>
            <input id="summonerName" type="text" placeholder="Entrez un pseudo" onChange={e => setSearchText(e.target.value)}></input>
            <button onClick={e=> serachForPlayer(e)}> Search for player</button>
             
        
            {JSON.stringify(playerData) !='{}' ?
           <> <p>{playerData.name}</p>
           <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <p> Summoner level {playerData.summonerLevel}</p>
            <p> puuid : {playerData.puuid}</p>
             </>
           : <> </>
            
            } 
        </div>
        
    );
};

export default Niveaux;