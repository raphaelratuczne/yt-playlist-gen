import React, { useState, useEffect } from 'react';
import './PlaylistsFollowingVideos.scss';
import { useYtContext } from '../../Contexts/ytContext';
import { convertDuration } from '../../Utils/functions';

const PlaylistsFollowingVideos = () => {
  const {
    logged,
    loadVideosFromPlaylistsFollowing,
    videosFromPlaylistsFollowing,
    removeVideoFromPlaylistsFollowing,
  } = useYtContext();
  const [from, setFrom] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const sub = day === 1 ? 3 : 1;
    d.setHours(d.getHours() + d.getTimezoneOffset() / -60);
    d.setDate(d.getDate() - sub);
    return d.toISOString().substring(0, 16);
  });
  const [until, setUntil] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + d.getTimezoneOffset() / -60);
    return d.toISOString().substring(0, 16);
  });

  return (
    <div className="playlistsFollowingVideos">
      <p>
        Carregar videos de:{' '}
        <input
          type="datetime-local"
          value={from}
          onChange={(ev) => setFrom(ev.target.value)}
        />{' '}
        até{' '}
        <input
          type="datetime-local"
          value={until}
          onChange={(ev) => setUntil(ev.target.value)}
        />
      </p>
      {logged && (
        <button
          type="button"
          onClick={() => loadVideosFromPlaylistsFollowing(from, until)}
        >
          Carregar
        </button>
      )}
      <p>Videos</p>
      <ul className="list">
        {videosFromPlaylistsFollowing.map((v) => (
          <li key={v.id} className="item">
            <img
              alt="thumb"
              src={v.snippet.thumbnails.default.url}
              width={v.snippet.thumbnails.default.width}
              height={v.snippet.thumbnails.default.height}
            />
            <div>
              <p>{v.snippet.title}</p>
              <p>{v.snippet.videoOwnerChannelTitle}</p>
              {v.snippet.duration && (
                <p>{convertDuration(v.snippet.duration)}</p>
              )}
              <button
                type="button"
                style={{ height: '28px' }}
                onClick={() => removeVideoFromPlaylistsFollowing(v)}
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistsFollowingVideos;
