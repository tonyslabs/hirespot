"use strict";
const electron = require("electron");
const api = {
  spotify: {
    login: () => electron.ipcRenderer.invoke("spotify:login"),
    logout: () => electron.ipcRenderer.invoke("spotify:logout")
  },
  system: {
    openFolderDialog: () => electron.ipcRenderer.invoke("system:openFolderDialog")
  }
};
electron.contextBridge.exposeInMainWorld("api", api);
