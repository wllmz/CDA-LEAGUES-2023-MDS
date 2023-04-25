import React, { useState } from 'react';
import axios from 'axios';
import AuthService from "../services/auth.service";

const API_KEY = 'RGAPI-c8735274-1237-4c6f-976a-04e7ee6f7011'; // Votre clé API

function App() {
  const [summonerName, setSummonerName] = useState(''); // Utiliser le state pour stocker le nom d'invocateur entré
  const [rank, setRank] = useState(null); // Utiliser le state pour stocker les informations de rang récupérées

  const handleInputChange = event => {
    setSummonerName(event.target.value); // Mettre à jour le state du nom d'invocateur lorsqu'il est modifié
  };

  const handleSubmit = event => {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire
    axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
      .then(response => {
        const summonerId = response.data.id; // Récupérer l'ID d'invocateur à partir de la réponse de l'API
        axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`)
          .then(response => {
            const soloRank = response.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5'); // Trouver l'entrée de rang solo du joueur
            setRank(soloRank); // Mettre à jour le state des informations de rang avec l'entrée trouvée
          })
          .catch(error => {
            console.log(error); // Gérer les erreurs de récupération des informations de rang
          });
      })
      .catch(error => {
        console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
      });
  };

  const currentUser = AuthService.getCurrentUser();

  

  return (
    <div>
        <div className='rank'>
      <h1>Vérifier le rang d'un joueur de League of Legends</h1>
      <form onSubmit={handleSubmit}>
        <p>Nom d'invocateur :</p>
        <label htmlFor="summonerName"></label>
        <input id="summonerName" type="text" value={currentUser.leagues} onChange={handleInputChange} />
        <button type="submit">Rechercher</button>
      </form>
      {rank && (
        <div>
          <h2>{summonerName} est classé {rank.tier} {rank.rank}</h2> {/* Afficher le rang actuel */}
          <p>{rank.wins} victoires / {rank.losses} défaites</p> {/* Afficher les statistiques de victoires/défaites */}
        </div>
      )}

      
  <h3>
    <strong>Profile:</strong> {currentUser.username}
  </h3>
<p>
</p>
<p>
  <strong>Email:</strong> {currentUser.email}
</p>
<p>
  <strong>Leagues:</strong> {currentUser.leagues}
</p>
    </div>
    </div>


  );
}

export default App;
