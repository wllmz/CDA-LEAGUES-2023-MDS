import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const nav = useNavigation();

  const handleLogin = async () => {
    setMessage("");
    setLoading(true);

    if (!username || !password || !leagues) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("leagues", leagues);
      await AsyncStorage.setItem("password", password);
      AuthService.login(username, leagues, password)
        .then(() => {
          setUsername("");
          setLeagues("");
          setPassword("");
          nav.navigate("Detail");
        })
        .catch((error) => {
          Alert.alert("Erreur", error.response.data.message);
        });
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors du stockage des données."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.form, styles.shadowProp]}>
        <View style={styles.section}>
          <Text style={styles.Text}>Nom utilisateur :</Text>
          <TextInput
            style={styles.label}
            name="username"
            value={username}
            onChangeText={setUsername}
            placeholder="Entrer nom d'utilisateur :"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.Text}>Nom utilisateur leagues :</Text>
          <TextInput
            style={styles.label}
            name="leagues"
            value={leagues}
            onChangeText={setLeagues}
            placeholder="Entrer nom utilisateur leagues :"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.Text}>Mot de passe :</Text>
          <TextInput
            style={styles.label}
            name="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Entrer mot de passe :"
            secureTextEntry
          />
        </View>

        <View style={styles.btn}>
          <Pressable style={[styles.button]} onPress={handleLogin}>
            <Text style={[styles.buttonLabel, { color: "#fff" }]}>
              {" "}
              CONNEXION{" "}
            </Text>
          </Pressable>
        </View>
      </View>
      {message && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D6ADE",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  form: {
    paddingTop: 20,
    padding: 50,
    width: "80%",
    height: "60%",
    marginTop: 40,
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
  },
  label: {
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#002465",
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  btn: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    width: "70%",
    marginLeft: 30,
    borderColor: "#002465",
    backgroundColor: "#002465",
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#002465",
    paddingBottom: 5,
  },
  buttonLabel: {
    textAlign: "center",
    fontWeight: "bold",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 20, height: 40 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Login;
