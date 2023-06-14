import React, { useState } from 'react';
import axios from 'axios';



const Niveaux = () => {
    const [searchText, setSearchText ] =  useState("");
    const [playerData, setPlayerdata ] =  useState({});

    
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
        
        <div className='menu'>
            <div className='salut'>
            <h1>League of legends Player Searcher</h1>
            <input type="text" onChange={e => setSearchText(e.target.value)}></input>
            <button onClick={e=> serachForPlayer(e)}> Search for player</button>
             
        
            {JSON.stringify(playerData) !='{}' ?
           <> <p>{playerData.name}</p>
           <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <p> Summoner level {playerData.summonerLevel}</p>
             </>
           : <> <p>Veuillez entre votre nom</p></>
            
            } 
        </div>
        </div>
        
    );
};

export default Niveaux;
