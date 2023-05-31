import { View, Text, Image, StyleSheet, ScrollView  } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewMatch = ({ route }) => {
  const { matchId } = route.params;
  const [matches, setMatches] = useState([]);

  const API_KEY = "RGAPI-21942840-f365-4ad9-b11b-48909ed810ed"; // Your API key

  useEffect(() => {
    if (matchId) {
      axios
        .get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`)
        .then((response) => {
          setMatches(prevMatches => [...prevMatches, response.data]);
          console.log
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [matchId]);
  // Utilisez l'ID du match pour afficher les détails du match ou effectuer d'autres actions
  return (
    <ScrollView>
    <View style={styles.container}>
    {matches.map((matchData, index) => (
      <View key={index}>
        <Text style={styles.heading}>Informations des dernières parties jouées :</Text>
        <Text style={styles.matchId}>Match ID: {matchData.metadata.matchId}</Text>
        <Text style={styles.duration}>Durée: {matchData.info.gameDuration}</Text>
        <View style={styles.teamsContainer}>
          <View style={styles.teamContainer}>
            <Text style={styles.result}>{matchData.info.teams[0].win ? "Victoire" : "Défaite"}</Text>
            {matchData.info.participants
              .filter((participant) => participant.teamId === 100)
              .map((participant, index) => (
                <View
                key={index}
                style={matchData.info.teams[0].win ? styles.victoryPlayer : styles.defeatPlayer}
              >
                  <View style={styles.playerContainer}>
                    <Text style={styles.playerText}>
                      Champions : {participant.championName}{'\n'}
                      Roles : {participant.teamPosition}
                    </Text>
                    <Text style={styles.playerText}>
                      Kill : {participant.kills} / Death : {participant.deaths} / Assists : {participant.assists}
                    </Text>
                  </View>
                  <View style={styles.itemContainer}>
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png` }}
                    />
                  </View>
                  <Image
                    style={styles.championImage}
                    source={{
                      uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                    }}
                  />
                </View>
              ))}
          </View>
          <View style={styles.teamContainer}>
            <Text style={styles.result}>{matchData.info.teams[1].win ? "Victoire" : "Défaite"}</Text>
            {matchData.info.participants
              .filter((participant) => participant.teamId === 200)
              .map((participant, index) => (
                <View
                  key={index}
                  style={matchData.info.teams[1].win ? styles.victoryPlayer : styles.defeatPlayer}
                >
                  <View style={styles.playerContainer}>
                    <Text style={styles.playerText}>
                      Champions : {participant.championName}{'\n'}
                      Roles : {participant.teamPosition}
                    </Text>
                    <Text style={styles.playerText}>
                      Kill : {participant.kills} / Death : {participant.deaths} / Assists : {participant.assists}
                    </Text>
                  </View>
                  <View style={styles.itemContainer}>
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item0}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item1}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item2}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item3}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item4}.png` }}
                    />
                    <Image
                      style={styles.itemImage}
                      source={{ uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${participant.item5}.png` }}
                    />
                    
                  </View>
                  <Image
                    style={styles.championImage}
                    source={{
                      uri: `https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`,
                    }}
                  />
                </View>
              ))}
          </View>
        </View>
      </View>
    ))}
  </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  width: '100%',
},
heading: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 10,
  textAlign: 'center',
},
matchId: {
  fontSize: 16,
  textAlign: 'center',
},
duration: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 10,
},
teamsContainer: {
  justifyContent: 'space-between',
},
teamContainer: {
  alignItems: 'center',
  marginHorizontal: 5,
},
result: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},
victoryPlayer: {
  backgroundColor: '#1D6ADE',
  padding: 10,
  marginVertical: 10,
  borderRadius: 5,
},
defeatPlayer: {
  backgroundColor: '#1D2752',
  padding: 10,
  marginVertical: 10,
  borderRadius: 5,

},
playerContainer: {
  marginBottom: 5,
},
playerText: {
  color: 'white',
  marginBottom: 5,
},
itemContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 10,
},
itemImage: {
  width: 30,
  height: 30,
  marginHorizontal: 2,
},
championImage: {
  width: 30,
  height: 30,
  alignSelf: 'center',
},
});
export default ReviewMatch;




