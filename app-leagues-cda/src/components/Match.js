import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const App = () => {
  const [playerData, setPlayerdata] = useState({});
  const [matchIds, setMatchIds] = useState([]);
  const [match, setMatch] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API 
  const COUNT = 3;
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
          axios
            .get(
              `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuidId}/ids?count=${COUNT}&sort=asc&api_key=${API_KEY}`
            )
            .then((response) => {
              setMatchIds(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setPlayerdata(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser.leagues]);

  useEffect(() => {
    if (matchIds) {
      const matches = [];

      matchIds.forEach((element) => {
        axios
          .get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/${element}?api_key=${API_KEY}`
          )
          .then((response) => {
            matches.push(response.data);
            setMatch((prevState) => prevState.concat(matches));
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [matchIds]);

  const settings = {
    dots: false, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1 
  };
  





  function handleClick(matchIds) {
    const url = `match/${matchIds}`;
    window.location.href = url;
  }

  function submitClick(matchIds) {
    const url = `conseil/${matchIds}`;
    window.location.href = url;
  }

  return (
    <div className="container-fluid text-center">
  
      <Slider {...settings}>
        {match.map((matchData) => (
          <div className="">
              <h2 id="match">Informations des dernières parties jouées :</h2>
              <br></br>
              <div className="">
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
                      <h2 id="result">
                        {" "}
                        {matchData.info.teams[0].win ? "Victoire" : "Défaite"}
                      </h2>

                      <div className={participant.puuid ? "2" : "none"}>
                        <div className="container-fluid text-center">
                          <div class="row justify-content-md-center" id="recap">
                            <div class="col col-lg-4" id="recap-kda">
                              <p id="perso">
                                Champions : {participant.championName}
                                {"   "} <br></br>
                                Roles : {participant.teamPosition}{" "}
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
                          <div class="row justify-content-md-center">
                            <div class="col col-lg-6">
                              <button
                                class="btn btn-outline-primary"
                                onClick={() =>
                                  handleClick(matchData.metadata.matchId)
                                }
                              >
                                Voir match{" "}
                              </button>
                              <button
                                class="btn btn-outline-primary"
                                onClick={() =>
                                  submitClick(matchData.metadata.matchId)
                                }
                              >
                                Voir conseil{" "}
                              </button>
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
                      <h2>
                        {" "}
                        {matchData.info.teams[1].win ? "Victoire" : "Défaite"}
                      </h2>
                      <div
                        className={
                          participant.puuid === puuid
                            ? "particpantpuid2"
                            : "none"
                        }
                      >
                        <div className="container-fluid text-center">
                          <div class="row justify-content-md-center" id="recap">
                            <div class="col col-lg-4" id="recap-kda">
                              <p id="perso">
                                Champions : {participant.championName}
                                {"   "} <br></br>
                                Roles : {participant.teamPosition}{" "}
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
                          <div class="row justify-content-md-center">
                            <div class="col col-lg-6">
                              <button
                                class="btn btn-outline-primary"
                                onClick={() =>
                                  handleClick(matchData.metadata.matchId)
                                }
                              >
                                Voir match{" "}
                              </button>
                              <button
                                class="btn btn-outline-primary"
                                onClick={() =>
                                  submitClick(matchData.metadata.matchId)
                                }
                              >
                                Voir conseil{" "}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
        ))}
      </Slider>
      </div>
  );
};

export default App;
