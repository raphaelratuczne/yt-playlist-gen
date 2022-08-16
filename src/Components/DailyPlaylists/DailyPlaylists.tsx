import React, { useState } from 'react';
import { useYtContext } from '../../Contexts/ytContext';

const DailyPlaylists = () => {
  const { dailyPlaylists, setDailyPlaylists } = useYtContext();
  const [playDay, setPlayDay] = useState('');
  const [playName, setPlayName] = useState('');
  const [playID, setPlayID] = useState('');

  const savePlaylistDay = () => {
    const pl = {
      day: playDay,
      name: playName,
      playlist: playID,
    };
    const arrPL = [...dailyPlaylists, pl];
    setDailyPlaylists(arrPL);
    setPlayDay('');
    setPlayName('');
    setPlayID('');
  };

  const removeFromPlaylistDay = (pl: string) => {
    const arrPL = dailyPlaylists.filter((d) => d.playlist !== pl);
    setDailyPlaylists(arrPL);
  };

  return (
    <div className="dailyPlaylists">
      <h2>Playlists diárias</h2>
      <input
        placeholder="Nº do dia"
        type="number"
        value={playDay}
        onChange={(ev) => setPlayDay(ev.target.value)}
      />
      <input
        placeholder="Nome do dia"
        value={playName}
        onChange={(ev) => setPlayName(ev.target.value)}
      />
      <input
        placeholder="ID da playlist do dia"
        value={playID}
        onChange={(ev) => setPlayID(ev.target.value)}
      />
      <button type="button" onClick={savePlaylistDay}>
        Adicionar playlist
      </button>
      <br />
      <p>Playlists</p>
      <ul>
        {dailyPlaylists.map((d) => (
          <li key={d.playlist}>
            {`${d.day} - ${d.name} - ${d.playlist} `}
            <button
              type="button"
              onClick={() => removeFromPlaylistDay(d.playlist)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyPlaylists;
