import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Niveaux = () => {
  const [leagues, setLeagues] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [rank, setRank] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY; 

  useEffect(() => {
    AsyncStorage.getItem("leagues")
      .then((leagues) => {
        if (leagues) {
          setLeagues(leagues);
        }
      })
      .catch((error) => {
        console.log(
          "Erreur lors de la récupération du nom d'utilisateur :",
          error
        );
      });
  }, []);

  useEffect(() => {
    if (leagues) {
      axios
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${leagues}?api_key=${API_KEY}`
        )
        .then((response) => {
          setPlayerData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [leagues]);

  useEffect(() => {
    if (leagues) {
      axios
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${leagues}?api_key=${API_KEY}`
        )

        .then((response) => {
          const summonerId = response.data.id; // Récupérer l'ID d'invocateur à partir de la réponse de l'API
          axios
            .get(
              `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
            )
            .then((response) => {
              const soloRank = response.data.find(
                (entry) => entry.queueType === "RANKED_SOLO_5x5"
              ); // Trouver l'entrée de rang solo du joueur
              setRank(soloRank); // Mettre à jour le state des informations de rang avec l'entrée trouvée
              setLeagues(response.data[0].leagues);
            })
            .catch((error) => {
              console.log(error); // Gérer les erreurs de récupération des informations de rang
            });
        })
        .catch((error) => {
          console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
        });
    }
  }, [leagues]);

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.shadowProp]}>
        <View style={styles.section2}>
          {Object.keys(playerData).length !== 0 ? (
            <>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                source={{
                  uri: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${playerData.profileIconId}.png`,
                }}
              />
              <Text style={styles.txt}>
                Summoner level {playerData.summonerLevel}
              </Text>
            </>
          ) : (
            <></>
          )}

          <View>
            {rank ? (
              <View>
                <Text style={styles.txt}>
                  Vous etes classé {rank.tier} {rank.rank}
                </Text>
                <Text style={styles.txt}>
                  {rank.wins} victoires / {rank.losses} défaites
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.txt}>Pas encore classé</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  txt: {
    fontSize: 15,
    color: "white",
    margin: 5,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#0C284D",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 350,
    marginBottom: 20,
  },
  section2: {
    backgroundColor: "#0C284D",
    alignItems: "center",
    padding: 10,
    width: 250,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#AFAFAF",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export default Niveaux;
