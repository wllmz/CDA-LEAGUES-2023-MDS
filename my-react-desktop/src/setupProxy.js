const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.wllmz.fr",  // Remplacez "http://localhost:8080" par votre nouvelle URL d'API
      changeOrigin: true,
      secure: true,  // Ajoutez ceci si votre serveur d'API n'a pas de certificat SSL valide
    })
  );
};