import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Text>Nom utilisateur :</Text>
          <TextInput
            style={styles.label}
            name="username"
            minLength={8}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.section}>
          <Text>Email :</Text>
          <TextInput
            style={styles.label}
            name="email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.section}>
          <Text>Nom utilisateur leagues :</Text>
          <TextInput
            style={styles.label}
            name="leagues"
            value={leagues}
            onChangeText={setLeagues}
          />
        </View>

        <View style={styles.section}>
          <Text>Mot de passe :</Text>
          <TextInput
            style={styles.label}
            name="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.btn}>
          <Button title="S'inscrire" onPress={handleRegister} />
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
    marginTop: 100,
    backgroundColor: '#CFCCCC',
  },
  label: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#1D6ADE',
    padding: 10,
    borderRadius: 20,
    width: '70%',
    marginLeft: 45,
  },
});

export default Inscription;
