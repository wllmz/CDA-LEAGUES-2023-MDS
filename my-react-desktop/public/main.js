const { app, BrowserWindow } = require("electron");

// Définit une fonction pour créer une nouvelle fenêtre.
const createWindow = () => {

  // Crée une nouvelle instance de BrowserWindow avec les options spécifiées.
  const mainWindow = new BrowserWindow({

    // Définit la largeur et la hauteur initiales de la fenêtre.
    width: 1500,
    height: 1200,

    // Les préférences du navigateur pour cette fenêtre.
    webPreferences: {
      // Autorise l'utilisation des modules distants dans cette fenêtre.
      enableRemoteModules: true,
    },
  });

  // Charge une URL spécifique dans la fenêtre. Dans ce cas, il s'agit d'un serveur local à l'adresse "localhost" sur le port 3000.
  mainWindow.loadURL("http://localhost:3000");
};

// Lorsque l'application Electron est prête...
app.whenReady().then(() => {

  // ...crée une nouvelle fenêtre.
  createWindow();

  // Si l'application est réactivée et qu'il n'y a pas de fenêtres ouvertes, crée une nouvelle fenêtre.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Lorsque toutes les fenêtres de l'application sont fermées...
app.on("window-all-closed", () => {

  if (process.platform !== "darwin") app.quit();
});

