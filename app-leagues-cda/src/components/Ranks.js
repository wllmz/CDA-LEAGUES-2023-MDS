import React, { useState } from 'react';
import axios from 'axios';



const API_KEY = 'RGAPI-328cfb2f-fb83-48e9-973d-250cace5b104'; // Votre clé API

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

  return (
    <div>
        <div className='rank'>
      <h1>Vérifier le rang d'un joueur de League of Legends</h1>
      <form onSubmit={handleSubmit}>
        <p>Nom d'invocateur :</p>
        <label htmlFor="summonerName"></label>
        <input id="summonerName" type="text" value={summonerName} onChange={handleInputChange} />
        <button type="submit">Rechercher</button>
      </form>
      {rank && (
        <div>
          <h2>{summonerName} est classé {rank.tier} {rank.rank}</h2> {/* Afficher le rang actuel */}
          <p>{rank.wins} victoires / {rank.losses} défaites</p> {/* Afficher les statistiques de victoires/défaites */}
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
