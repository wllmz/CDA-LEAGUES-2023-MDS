import React from 'react';

<<<<<<< Updated upstream

const Niveaux = () => {
    const [searchText, setSearchText ] =  useState("");
    const [playerData, setPlayerdata ] =  useState({});
    const API_KEY = "RGAPI-c8735274-1237-4c6f-976a-04e7ee6f7011";
    
    const currentUser = AuthService.getCurrentUser();

    function serachForPlayer(event) {
        // et up the correct api call 
        var APICallString ="https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_key=" + API_KEY ; 
        
        // handle the api call 
        axios.get(APICallString).then(function(response){
            setPlayerdata(response.data);
            console.log(playerData);
        
        }).catch(function(error) {
            console.log("error");
        });
    }

    console.log(playerData);


    useEffect(()=>{

        if (currentUser.leagues){  axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentUser.leagues}?api_key=${API_KEY}`) 
         .then(response => {
           console.log(response)
           setPlayerdata(response.data);
           console.log(playerData);
         })

     .catch(error => {
       console.log(error); // Gérer les erreurs de récupération de l'ID d'invocateur
     });}
    },[currentUser.leagues]
    )

    return (
        
    
            <div className='niveaux'>        
            {JSON.stringify(playerData) !='{}' ?
           <> <p>{playerData.name}</p>
           <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <p> Summoner level {playerData.summonerLevel}</p>
            <p> puuid : {playerData.puuid}</p>
             </>
           : <> </>
            
            } 
        </div>
        
    );
};

export default Niveaux;
=======
const Test = () => {
  return (
    <div>
      
    </div>
  );
};

export default Test;
>>>>>>> Stashed changes
