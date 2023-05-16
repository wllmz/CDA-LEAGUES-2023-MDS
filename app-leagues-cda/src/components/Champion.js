import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Champion() {
  const [champions, setChampions] = useState([]);
  const [championsSort, setChampionsSort] = useState ([]) // championSort, setChampionsSort

  useEffect(() => {
    axios.get(`https://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json`)
      .then(response => {
        const championsData = response.data.data;
        const championList = Object.keys(championsData).map(key => championsData[key]);
        setChampions(championList);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  console.log(champions);

  const sort = () => {
    setChampionsSort(champions.filter(champion => champion.tags.includes(document.getElementById("mySelect").value))); // results championSort
  }


  return (
    <div>
      <h2>Liste des champions de League of Legends</h2>
      <select id="mySelect" onChange={sort}>
      <option value=""> ...</option>
  <option value="Fighter">Fighter</option>
  <option value="Tank">Tank</option>
  <option value="Mage">Mage</option>
  <option value="Support">Support</option>
  <option value="Marksman">Marksman</option>
  <option value="Assassin">Assassin</option>
</select>

      <div className="champions">
      {
        championsSort.length > 0  // if championsSort = resultat affiche moi valeurs !
        ?
          championsSort.map(champion => (
            <div key={champion.id}>
              <h2>{champion.name}</h2>
              <p>Type: {champion.tags.join(', ')}</p>
              <img className='champ' src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${champion.image.full}`} alt={champion.name} />
            </div>
          ))
        :   // else championsSort = nul affiche moi tout !
        champions.map(champion => (
          <div key={champion.id}>
            <h2>{champion.name}</h2>
            <p>Type: {champion.tags.join(', ')}</p>
            <img class ="champ" src={`https://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${champion.image.full}`} alt={champion.name} />
          </div>
        ))
        
      }
      </div>
    </div>
  );
}


export default Champion;