import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../services/auth.service";
import CommentServices from "../services/comment.service";



const Review_Conseil = () => {
  const [comment, setComment] = useState();
  const { matchIds } = useParams();
  const { puuid } = useParams();
  const [matches, setMatches] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY; 
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (matchIds) {
      axios
        .get(
          `https://europe.api.riotgames.com/lol/match/v5/matches/${matchIds}?api_key=${API_KEY}`
        )
        .then((response) => {
          // Mise à jour de l'état des matchs en ajoutant les nouvelles données de match à l'ancien contenu
          setMatches((prevMatches) => [...prevMatches, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matchIds]);

  useEffect(() => {
    if (!comment) {
      let commentuser = CommentServices.getCommentById( currentUser.leagues + `/${matchIds}`);
      const promise = Promise.resolve(commentuser);
      promise.then((value) => {
        setComment(value.data.data);
      });
    }
  });

  
  useEffect(() => {
    if (!comment) {
      CommentServices.getCommentById( currentUser.leagues + `/${matchIds}`)
        .then((value) => {
          setComment(value.data.data);
          console.log(value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [comment, matchIds]);

  return (
    <div className="container text-center">

<Link to={"/profile"}>
        <span>&#8592;</span> Retour
      </Link>
      {matches.map((matchData, index) => (
        <div key={index}>
          <h2 id="match">Informations des dernières parties jouées :</h2>
          <p id="match">Match ID: {matchData.metadata.matchId}</p>
          <p id="match">Durée: {matchData.info.gameDuration}</p>
          <br></br>

          {matchData.info.participants
            .filter((participant) => participant.puuid === puuid)
            .filter((participant) => participant.teamId === 100)
            .map((participant) => (
              <div className="container text-center">
                <div class="row align-items-center">
                  <div class="col  col-lg-8 col-sm" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[0].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h2 id="result">
                        {" "}
                        {matchData.info.teams[0].win ? "VICTOIRE" : "DEFAITE"}
                      </h2>
                      <p id="perso">
                        {" "}
                        Champions : {participant.championName}
                        {"   "}
                        <br></br>
                        Roles : {participant.teamPosition}{" "}
                      </p>
                      <img
                        className="img-conseil"
                        src={
                          "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
                          participant.championName +
                          ".png"
                        }
                        alt={`Profile icon of ${participant.championName}`}
                      ></img>
                    </div>
                  </div>
                  <div class="col-sm" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[0].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3>KDA :</h3>
                      <p id="perso">
                        {" "}
                        Kill : {participant.kills} <br></br>
                        Death : {participant.deaths} <br></br>
                        Assists : {participant.assists} <br></br>
                      </p>
                    </div>
                  </div>
                  <div class="col-sm col-lg-4" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[0].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3> OBJET : </h3>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`}
                        alt={``}
                      ></img>
                      <br></br>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`}
                        alt={``}
                      ></img>
                    </div>
                  </div>
                  <div class="col-sm col-lg-4" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[0].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3> RECAP : </h3>

                      <p id="perso">
                        Dommage envoyer :{" "}
                        {participant.totalDamageDealtToChampions} {"   "}
                      </p>
                      <p id="perso">
                        Dommage recus : {participant.totalDamageTaken} {"   "}
                      </p>
                      <p id="perso">
                        Score vision : {participant.visionScore} {"   "}
                      </p>
                      <p id="perso">
                        Minions :{" "}
                        {participant.totalMinionsKilled +
                          participant.totalAllyJungleMinionsKilled +
                          participant.totalEnemyJungleMinionsKilled}
                      </p>

                      <p id="perso">
                        Gold : {participant.goldEarned} {"   "}
                      </p>
                    </div>
                  </div>
                  <div class="col-sm col-lg-4" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[0].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3> CONSEIL : </h3>

                      {comment && comment.length > 0 ? (
                        comment.map((c) => (
                          <div className="image-type">
                            <p>{c.body} </p>
                          </div>
                        ))
                      ) : (
                        <div className="image-type">
                          <p>Pas encore de commentaire attribué </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {matchData.info.participants
            .filter((participant) => participant.puuid === puuid)
            .filter((participant) => participant.teamId === 200)
            .map((participant) => (
              <div className="container text-center">
                <div class="row align-items-center">
                  <div class="col  col-lg-8 col-sm" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[1].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h2 id="result">
                        {" "}
                        {matchData.info.teams[1].win ? "VICTOIRE" : "DEFAITE"}
                      </h2>
                      <p id="perso">
                        {" "}
                        Champions : {participant.championName}
                        {"   "}
                        <br></br>
                        Roles : {participant.teamPosition}{" "}
                      </p>
                      <img
                        className="img-conseil"
                        src={
                          "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/" +
                          participant.championName +
                          ".png"
                        }
                        alt={`Profile icon of ${participant.championName}`}
                      ></img>
                    </div>
                  </div>
                  <div class="col-sm" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[1].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3>KDA :</h3>
                      <p id="perso">
                        {" "}
                        Kill : {participant.kills} <br></br>
                        Death : {participant.deaths} <br></br>
                        Assists : {participant.assists} <br></br>
                      </p>
                    </div>
                  </div>
                  <div class="col-sm col-lg-4" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[1].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3> OBJET : </h3>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`}
                        alt={``}
                      ></img>
                      <br></br>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`}
                        alt={``}
                      ></img>
                      <img
                        className="object-conseil"
                        src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`}
                        alt={``}
                      ></img>
                    </div>
                  </div>
                  <div class="col-sm col-lg-4" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[1].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3> RECAP : </h3>

                      <p id="perso">
                        Dommage envoyer :{" "}
                        {participant.totalDamageDealtToChampions} {"   "}
                      </p>
                      <p id="perso">
                        Dommage recus : {participant.totalDamageTaken} {"   "}
                      </p>
                      <p id="perso">
                        Score vision : {participant.visionScore} {"   "}
                      </p>
                      <p id="perso">
                        Minions :{" "}
                        {participant.totalMinionsKilled +
                          participant.totalAllyJungleMinionsKilled +
                          participant.totalEnemyJungleMinionsKilled}
                      </p>

                      <p id="perso">
                        Gold : {participant.goldEarned} {"   "}
                      </p>
                    </div>
                  </div>
                  <div class="col-sm col-lg-4" id="recap-kda">
                    <div
                      className={
                        matchData.info.teams[1].win
                          ? "Victoire-perso"
                          : "Défaite-perso"
                      }
                      id="review"
                    >
                      <h3> CONSEIL : </h3>

                      {comment && comment.length > 0 ? (
                        comment.map((c) => (
                          <div className="image-type">
                            <p>{c.body} </p>
                          </div>
                        ))
                      ) : (
                        <div className="image-type">
                          <p>Pas encore de commentaire attribué</p>
                        </div>
                      )}
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
