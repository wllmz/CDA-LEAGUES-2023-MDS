import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthService from '../services/auth.service';


const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Text style={styles.title}>
          Profile: {currentUser.username}
        </Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.info}>
          Email: {currentUser.email}
        </Text>
        <Text style={styles.info}>
          Leagues: {currentUser.leagues}
        </Text>
        <Text style={styles.info}>
          Id: {currentUser.id}
        </Text>
      </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
  },
});

export default BoardUser;
