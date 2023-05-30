import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AuthService from "../services/auth.service";
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [leagues, setLeagues] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();


  const onChangeUsername = (text) => {
    setUsername(text);
  };

  const onChangeEmail = (text) => {
    setEmail(text);
  };

  const onChangeLeagues = (text) => {
      setLeagues(text);
    }

  

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const handleRegister = () => {
    setError(null);
    setLoading(true);

    if (!username || !email || !leagues || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
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
        <View style= {styles.section} >
        <Text>Nom utilisateur :</Text>
        <TextInput style={styles.label}
          name="username"
          value={username}
          onChangeText={onChangeUsername}
        />
      </View>

      <View style= {styles.section} >
        <Text>Email :</Text>
        <TextInput style={styles.label}
          name="email"
          value={email}
          onChangeText={onChangeEmail}
        />

      </View>

      <View style= {styles.section} >
        <Text>Nom utilisateur leagues :</Text>
        <TextInput style={styles.label}
          name="leagues"
          value={leagues}
          onChangeText={onChangeLeagues}
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
    borderRadius: '20',
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
      marginLeft : 45,     
    },

});

export default Register;
