import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
 const nav =useNavigation()
  const onChangeUsername = (text) => {
    setUsername(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {

    setMessage("");
    setLoading(true);

    if (!username || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;

    }

    AuthService.login(username, password)
      .then(() => {
        setUsername("");
        setPassword("");
        nav.navigate("Inscription");        
      })
      .catch((error) => {
        Alert.alert("Erreur", error.response.data.message);
      });
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
        <Text>Mot de passe :</Text>
        <TextInput
          name="password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
        />
      </View>

      <Button title="Se connecter" onPress={handleLogin} />

      {message && <Text>{message}</Text>}
    </View>
  );
};

export default Login;
