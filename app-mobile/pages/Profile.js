import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';





import Match from '../components/Match'; 
import Niveaux from '../components/Niveaux';






const Profile = () => {

  const [leagues, setLeagues] = useState("");

  useEffect(() => {
    AsyncStorage.getItem('leagues')
      .then((leagues) => {
        if (leagues) {
          setLeagues(leagues);
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la récupération du nom d\'utilisateur :', error);
      });
  }, []);

  return (
    <ScrollView>
  <View>
      <Niveaux/>
        <Match/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
});


  
  
export default Profile;
