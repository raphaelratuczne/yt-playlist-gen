import React, { useState } from 'react';
import './SortPlaylistOfDay.scss';
import { useYtContext } from '../../Contexts/ytContext';
// import { Video, PlaylistItem } from '../../Models';
import { convertDuration } from '../../Utils/functions';

const SortPlaylistOfDay = () => {
  const {
    logged,
    dailyPlaylists,
    watchLaterSelectedVideos,
    videosFromPlaylist,
    loadVideosFromPlaylist,
    loadVideosDuration,
    sortLoadedVideosFromPlaylist,
    updatePlaylistDayItems,
  } = useYtContext();

  const [selectedPlaylist, setSelectedPlaylist] = useState(() => {
    const d = new Date().getDay();
    return String(d);
  });
  const [loading, setLoading] = useState(false);

  const loadVideos = async () => {
    setLoading(true);
    const { playlist } = dailyPlaylists.find(
      (d) => d.day === selectedPlaylist
    )!;
    await loadVideosFromPlaylist(playlist);
    setLoading(false);
  };

  const loadDuration = async () => {
    setLoading(true);
    await loadVideosDuration();
    setLoading(false);
  };

  const updatePlaylist = async () => {
    setLoading(true);
    const { playlist } = dailyPlaylists.find(
      (d) => d.day === selectedPlaylist
    )!;
    await updatePlaylistDayItems(playlist);
    setLoading(false);
  };

  return (
    <div className="sortPlaylistOfDay">
      <label htmlFor="selectedPlaylist">Playlist selecionada</label>
      <select
        id="selectedPlaylist"
        value={selectedPlaylist}
        onChange={(ev) => setSelectedPlaylist(ev.target.value)}
      >
        {dailyPlaylists.map((d) => (
          <option key={d.playlist} value={d.day}>
            {d.name}
          </option>
        ))}
      </select>
      {logged && (
        <button type="button" onClick={loadVideos} disabled={loading}>
          Carregar videos
        </button>
      )}
      {videosFromPlaylist.length > 0 && (
        <button type="button" onClick={loadDuration} disabled={loading}>
          Carregar duração dos videos
        </button>
      )}
      {videosFromPlaylist.length > 0 && videosFromPlaylist[0].snippet.duration && (
        <button
          type="button"
          onClick={sortLoadedVideosFromPlaylist}
          disabled={loading}
        >
          Ordenar por duração
        </button>
      )}
      {videosFromPlaylist.length > 0 && (
        <button type="button" onClick={updatePlaylist} disabled={loading}>
          Atualizar playlist
        </button>
      )}
      <p>Videos</p>
      <ul className="list">
        {watchLaterSelectedVideos.map((v) => (
          <li key={v.id} className="item">
            <img
              alt="thumb"
              src={v.snippet.thumbnails.default.url}
              width={v.snippet.thumbnails.default.width}
              height={v.snippet.thumbnails.default.height}
            />
            <div>
              <p>{v.snippet.title}</p>
              <p>{v.snippet.channelTitle}</p>
              {v.snippet.duration && (
                <p>{convertDuration(v.snippet.duration)}</p>
              )}
            </div>
          </li>
        ))}
        {videosFromPlaylist.map((v) => (
          <li key={v.id} className="item">
            <img
              alt="thumb"
              src={v.snippet.thumbnails.default.url}
              width={v.snippet.thumbnails.default.width}
              height={v.snippet.thumbnails.default.height}
            />
            <div>
              <p>{v.snippet.title}</p>
              <p>{v.snippet.channelTitle}</p>
              {v.snippet.duration && (
                <p>{convertDuration(v.snippet.duration)}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortPlaylistOfDay;
