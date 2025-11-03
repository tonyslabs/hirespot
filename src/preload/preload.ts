import { contextBridge, ipcRenderer } from 'electron';

const api = {
  spotify: {
    login: () => ipcRenderer.invoke('spotify:login'),
    logout: () => ipcRenderer.invoke('spotify:logout')
  },
  system: {
    openFolderDialog: () => ipcRenderer.invoke('system:openFolderDialog')
  }
};

contextBridge.exposeInMainWorld('api', api);
