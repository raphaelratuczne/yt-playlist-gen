import React, { useState } from 'react';
import './FollowingVideos.scss';
import { useYtContext } from '../../Contexts/ytContext';
import { convertDuration } from '../../Utils/functions';

const FollowingVideos = () => {
  const {
    logged,
    loadAllVideosFromFollowing,
    followingVideoList,
    loadVideosDuration,
    sortFollowingVideoListByDuration,
    removeVideoFromFollowing,
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
    <div className="followingVideos">
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
        <>
          <button
            type="button"
            onClick={() => loadAllVideosFromFollowing(from, until)}
          >
            Carregar videos
          </button>
          {followingVideoList.length > 0 && (
            <button type="button" onClick={() => loadVideosDuration()}>
              Carregar duração dos videos
            </button>
          )}
          {followingVideoList.length > 0 &&
            followingVideoList[0].snippet.duration && (
              <button type="button" onClick={sortFollowingVideoListByDuration}>
                Ordenar por duração
              </button>
            )}
        </>
      )}
      <p>Videos</p>
      <ul className="list">
        {followingVideoList.map((v) => (
          <li key={v.id.videoId} className="item">
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
              <button
                type="button"
                style={{ height: '28px' }}
                onClick={() => removeVideoFromFollowing(v)}
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

export default FollowingVideos;
