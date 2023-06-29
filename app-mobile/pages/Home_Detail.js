import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";

const PlaceholderImage = require("../assets/img/Jinx-user.png");

const Home = () => {
  const [leagues, setLeagues] = useState("");
  const nav = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("leagues")
      .then((leagues) => {
        if (leagues) {
          // Si elle existe, nous utilisons la fonction setLeagues pour mettre à jour l'état local "leagues" avec la valeur récupérée.
          setLeagues(leagues);
        }
      })
      .catch((error) => {
        // Si une erreur se produit lors de la récupération de la valeur, nous affichons 
        // cette erreur dans la console.
        console.log(
          "Erreur lors de la récupération du nom d'utilisateur :",
          error
        );
      });
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("leagues");
      nav.replace("Home");
      console.log("Vous avez bien été déconnecté");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.bienvenue}>Bienvenue </Text>
        <Text style={styles.username}>{leagues}</Text>
      </View>

      <View style={styles.boutonContainer}>
        <Button theme="Match" label="VOIR DÉTAIL" />
      </View>

      <View style={styles.btn}>
        <Pressable style={[styles.button]} onPress={handleLogout}>
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>
            {" "}
            DECONNEXION{" "}
          </Text>
        </Pressable>
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
    fontSize: 80,
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
  btn: {
    marginTop: 20,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default Home;
