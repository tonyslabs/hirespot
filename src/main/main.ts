import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'HiResSpot',
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      devTools: !app.isPackaged
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

app.whenReady().then(() => {
  createWindow().catch((error) => {
    console.error('Failed to create main window:', error);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow().catch((error) => {
        console.error('Failed to recreate main window:', error);
      });
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('spotify:login', async () => 'login-ok');
ipcMain.handle('spotify:logout', async () => 'logout-ok');
ipcMain.handle('system:openFolderDialog', async () => '/home/user/Music');
