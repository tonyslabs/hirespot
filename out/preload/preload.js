"use strict";
const electron = require("electron");
const node_url = require("node:url");
const api = {
  spotify: {
    login: () => electron.ipcRenderer.invoke("spotify:login"),
    logout: () => electron.ipcRenderer.invoke("spotify:logout")
  },
  system: {
    openFolderDialog: () => electron.ipcRenderer.invoke("system:openFolderDialog")
  },
  library: {
    scanFolder: (dir) => electron.ipcRenderer.invoke("library:scanFolder", dir)
  },
  utils: {
    toFileURL: (p) => `local-audio://${node_url.pathToFileURL(p).pathname}`
  },
  file: {
    read: async (path) => {
      const buf = await electron.ipcRenderer.invoke("file:read", path);
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
  }
};
electron.contextBridge.exposeInMainWorld("api", api);
