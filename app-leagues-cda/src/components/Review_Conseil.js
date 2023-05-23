import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/auth.service";


const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

const Review_Conseil = () => {
  const { matchIds } = useParams();
  const [matches, setMatches] = useState([]);
   const [puuid, setPuuid] = useState("");
 
   const currentUser = AuthService.getCurrentUser();

   useEffect(() => {
    if (currentUser.leagues) {
      axios
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`
        )
        .then((response) => {
          setPuuid(response.data.puuid);
          const puuidId = response.data.puuid;
          console.log(puuidId)

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser.leagues]);

  useEffect(() => {
    if (matchIds) {
      axios
        .get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchIds}?api_key=${API_KEY}`)
        .then((response) => {
          setMatches(prevMatches => [...prevMatches, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matchIds]);
  
  return (
    
    <div className="container text-center">

   
            {matches.map((matchData, index) => (
                <div key={index}>
    
                <h2 >Informations des dernières parties jouées :</h2>
                <p>Match ID: {matchData.metadata.matchId}</p>
          <p>Durée: {matchData.info.gameDuration}</p>
                <br></br>
       
              
                    
                       


  
   
                    {matchData.info.participants
                     .filter((participant) => participant.puuid === puuid)
                      .filter((participant) => participant.teamId === 100)
                      .map((participant) => (
                        
                        <div
                          className={
                            matchData.info.teams[0].win
                              ? "Victoire-perso"
                              : "Défaite-perso"
                          } 
                        >
                              <h2 id="result"> {matchData.info.teams[0].win ? "Victoire" : "Défaite"}</h2>
                
                          <div
                            className={
                              participant.puuid ? "2" : "none"
                            }
                          >
    
                      <div className="container-fluid text-center">
                      <div class="row justify-content-md-center" id="recap">
                      <div class="col col-lg-4"  id="recap-kda" >
                      <p id="perso">
                             Champions : <br></br>{participant.championName}{"   "} <br></br>
                             Roles :    {participant.teamPosition}{" "}
                              </p>
                              <p id="perso">
                                {" "}
                                Kill : {participant.kills} / Death :{" "}
                                {participant.deaths} / Assists :{" "}
                                {participant.assists}{" "}
                              </p>
                          </div>
                          <div class="col-md-auto">
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`}
                                alt={``}
                              ></img>
                              <br></br>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`}
                                alt={``}
                              ></img>
                              </div>
                              <div class="col-md-auto">
                               <img
                                className="img-niveaux"
                                src={
                                  "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
                                  participant.championName +
                                  ".png"
                                }
                               
                                alt={`Profile icon of ${participant.championName}`}
                              ></img>
                            </div>
                             
                            </div>
                          </div>
                        </div>
                        </div>
                      ))}

                           
                   
                      
                    {matchData.info.participants
                      .filter((participant) => participant.puuid === puuid)
                      .filter((participant) => participant.teamId === 200)
                      .map((participant) => (
                        
                        <div
                          className={
                            matchData.info.teams[1].win
                              ? "Victoire-perso"
                              : "Défaite-perso"
                          } 
                        >
                             <h2 id="result">{matchData.info.teams[1].win ? "Victoire" : "Défaite"} </h2>
                       
                  
                         <div className="container text-center">
                      <div class="row justify-content-md-center" id="recap">
                      <div class="col"  id="recap-kda">
                      
    
                              <p id="perso">
                             Champions :<br></br> {participant.championName}{"   "} <br></br>
                             Roles :    {participant.teamPosition}{" "}
                              </p>
                              <p id="perso">
                                {" "}
                                Kill : {participant.kills} / Death :{" "}
                                {participant.deaths} / Assists :{" "}
                                {participant.assists}{" "}
                              </p>
    </div> 
    <div class="col-md-auto">
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`}
                                alt={``}
                              ></img>
                              <br></br>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`}
                                alt={``}
                              ></img>
                              <img
                                className="object"
                                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`}
                                alt={``}
                              ></img>
    </div>
    <div class="col-md-auto">
                                <img
                                className="img-niveaux"
                                src={
                                  "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
                                  participant.championName +
                                  ".png"
                                }
                                alt={`Profile icon of ${participant.summonerName}`}
                              ></img>
                              </div>
                           
                            </div>
                           
                        </div>
                        </div>
                     
                      ))}
                  </div>
              
           


            ))}
          </div>
     
        
      );
    };



export default Review_Conseil;
