import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CommentServices from "../services/comment.service";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "RGAPI-a8c4cd4c-ecc2-488c-8e1e-7cc66a346830"; // Your API key

const ReviewConseil = ({ route }) => {
  const [leagues, setLeagues] = useState("");
  const { matchId } = route.params;
  const [puuid, setPuuid] = useState("");
  const [matches, setMatches] = useState([]);

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
          console.log(puuidId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [leagues]);

  useEffect(() => {
    if (matchId) {
      axios
        .get(
          `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
        )
        .then((response) => {
          setMatches((prevMatches) => [...prevMatches, response.data]);
          console.log;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matchId]);

  


  return (
    <ScrollView>
      <View style={styles.container}>
        {matches.map((matchData, index) => (
          <View key={index}>
            <View>
              {matchData.info.participants
                .filter((participant) => participant.puuid === puuid)
                .filter((participant) => participant.teamId === 100)
                .map((participant) => (
                  <View
                    key={participant.puuid}
                    style={styles.participantContainer}
                  >
                    <View
                      style={[
                        styles.reviewContainer,
                        matchData.info.teams[0].win
                          ? styles.victory
                          : styles.defeat, styles.shadowProp
                      ]}
                    >
                      <Text style={styles.resultText}>
                        {matchData.info.teams[0].win ? "VICTOIRE" : "DEFAITE"}
                      </Text>
                      <Text style={styles.personalText}>
                        Champions : {participant.championName}
                        {"   "}
                        {"\n"}
                        Roles : {participant.teamPosition}
                      </Text>
                      <Image
                        style={styles.championImage}
                        source={{
                          uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                        }}
                        alt={`Profile icon of ${participant.championName}`}
                      />
                    </View>
                    <View style={styles.kdaContainer}>
                      <View
                        style={[
                          styles.kdaInfoContainer,
                          matchData.info.teams[0].win
                            ? styles.victory
                            : styles.defeat,
                            styles.shadowProp
                        ]}
                      >
                        <Text style={styles.kdaTitle}>KDA :</Text>
                        <Text style={styles.kdaText}>
                          Kill : {participant.kills} {"\n"}
                          Death : {participant.deaths} {"\n"}
                          Assists : {participant.assists} {"\n"}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.itemInfoContainer,
                          matchData.info.teams[0].win
                            ? styles.victory
                            : styles.defeat,
                            styles.shadowProp
                        ]}
                      >
                        <Text style={styles.itemTitle}>OBJET :</Text>
                        <View style={styles.itemImagesContainer}>
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`,
                            }}
                            alt={``}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.recapInfoContainer,
                        matchData.info.teams[0].win
                          ? styles.victory
                          : styles.defeat,
                          styles.shadowProp
                      ]}
                    >
                      <Text style={styles.recapTitle}>RECAP :</Text>
                      <Text style={styles.recapText}>
                        Dommage envoyé :{" "}
                        {participant.totalDamageDealtToChampions} {"\n"}
                        Dommage reçu : {participant.totalDamageTaken} {"\n"}
                        Score vision : {participant.visionScore} {"\n"}
                        Minions :{" "}
                        {participant.totalMinionsKilled +
                          participant.totalAllyJungleMinionsKilled +
                          participant.totalEnemyJungleMinionsKilled}
                        {"\n"}
                        Gold : {participant.goldEarned} {"\n"}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.conseilInfoContainer,
                        matchData.info.teams[0].win
                          ? styles.victory
                          : styles.defeat,
                          styles.shadowProp
                      ]}
                    >
                      <Text style={styles.conseilTitle}>CONSEIL :</Text>
                    </View>
                  </View>
                ))}
            </View>
            <View>
              {matchData.info.participants
                .filter((participant) => participant.puuid === puuid)
                .filter((participant) => participant.teamId === 200)
                .map((participant) => (
                  <View
                    key={participant.puuid}
                    style={styles.participantContainer}
                  >
                    <View
                      style={[
                        styles.reviewContainer,
                        matchData.info.teams[1].win
                          ? styles.victory
                          : styles.defeat,
                          styles.shadowProp
                      ]}
                    >
                      <Text style={styles.resultText}>
                        {matchData.info.teams[1].win ? "VICTOIRE" : "DEFAITE"}
                      </Text>
                      <Text style={styles.personalText}>
                        Champions : {participant.championName}
                        {"   "}
                        {"\n"}
                        Roles : {participant.teamPosition}
                      </Text>
                      <Image
                        style={styles.championImage}
                        source={{
                          uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                        }}
                        alt={`Profile icon of ${participant.championName}`}
                      />
                    </View>
                    <View style={styles.kdaContainer}>
                      <View
                        style={[
                          styles.kdaInfoContainer,
                          matchData.info.teams[1].win
                            ? styles.victory
                            : styles.defeat,
                            styles.shadowProp
                        ]}
                      >
                        <Text style={styles.kdaTitle}>KDA :</Text>
                        <Text style={styles.kdaText}>
                          Kill : {participant.kills} {"\n"}
                          Death : {participant.deaths} {"\n"}
                          Assists : {participant.assists} {"\n"}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.itemInfoContainer,
                          matchData.info.teams[1].win
                            ? styles.victory
                            : styles.defeat,
                            styles.shadowProp
                        ]}
                      >
                        <Text style={styles.itemTitle}>OBJET :</Text>
                        <View style={styles.itemImagesContainer}>
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`,
                            }}
                            alt={``}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`,
                            }}
                            alt={``}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.recapInfoContainer,
                        matchData.info.teams[1].win
                          ? styles.victory
                          : styles.defeat,
                          styles.shadowProp
                      ]}
                    >
                      <Text style={styles.recapTitle}>RECAP :</Text>
                      <Text style={styles.recapText}>
                        Dommage envoyé :{" "}
                        {participant.totalDamageDealtToChampions} {"\n"}
                        Dommage reçu : {participant.totalDamageTaken} {"\n"}
                        Score vision : {participant.visionScore} {"\n"}
                        Minions :{" "}
                        {participant.totalMinionsKilled +
                          participant.totalAllyJungleMinionsKilled +
                          participant.totalEnemyJungleMinionsKilled}
                        {"\n"}
                        Gold : {participant.goldEarned} {"\n"}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.conseilInfoContainer,
                        matchData.info.teams[1].win
                          ? styles.victory
                          : styles.defeat,
                          styles.shadowProp
                      ]}
                    >
                      <Text style={styles.conseilTitle}>CONSEIL :</Text>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  matchText: {
    fontSize: 16,
    marginBottom: 8,
  },
  participantContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  reviewContainer: {
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",

  },
  victory: {
    backgroundColor: "#1D6ADE",
  },
  defeat: {
    backgroundColor: "#002465",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,

  },
  personalText: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  championImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  kdaContainer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    width: "100%",
    
  },
  kdaInfoContainer: {
 width: "100%",
 padding: 16,
 marginBottom: 10,
 borderRadius: 20,
 alignItems: "center",
  },
  kdaTitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
    textAlign: "center",

  },
  kdaText: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  itemInfoContainer: {
    borderRadius: 20,
    width: "100%", 
    alignItems: "center",
    padding: 16,
  },
  itemTitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  itemImagesContainer: {
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    
  },
  itemImage: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
  },
  recapInfoContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  recapTitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  recapText: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  conseilInfoContainer: {
    padding: 16,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  conseilTitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  conseilText: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  shadowProp: {
    shadowColor: '#AFAFAF',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export default ReviewConseil;
