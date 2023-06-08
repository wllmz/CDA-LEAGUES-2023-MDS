import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";
import LogoReview from "../components/LogoReview";

const PlaceholderImage = require("../assets/img/yasuo-home.png");
const LogoImage = require("../assets/img/Logo.png");

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.bienvenue}>Bienvenue sur </Text>
        <View style={styles.image}>
          <LogoReview LogoImageSource={LogoImage} />
        </View>
      </View>

      <View style={styles.boutonContainer}>
        <Button theme="primary" label="CONNEXION" />
        <Button theme="secondary" label="INSCRIPTION" />
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
  },
  imageContainer: {
    paddingTop: 100,
  },
  boutonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 50,
  },
  bienvenue: {
    fontSize: 30,
    color: "white",
  },
  image: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    padding: 10,
  },
});

export default Home;
