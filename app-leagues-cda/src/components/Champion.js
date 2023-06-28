import React, { useEffect, useState } from "react";
import axios from "axios";

function Champion() {
  const [champions, setChampions] = useState([]);
  const [championsSort, setChampionsSort] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/13.7.1/data/en_US/champion.json`
      )
      .then((response) => {
        const championsData = response.data.data;
        // Convertir l'objet des champions en un tableau
        const championList = Object.keys(championsData).map(
          (key) => championsData[key]
        );
        setChampions(championList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Définir une fonction pour trier les champions en fonction de leur catégorie
  const sort = () => {
    // Mettre à jour l'état des champions triés avec ceux qui correspondent à la catégorie sélectionnée
    setChampionsSort(
      // Filtrer les champions basé sur leurs tags
      champions.filter((champion) =>
        // Vérifier si le tag du champion correspond à la valeur de l'élément sélectionné dans le document
        champion.tags.includes(document.getElementById("mySelect").value)
      )
    );
  };

  return (
    <div className="champion">
      <div className="section-bleu-champ">
        <div className="border">
          <h2 id="champion"> Liste des champions de League of Legends </h2>
        </div>
      </div>
      <div className="container">
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
          {championsSort.length > 0 // if championsSort = resultat affiche moi valeurs !
            ? championsSort.map((champion) => (
                <div className="champ-card" key={champion.id}>
                  <h2>{champion.name} </h2>
                  <p>Type: {champion.tags.join(", ")}</p>
                  <img
                    className="champ"
                    src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${champion.image.full}`}
                    alt={champion.name}
                  />
                </div>
              ))
            : // else championsSort = nul affiche moi tout !
              champions.map((champion) => (
                <div className="champ-card" key={champion.id}>
                  <h2> {champion.name}</h2>
                  <p>Type: {champion.tags.join(", ")}</p>
                  <img
                    class="champ"
                    src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${champion.image.full}`}
                    alt={champion.name}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Champion;
