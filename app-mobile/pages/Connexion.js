import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {
  const [username, setUsername] = useState("");
  const [leagues, setLeagues] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 const nav =useNavigation()

 
  const handleLogin = async () => {
    setMessage("");
    setLoading(true);

    if (!username || !password  || !leagues) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('leagues', leagues);
      await AsyncStorage.setItem('password', password);
      AuthService.login(username,leagues, password)
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
      Alert.alert("Erreur", "Une erreur s'est produite lors du stockage des données.");
    }
  };
  
  

  return (
    <View style={styles.container}>
        <View style={styles.form}>
        <View style= {styles.section} >
        <Text>Nom utilisateur :</Text>
        <TextInput style={styles.label}
          name="username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style= {styles.section} >
        <Text>Nom utilisateur :</Text>
        <TextInput style={styles.label}
          name="leagues"
          value={leagues}
          onChangeText={setLeagues}
        />
      </View>

      <View style= {styles.section} >
        <Text>Mot de passe :</Text>
        <TextInput style={styles.label}
          name="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.btn}>
      <Button title="Se connecter" onPress={handleLogin} />

</View>
      {message && <Text>{message}</Text>}
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
    padding: 50,
    borderRadius: '20',
    width: '80%',
    height: '60%',
    marginTop: 150, 
    backgroundColor: '#CFCCCC',
    }, 
    label: {
      margin: 5, 
      padding: 10,
      backgroundColor: 'white', 
      borderRadius: 10, 
    },
    section : {
  marginTop: 20,
  marginBottom: 10, 
    }, 
    btn: {
      marginTop: 30, 
      backgroundColor: '#1D6ADE',
      padding : 10,
      borderRadius: 20,
      width: '70%',
      marginLeft : 30,     
    },

});

export default Login;
