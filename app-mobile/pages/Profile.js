import React from "react";
import { View, ScrollView } from "react-native";

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


export default Profile;
