require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const username = process.env.USERNAME_ADMIN;
const leagues = process.env.LEAGUES_ADMIN;
const MDP = process.env.MDP_ADMIN;

const request = require('supertest');


describe('comment', () => {

let token; 


  test("Login pour la suite", async () => { 
    const response = await request("http://localhost:8080") 
      .post("/api/auth/signin")
      .send({username, leagues, password})
      expect(response.statusCode).toBe(200);
      token=response.body.roles;
  });

  test("Add Comment", async () => { 
     Comment = {
        body : "Ceci est un nouveaux pour l'admin ! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        gameId : "EUW1_6440213698", 
        leagues : "wllm2z" 
    }

    
    const response = await request("http://localhost:8080") 
      .post("/api/auth/signup")
      .send(Comment) 
      .send(token) 
      expect(response.body.status).toBe("success");
  });



  });