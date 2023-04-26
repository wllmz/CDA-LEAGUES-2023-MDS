import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";



const Niveaux = () => {
    const [playerData, setPlayerdata ] =  useState({});
    const API_KEY = "RGAPI-c1a6d3b3-5466-49e3-b4d3-1cbfd5dbf3c0";
    
    const currentUser = AuthService.getCurrentUser();


    useEffect(()=>{

        if (currentUser.leagues){  axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`) 
         .then(response => {
           console.log(response)
           setPlayerdata(response.data);
           console.log(playerData.puuid);
         })

     .catch(error => {
       console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
     });}
    },[currentUser.leagues]
    )

    return (
        
    
        <div className='niveaux'>        
        <p id='puuid'> puuid : {playerData.puuid}</p>
        </div>
        
    );
};

export default Niveaux;