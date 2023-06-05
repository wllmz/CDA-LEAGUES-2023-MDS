import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable } from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from '@react-navigation/native';
import { isEmail } from 'validator';
import axios from "axios";



const Inscription = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [leagues, setLeagues] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const API_KEY = process.env.REACT_APP_API_KEY;

 

  const handleRegister = () => {
    setError(null);
    setLoading(true);

    if (!username || !email || !leagues || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    if (username.length < 3 || username.length > 20) {
      Alert.alert(
        "Erreur",
        "Le nom d'utilisateur doit comporter entre 3 et 20 caractères"
      );
      
      setLoading(false);
      return;
    }
    if (password.length < 6 || password.length > 40) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit comporter entre 6 et 40 caractères"
      );
      setLoading(false);
      return;
    }
    if (!isEmail(email)) {
      Alert.alert("Erreur", "L'e-mail n'est pas valide");
      setLoading(false);
      return;

    }

    var APICallString = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + leagues + "?api_key=" + API_KEY;
    axios.get(APICallString)
      .then(function(response) {
        setLeagues(true);
        console.log(response);

        AuthService.register(username, email, leagues, password)
          .then(() => {
            setUsername("");
            setEmail("");
            setLeagues("");
            setPassword("");
            navigation.navigate("Home");
          })
          .catch((error) => {
            setError(error.response?.data?.message || "Une erreur s'est produite");
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(function(error) {
        console.log("error");
        console.log(error);
        window.alert("Pas de leagues");
      });
    }
  return (
    <View style={styles.container}>
      <View style={[styles.form, styles.shadowProp]}>
        <View style={styles.section}>
        <Text style= {styles.Text}>Nom utilisateur :</Text>
          <TextInput
            style={styles.label}
            name="username"
            minLength={8}
            value={username}
            placeholder="Entrer nom utilisateur :"
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.section}>
        <Text style= {styles.Text}>Email :</Text>
          <TextInput
            style={styles.label}
            name="email"
            value={email}
            placeholder="Entrer email:"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.section}>
        <Text style= {styles.Text}>Nom utilisateur leagues :</Text>
          <TextInput
            style={styles.label}
            name="leagues"
            value={leagues}
            placeholder="Entrer nom utilisateur leagues :"
            onChangeText={setLeagues}
          />
        </View>

        <View style={styles.section}>
        <Text style= {styles.Text}>Mot de passe :</Text>
          <TextInput
            style={styles.label}
            name="password"
            value={password}
            placeholder="Entrer mot de passe :"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View
      style={styles.btn}
      >
        <Pressable
          style={[styles.button]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}> INSCRIPTION </Text>
        </Pressable>
    </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D6ADE',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  form: {
    padding: 30,
    borderRadius: 20,
    width: '85%',
    height: '65%',
    marginTop: 40,
    backgroundColor: '#fff', 
    borderRadius: 20, 

  },
  label: { 
    padding: 10, 
    borderBottomWidth: 2,
    borderColor: '#002465', 

  },
  section: {
    marginTop: 20,
  },
  btn: {
    marginTop: 50, 
    padding : 15,
    borderRadius: 10,
    width: '60%',
    marginLeft : 55,     
    borderColor: "#002465", 
    backgroundColor:  "#002465", 
  },
  Text: {
    fontSize: 15, 
    fontWeigh: "bold",
    color: "#002465",
    paddingBottom: 5, 
  }, 
  buttonLabel: {
    textAlign: "center", 
    fontWeight: "bold",
    fontSize: 15, 
  }, 
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 20, height: 30},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

});

export default Inscription;
