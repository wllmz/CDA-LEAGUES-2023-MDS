const request = require('supertest');


describe('Authentification', () => {

  test("Add User", async () => { 
    const User = {
    username: "michel",
    leagues: "wllmz",
    email: "wllmfffz@gmail.com",
    password: "0123456!A@"
    }

    
    const response = await request("http://localhost:8080") 
      .post("/api/auth/signup")
      .send({username :  "michel", leagues : "wllmz", email: "wllmfffz@gmail.com", password: "0123456!A@"})
      expect(response.statusCode).toBe(200); 
      expect(response.body.message).toBe("L'utilisateur a été enregistré avec succès !");
  });


  test("Login pour la suite", async () => { 
    const response = await request("http://localhost:8080") 
      .post("/api/auth/signin")
      .send({username :  "michel", leagues : "wllmz", password: "0123456!A@"})
      expect(response.statusCode).toBe(200);
  });

  
      test("Wrong username", async () => { 
        const response = await request("http://localhost:8080") 
          .post("/api/auth/signin")
          .send({username : "test051", leagues : "wllmz", password: "0123456!A@"})
          expect(response.statusCode).toBe(404); // Définit le code de retour attendu
      });

      test("Wrong leagues", async () => { 
        const response = await request("http://localhost:8080") 
          .post("/api/auth/signin")
          .send({username : "michel", leagues : "wllmz01", password: "0123456!A@"})
          expect(response.statusCode).toBe(404); // Définit le code de retour attendu
      });

      test("Wrong password", async () => { 
        const response = await request("http://localhost:8080") 
          .post("/api/auth/signin")
          .send({username : "michel", leagues : "wllmz", password: "bouteill"})
          expect(response.statusCode).toBe(401); // Définit le code de retour attendu
      });

  

  });