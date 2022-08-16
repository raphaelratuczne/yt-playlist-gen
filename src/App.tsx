import React from 'react';
import './App.scss';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { YtContextProvider } from './Contexts/ytContext';

function App() {
  /**
   * primeiro
   * carregar lista de canais que sigo (ok)
   * separar
   *  - canais que estou maratonando (dentro de assistir mais tarde) (ok)
   *  - canais que estou acompanhando (ok)
   *  - playlists que estou acompanhando (ok)
   *
   * entao
   * carregar lista de videos na playlist assistir mais tarde (ok)
   *  - selecionar 1 video de cada canal que estou maratonando (ok)
   * carregar ultimos videos de canais que acompanho (a partir de data) (ok)
   * carregar ultimos videos de playlists que acompanho (a partir de data) (ok)
   * carregar duracao de cada video
   * ordenar listagem
   * salvar videos na playlist do dia
   * salvar videos na playlist tv
   * remover videos da playlist assistir mais tarde
   */

  return (
    <YtContextProvider>
      <div className="App">
        <h1>YT Playlist Gen</h1>
        <Login />
        <Home />
      </div>
    </YtContextProvider>
  );
}

export default App;
