import { useState } from 'react';

const App = () => {
  const [spotifyStatus, setSpotifyStatus] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSpotifyLogin = async () => {
    try {
      setErrorMessage(null);
      const result = await window.api.spotify.login();
      setSpotifyStatus(result);
      console.log('Spotify login result:', result);
    } catch (error) {
      setErrorMessage('No se pudo iniciar sesión en Spotify.');
      console.error('Spotify login error', error);
    }
  };

  const handleSpotifyLogout = async () => {
    try {
      setErrorMessage(null);
      const result = await window.api.spotify.logout();
      setSpotifyStatus(result);
      console.log('Spotify logout result:', result);
    } catch (error) {
      setErrorMessage('No se pudo cerrar sesión en Spotify.');
      console.error('Spotify logout error', error);
    }
  };

  const handleOpenFolder = async () => {
    try {
      setErrorMessage(null);
      const path = await window.api.system.openFolderDialog();
      setFolderPath(path);
      console.log('Folder selected:', path);
    } catch (error) {
      setErrorMessage('No se pudo abrir el selector de carpetas.');
      console.error('Open folder dialog error', error);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>HiResSpot</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}>
        <button type="button" onClick={handleSpotifyLogin}>
          Iniciar sesión con Spotify
        </button>
        <button type="button" onClick={handleSpotifyLogout}>
          Cerrar sesión de Spotify
        </button>
        <button type="button" onClick={handleOpenFolder}>
          Agregar carpeta local
        </button>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        {spotifyStatus && <p>Spotify: {spotifyStatus}</p>}
        {folderPath && <p>Carpeta seleccionada: {folderPath}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default App;
