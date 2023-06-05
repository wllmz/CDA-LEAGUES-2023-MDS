import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const Profile = () => {
  const [leagues, setLeagues] = useState("");
  const [playerData, setPlayerdata] = useState({});
  const [matchIds, setMatchIds] = useState([]);
  const [match, setMatch] = useState([]);
  const COUNT = 2;
  const [puuid, setPuuid] = useState("");
  


  const navigation = useNavigation();
 

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
  }, [leagues]);

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

  const submitClick = (matchId) => {
    // Logique de traitement lors du clic sur le bouton
    console.log("Submit clicked for matchId:", matchId);
    // Autres actions à exécuter avec matchId
    navigation.navigate("ReviewMatch", { matchId });
  };

  const handleClick = (matchId) => {
    // Logique de traitement lors du clic sur le bouton
    console.log("Submit clicked for matchId:", matchId);
    // Autres actions à exécuter avec matchId
    navigation.navigate("ReviewConseil", { matchId });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#1D2752" }}>
            Informations des dernières parties jouées :
          </Text>
        </View>

        {match.map((matchData) => (
         
          <View style={{ marginVertical: 10 }}>
            {matchData.info.participants
              .filter((participant) => participant.puuid === puuid)
              .filter((participant) => participant.teamId === 100)
              .map((participant) => (
                <View
                style={[matchData.info.teams[0].win ? styles.victoryPlayer : styles.defeatPlayer, styles.shadowProp ]}
              >
                  <Text style={styles.resulat}>
                    {matchData.info.teams[0].win ? "VICTOIRE" : "DEFAITE"}
                  </Text>
                  <View
                    style={
                      matchData.info.teams[0].win
                        ? styles.victoirePerso
                        : styles.defaitePerso
                    }
                  >
                    <View
                      style={participant.puuid ? styles.container : styles.none}
                    >
                      <View style={styles.recap}>
                        <View style={styles.recapKDA}>
                          <Text style={styles.perso}>
                            Champions : {participant.championName}
                            {"   "}
                            {"\n"}
                            Roles : {participant.teamPosition}
                          </Text>
                        </View>
                        <Image
                          style={styles.imgNiveaux}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                          }}
                        />
                      </View>

                  
                    </View>
                    <View style={styles.btncontainer}>
                    <View
      style={styles.btn}
      >
        <Pressable
          style={[styles.button]}
          onPress={() => submitClick(matchData.metadata.matchId)}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}> VOIR MATCH </Text>
        </Pressable>
    </View>
    <View
      style={styles.btn}
      >
        <Pressable
          style={[styles.button]}
          onPress={() => handleClick(matchData.metadata.matchId)}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}> VOIR CONSEIL </Text>
        </Pressable>
    </View>
                    </View>
                  </View>
                </View>
              ))}

            {matchData.info.participants
              .filter((participant) => participant.puuid === puuid)
              .filter((participant) => participant.teamId === 200)
              .map((participant) => (
          
                 <View
                  style={[matchData.info.teams[1].win ? styles.victoryPlayer : styles.defeatPlayer, styles.shadowProp ]}
                >
                   <Text style={styles.resulat}>
                    {matchData.info.teams[0].win ? "VICTOIRE" : "DEFAITE"}
                  </Text>
                    <View
                      style={participant.puuid ? styles.container : styles.none}
                    >
                      <View style={styles.recap}>
                        <View style={styles.recapKDA}>
                          <Text style={styles.perso}>
                            Champions : {participant.championName}
                            {"   "}
                            {"\n"}
                            Roles : {participant.teamPosition}
                          </Text>
                        </View>
                        <Image
                          style={styles.imgNiveaux}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.btncontainer}>
                    <View
      style={styles.btn}
      >
        <Pressable
          style={[styles.button]}
          onPress={() => submitClick(matchData.metadata.matchId)}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}> VOIR MATCH </Text>
        </Pressable>
    </View>
    <View
      style={styles.btn}
      >
        <Pressable
          style={[styles.button]}
          onPress={() => handleClick(matchData.metadata.matchId)}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}> VOIR CONSEIL </Text>
        </Pressable>
    </View>
                    </View>
                  </View>
       
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({

  imgNiveaux: {
    width: 85,
    height: 85,
    marginLeft: 60,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    marginTop: 5,
    alignContent: "center"
  },
  perso: {
    fontSize: 15,
    color: "white",
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  recap: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    padding: 15,
    marginLeft: 30,

  },
  btncontainer: {
    flexDirection: "row",
    color: "white",
  },
  recapKDA: {
    padding: 5,
    margin: 5,
  },
  btn: {
    marginTop: 20, 
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "#fff", 
    borderWidth: 1,

  },
  resulat:{
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  victoryPlayer: {
    backgroundColor: '#1D6ADE',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 20,
  },
  defeatPlayer: {
    backgroundColor: '#1D2752',
    padding: 10, 
    width: '100%',
    marginVertical: 10,
    borderRadius: 20,    
  },
  shadowProp: {
    shadowColor: '#AFAFAF',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});