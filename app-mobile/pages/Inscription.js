import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from '@react-navigation/native';


const API_KEY = process.env.REACT_APP_API_KEY; // Votre clé API

const Inscription = () => {

  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [leaguesacces, setLeaguesacces] = useState(false)

 const nav =useNavigation()

  const onChangeUsername = (text) => {
    setUsername(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const onChangeLeagues = (value) => {
    setLeagues(value);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };


  const handleRegister = async () => {
    if (form.current) {
      const errors = form.current.validateAll();

      if (errors.length === 0) {
        try {
  
        setLeaguesacces(true);
          setMessage("");
          setSuccessful("false");

          AuthService.register(username, email, password, leagues)
            .then((response) => {
              setMessage(response.data.message);
              setSuccessful(true);
              nav.navigate("Connexion");        
            })
            .catch((error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              setMessage(resMessage);
              setSuccessful(false);
            });
        } catch (error) {
          console.log("error");
          Alert.alert("Pas de leagues");
        }
      }
    }
  };

  return (
    <View>
      <View>
        <Text>Nom utilisateur :</Text>
        <TextInput
          name="username"
          value={username}
          onChangeText={onChangeUsername}
        />
      </View>
      <View>
        <Text>leagues :</Text>
        <TextInput
          name="leagues"
          value={leagues}
          onChangeText={onChangeLeagues}
        />
      </View>
      <View>
        <Text>Email :</Text>
        <TextInput
          name="email"
          value={email}
          onChangeText={onChangeEmail}
        />
      </View>

      <View>
        <Text>Mot de passe :</Text>
        <TextInput
          name="password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
        />
      </View>

      <Button title="Se connecter" onPress={handleRegister} />

      {message && <Text>{message}</Text>}
    </View>
  );
};

export default Inscription;
