import React, { useState } from 'react';
import { useYtContext } from '../../Contexts/ytContext';

const PlaylistsFollowing = () => {
  const { playlistsFollowing, setPlaylistsFollowing } = useYtContext();
  const [playlistId, setPlaylistId] = useState('');
  const [playlistName, setPlaylistName] = useState('');

  const addPlaylistId = () => {
    if (playlistId && playlistName) {
      const playlistFollowingItem = {
        name: playlistName,
        playlistID: playlistId,
      };
      const nPlaylistFollowing = [...playlistsFollowing, playlistFollowingItem];
      setPlaylistsFollowing(nPlaylistFollowing);
      setPlaylistId('');
      setPlaylistName('');
    }
  };

  const removePlaylistId = (id: number) => {
    const arrayPlaylistsFollowing = playlistsFollowing.filter(
      (_, i) => i !== id
    );
    setPlaylistsFollowing(arrayPlaylistsFollowing);
  };

  return (
    <div className="playlistsFollowing">
      <h2>Playlists que acompanho</h2>
      <input
        placeholder="nome da playlist"
        value={playlistName}
        onChange={(ev) => setPlaylistName(ev.target.value)}
      />
      <input
        placeholder="ID da playlist"
        value={playlistId}
        onChange={(ev) => setPlaylistId(ev.target.value)}
      />
      <button type="button" onClick={addPlaylistId}>
        Adicionar playlist maratonando
      </button>

      <br />
      <p>Playlists</p>
      <ul>
        {playlistsFollowing.map((pl, i) => (
          <li key={pl.playlistID}>
            <a
              href={`https://www.youtube.com/playlist?list=${pl.playlistID}`}
              target="_blank"
              rel="noreferrer"
            >
              {`${pl.name} - ${pl.playlistID}`}
            </a>
            <button type="button" onClick={() => removePlaylistId(i)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistsFollowing;
