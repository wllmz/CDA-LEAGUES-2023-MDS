import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logout from "../services/auth.service"

  
const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log(error);
  }
};


import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";

const PlaceholderImage = require("../assets/img/Jinx-user.png");

const Home = () => {
  const [leagues, setLeagues] = useState("");

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


  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.bienvenue}>Bienvenue </Text>
        <Text style={styles.username}>{leagues}</Text>
        {/* Autres informations de profil */}
      </View>

      <View style={styles.boutonContainer}>
        <Button theme="Match" label="VOIR DÉTAIL" />
      </View>

      

      <View style={styles.imageContainer - 2}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D6ADE",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    paddingTop: 100,
  },
  boutonContainer: {
    flexDirection: "row",
    marginLeft: 115,
    width: "100%",
    margin: 20,
  },
  username: {
    marginTop: 10,
    fontSize: 90,
    color: "white",
    width: 350,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
  bienvenue: {
    fontSize: 30,
    color: "white",
  },
});

export default Home;
