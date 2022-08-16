import React from 'react';
import { useYtContext } from '../../Contexts/ytContext';

const WatchLaterPlaylist = () => {
  const { watchLaterPlaylist, setWatchLaterPlaylist } = useYtContext();

  return (
    <div className="watchLaterPlaylist">
      <h2>Playlist Maratonando</h2>
      <label htmlFor="watchLaterPlaylist">Playlist Maratonando (WL)</label>{' '}
      <input
        id="watchLaterPlaylist"
        placeholder="Watch Later Playlist"
        value={watchLaterPlaylist}
        onChange={(ev) => setWatchLaterPlaylist(ev.target.value)}
      />
    </div>
  );
};

export default WatchLaterPlaylist;
