import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
      .then((response) => {
        setUsername("");
        setPassword("");
  
        if (response && response.data && response.data.username) {
          AsyncStorage.setItem('username', response.data.username)
            .then(() => {
              console.log('Nom d\'utilisateur enregistré avec succès.');
              nav.navigate("");
            })
            .catch((error) => {
              console.log('Erreur lors de l\'enregistrement du nom d\'utilisateur :', error);
              nav.navigate("Profile");
              console.log(error);
            });
        } else {
          console.log('Le nom d\'utilisateur n\'a pas été trouvé dans la réponse.');
          // Afficher un message d'erreur approprié à l'utilisateur
          nav.navigate("Profile");
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la connexion :', error);
        // Afficher un message d'erreur approprié à l'utilisateur
      });
  
  
  

  return (
    <View style={styles.container}>
        <View style={styles.form}>
        <View style= {styles.section} >
        <Text>Nom utilisateur :</Text>
        <TextInput style={styles.label}
          name="username"
          value={username}
          onChangeText={onChangeUsername}
        />
      </View>

      <View style= {styles.section} >
        <Text>Mot de passe :</Text>
        <TextInput style={styles.label}
          name="password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
        />
      </View>
      <View style={styles.btn}>
      <Button title ="Se connecter" onPress={handleLogin}> </Button>
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
    height: '45%',
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
}
export default Login;
