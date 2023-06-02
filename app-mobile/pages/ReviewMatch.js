import { View, Text, Image, StyleSheet, ScrollView  } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewMatch = ({ route }) => {
  const { matchId } = route.params;
  const [matches, setMatches] = useState([]);

  const API_KEY = "RGAPI-a8c4cd4c-ecc2-488c-8e1e-7cc66a346830"; // Your API key

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
        <View style={styles.teamsContainer}>
          <View style={styles.teamContainer}>
          <Text style={matchData.info.teams[0].win ? styles.victoireText : styles.defaiteText}>
            {matchData.info.teams[0].win  ? 'Victoire' : 'Défaite'}
          </Text>
            {matchData.info.participants
              .filter((participant) => participant.teamId === 100)
              .map((participant, index) => (
                <View
                key={index}
                style={[matchData.info.teams[0].win ? styles.victoryPlayer : styles.defeatPlayer, styles.shadowProp]}
              >
                
                  <View style={styles.playerContainer}>
                    <Text style={styles.playerText}>
                      Champions : {participant.championName}{'\n'}
                      Roles : {participant.teamPosition}
                    </Text>
                    <Image
                    style={styles.championImage}
                    source={{
                      uri: `https://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`,
                    }}
                  />
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
             
                </View>
                
              ))}
          </View>
          <View style={styles.teamContainer}>
          <Text style={matchData.info.teams[1].win ? styles.victoireText : styles.defaiteText}>
            {matchData.info.teams[1].win  ? 'Victoire' : 'Défaite'}
          </Text>
            {matchData.info.participants
              .filter((participant) => participant.teamId === 200)
              .map((participant, index) => (
                <View
                  key={index}
                  style={[matchData.info.teams[1].win ? styles.victoryPlayer : styles.defeatPlayer, styles.shadowProp ]}
                >
                  <View style={styles.playerContainer}>
                    <Text style={styles.playerText}>
                      Champions : {participant.championName}{'\n'}
                      Roles : {participant.teamPosition}
                    </Text>
                         <Image
                    style={styles.championImage}
                    source={{
                      uri: `https://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${participant.championName}.png`,
                    }}
                  />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30
  },

heading: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 0,
  textAlign: 'center',
  paddingTop: 10,
  padding: 50,
  paddingBottom: 10,
  color: '#1D2752',
},
matchId: {
  fontSize: 16,
  textAlign: 'center',
  color: '#1D2752',
    marginBottom: 10,
},
duration: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 50,
  color: '#1D2752',
},
teamsContainer: {
  justifyContent: 'space-between',
},
teamContainer: {
  alignItems: 'center',
  marginHorizontal: 5,
  justifyContent: 'space-between',
},

defaiteText: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 60,
  marginBottom: 20,
  padding: 30, 
  color: '#1D2752',
  borderColor: '#1D2752',
  borderWidth: 5,
  borderRadius: 10,
},

victoireText: {
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 60,
  marginBottom: 20,
  padding: 30, 
  color: '#1D6ADE',
  borderColor: '#1D6ADE',
  borderWidth: 5,
  borderRadius: 10,
},
victoryPlayer: {
  backgroundColor: '#1D6ADE',
  padding: 5,
  marginVertical: 10,
  width: '100%',
  borderRadius: 20,
},
defeatPlayer: {
  backgroundColor: '#1D2752',
  padding: 5, 
  width: '100%',
  marginVertical: 10,
  borderRadius: 20,
  
  
},
playerContainer: {
  marginBottom: 0,
  borderWidth: 1,
  borderColor: 'white',
  margin: 10,
  borderRadius: 20,
  alignContent: 'center',
},
playerText: {
  color: 'white',
  textAlign: 'center',
  margin: 10, 
  fontWeight: 'bold',
  padding: 0,
},


itemContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 10,
 padding: 10,
 borderWidth: 1,
 borderColor: 'white',
 margin: 20,
 borderRadius: 20,
 alignContent: 'center',
},
itemImage: {
  width: 40,
  height: 40,
  marginHorizontal: 2,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'white',

},
championImage: {
  width: 50,
  height: 50,
  alignSelf: 'center',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'white',

},
shadowProp: {
  shadowColor: '#AFAFAF',
  shadowOffset: {width: 8, height: 8},
  shadowOpacity: 1,
  shadowRadius: 1,
},
});
export default ReviewMatch;



