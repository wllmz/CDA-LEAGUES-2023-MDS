import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";



const Niveaux = () => {
    const [searchText, setSearchText ] =  useState("");
    const [playerData, setPlayerdata ] =  useState({});
    const { user } = useParams();

    const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API


    
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
    console.log(user);

    return (
        
    
            <div className=''>        
            {JSON.stringify(playerData) !='{}' ?
           <>
           <img className='img-niveaux' width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <p> Summoner level {playerData.summonerLevel}</p>
             </>
           : <> </>
            
            } 
        </div>
        
    );
};

export default Niveaux;