import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swiper from "react-native-swiper";

const API_KEY = process.env.REACT_APP_API_KEY;

const ReviewMatch = ({ route }) => {
  const { matchId } = route.params;
  const [matches, setMatches] = useState([]);



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
            <Swiper showsButtons={true} style={styles.swipper}>
              <View style={styles.teamContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <Text
                    style={
                      matchData.info.teams[0].win
                        ? styles.victoireText
                        : styles.defaiteText
                    }
                  >
                    {matchData.info.teams[0].win ? "Victoire" : "Défaite"}
                  </Text>
                  {matchData.info.participants
                    .filter((participant) => participant.teamId === 100)
                    .map((participant, index) => (
                      <View
                        key={index}
                        style={[
                          matchData.info.teams[0].win
                            ? styles.victoryPlayer
                            : styles.defeatPlayer,
                          styles.shadowProp,
                        ]}
                      >
                        <View style={styles.playerContainer}>
                          <Text style={styles.playerText}>
                            Champions : {participant.championName}
                            {"\n"}
                            Roles : {participant.teamPosition}
                          </Text>
                          <Image
                            style={styles.championImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`,
                            }}
                          />
                          <Text style={styles.playerText}>
                            Kill : {participant.kills} / Death :{" "}
                            {participant.deaths} / Assists :{" "}
                            {participant.assists}
                          </Text>
                        </View>
                        <View style={styles.itemContainer}>
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`,
                            }}
                          />
                        </View>
                        <View style={styles.playerContainer}>
                          <Text style={styles.playerText}>
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
                      </View>
                    ))}
                </ScrollView>
              </View>

              <View style={styles.teamContainer}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <Text
                    style={
                      matchData.info.teams[1].win
                        ? styles.victoireText
                        : styles.defaiteText
                    }
                  >
                    {matchData.info.teams[1].win ? "Victoire" : "Défaite"}
                  </Text>
                  {matchData.info.participants
                    .filter((participant) => participant.teamId === 200)
                    .map((participant, index) => (
                      <View
                        key={index}
                        style={[
                          matchData.info.teams[1].win
                            ? styles.victoryPlayer
                            : styles.defeatPlayer,
                          styles.shadowProp,
                        ]}
                      >
                        <View style={styles.playerContainer}>
                          <Text style={styles.playerText}>
                            Champions : {participant.championName}
                            {"\n"}
                            Roles : {participant.teamPosition}
                          </Text>
                          <Image
                            style={styles.championImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`,
                            }}
                          />
                          <Text style={styles.playerText}>
                            Kill : {participant.kills} / Death :{" "}
                            {participant.deaths} / Assists :{" "}
                            {participant.assists}
                          </Text>
                        </View>
                        <View style={styles.itemContainer}>
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png`,
                            }}
                          />
                          <Image
                            style={styles.itemImage}
                            source={{
                              uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png`,
                            }}
                          />
                        </View>
                        <View style={styles.playerContainer}>
                          <Text style={styles.playerText}>
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
                      </View>
                    ))}
                </ScrollView>
              </View>
            </Swiper>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 0,
    textAlign: "center",
    paddingTop: 10,
    padding: 50,
    paddingBottom: 10,
    color: "#1D2752",
  },
  matchId: {
    fontSize: 16,
    textAlign: "center",
    color: "#1D2752",
    marginBottom: 10,
  },
  duration: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 50,
    color: "#1D2752",
  },
  teamsContainer: {
    justifyContent: "space-between",
  },
  teamContainer: {
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "space-between",
    height: 750,
  },

  defaiteText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 60,
    marginBottom: 20,
    padding: 30,
    color: "#1D2752",
    borderColor: "#1D2752",
    borderWidth: 5,
    borderRadius: 10,
    marginTop: 20,
  },

  victoireText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 60,
    marginBottom: 20,
    padding: 30,
    color: "#1D6ADE",
    borderColor: "#1D6ADE",
    borderWidth: 5,
    borderRadius: 10,
    marginTop: 20,
  },
  victoryPlayer: {
    backgroundColor: "#1D6ADE",
    padding: 5,
    marginVertical: 10,
    width: "100%",
    borderRadius: 20,
    marginBottom: 20,
  },
  defeatPlayer: {
    backgroundColor: "#1D2752",
    padding: 5,
    width: "100%",
    marginVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  playerContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    borderRadius: 20,
    alignContent: "center",
  },
  playerText: {
    color: "white",
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    padding: 0,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    margin: 20,
    borderRadius: 20,
    alignContent: "center",
  },
  itemImage: {
    width: 40,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  championImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  swipper: {
    height: "100%",
  },
});
export default ReviewMatch;
