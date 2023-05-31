import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    AsyncStorage.getItem('username')
      .then((username) => {
        if (username) {
          setUsername(username);
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la récupération du nom d\'utilisateur :', error);
      });
  }, []);

  return (
    <View>
      <Text>Nom d'utilisateur : {username}</Text>
      {/* Autres informations de profil */}

    </View>
    
  );
};

export default Profile;
