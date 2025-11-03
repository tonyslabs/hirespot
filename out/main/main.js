"use strict";
const electron = require("electron");
const path = require("path");
const createWindow = async () => {
  const mainWindow = new electron.BrowserWindow({
    width: 1024,
    height: 768,
    title: "HiResSpot",
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "../preload/preload.js"),
      nodeIntegration: false,
      devTools: !electron.app.isPackaged
    }
  });
  {
    await mainWindow.loadURL("http://localhost:5173");
  }
};
electron.app.whenReady().then(() => {
  createWindow().catch((error) => {
    console.error("Failed to create main window:", error);
  });
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow().catch((error) => {
        console.error("Failed to recreate main window:", error);
      });
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("spotify:login", async () => "login-ok");
electron.ipcMain.handle("spotify:logout", async () => "logout-ok");
electron.ipcMain.handle("system:openFolderDialog", async () => "/home/user/Music");
