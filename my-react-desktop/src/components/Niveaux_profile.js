import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Niveaux = () => {
  const [playerData, setPlayerdata] = useState({});
  const { user } = useParams();

  const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

  console.log(user);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}?api_key=${API_KEY}`
        )
        .then((response) => {
          console.log(response);
          setPlayerdata(response.data);
          console.log(playerData);
        })

        .catch((error) => {
          console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
        });
    }
  }, [user]);

  return (
    <div className="">
      {JSON.stringify(playerData) != "{}" ? (
        <>
          <img
            className="img-niveaux"
            width="100"
            height="100"
            src={
              "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" +
              playerData.profileIconId +
              ".png"
            }
          ></img>
          <p> Summoner level {playerData.summonerLevel}</p>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Niveaux;
