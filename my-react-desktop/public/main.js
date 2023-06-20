const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1200,
    webPreferences: {
      enableRemoteModules: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
