import React from 'react';
import Ranks_profile from '../components/Ranks_profile'
import Niveaux_profile from '../components/Niveaux_profile'
import Match_profile from '../components/Match_profile';


const Profile = () => {
  return (
    <div>
    <Niveaux_profile/>

      <Ranks_profile/>

      <Match_profile />
    </div>
  );
};

export default Profile;