import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Profile = () => {
  const [leagues, setLeagues] = useState("");
  const [playerData, setPlayerdata] = useState({});
  const [matchIds, setMatchIds] = useState([]);
  const [match, setMatch] = useState([]);
  const COUNT = 3;
  const [puuid, setPuuid] = useState("");

  const navigation = useNavigation();

  const API_KEY = "RGAPI-189b6337-2a38-4b97-a290-95cbb503fff9"; // Your API key

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
                  style={{
                    backgroundColor: matchData.info.teams[0].win
                      ? "#1D6ADE"
                      : "#1D2752",
                    padding: 10,
                    width: 380,
                    borderRadius: 20,
                  }}
                >
                  <Text style={styles.perso}>
                    {matchData.info.teams[0].win ? "Victoire" : "Défaite"}
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
                          <Text style={styles.perso}>
                            Kill : {participant.kills} / Death :{" "}
                            {participant.deaths} / Assists :{" "}
                            {participant.assists}
                          </Text>
                        </View>
                        <Image
                          style={styles.imgNiveaux}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                          }}
                        />
                      </View>

                      <View style={styles.items}>
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`,
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.btn}>
                      <Button
                        title="Voir match"
                        onPress={() => submitClick(matchData.metadata.matchId)}
                      />
                      <Button
                        style={styles.button}
                        title="Voir conseil"
                        onPress={() => handleClick(matchData.metadata.matchId)}
                      />
                    </View>
                  </View>
                </View>
              ))}

            {matchData.info.participants
              .filter((participant) => participant.puuid === puuid)
              .filter((participant) => participant.teamId === 200)
              .map((participant) => (
                <View
                  style={{
                    backgroundColor: matchData.info.teams[1].win
                      ? "#1D6ADE"
                      : "#1D2752",
                    padding: 10,
                    width: 380,
                    borderRadius: 20,
                  }}
                >
                  <Text style={styles.perso}>
                    {matchData.info.teams[1].win ? "Victoire" : "Défaite"}
                  </Text>
                  <View
                    style={
                      matchData.info.teams[1].win
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
                          <Text style={styles.perso}>
                            Kill : {participant.kills} / Death :{" "}
                            {participant.deaths} / Assists :{" "}
                            {participant.assists}
                          </Text>
                        </View>
                        <Image
                          style={styles.imgNiveaux}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                          }}
                        />
                      </View>

                      <View style={styles.items}>
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`,
                          }}
                        />
                        <Image
                          style={styles.item}
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`,
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.btn}>
                      <Button
                        style={styles.item}
                        title="Voir match"
                        onPress={() => submitClick(matchData.metadata.matchId)}
                      />
                      <Button
                        title="Voir conseil"
                        onPress={() => handleClick(matchData.metadata.matchId)}
                      />
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
  items: {
    margin: 20,
    flexDirection: "row",
    padding: 5,
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    padding: 20,
  },
  item: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 6,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  imgNiveaux: {
    width: 85,
    height: 85,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    marginTop: 5,
  },
  perso: {
    fontSize: 15,
    color: "white",
    margin: 5,
    fontWeight: "bold",
  },
  recap: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  btn: {
    flexDirection: "row",
    marginHorizontal: 80,
    color: "white",
  },
  recapKDA: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    margin: 5,
  },
});
