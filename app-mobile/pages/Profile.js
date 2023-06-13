import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Match from "../components/Match";
import Niveaux from "../components/Niveaux";

const Profile = () => {

  return (
    <ScrollView>  
      <View>
      <Niveaux/>
        <Match />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
