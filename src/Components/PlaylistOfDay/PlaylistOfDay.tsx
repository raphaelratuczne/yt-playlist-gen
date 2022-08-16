import React, { useState } from 'react';
import './PlaylistOfDay.scss';
import { useYtContext } from '../../Contexts/ytContext';
import { Video, PlaylistItem } from '../../Models';
import { convertDuration } from '../../Utils/functions';

const PlaylistOfDay = () => {
  const {
    logged,
    dailyPlaylists,
    watchLaterSelectedVideos,
    videosFromPlaylistsFollowing,
    followingVideoList,
    savePlaylistItems,
  } = useYtContext();
  const [removedVideosP, setRemovedVideosP] = useState<PlaylistItem[]>([]);
  const [removedVideos, setRemovedVideos] = useState<Video[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(() => {
    const d = new Date().getDay();
    return String(d);
  });

  const removePlaylistVideo = (pi: PlaylistItem) => {
    setRemovedVideosP([...removedVideosP, pi]);
  };

  const addPlaylistVideo = ({ id }: PlaylistItem) => {
    setRemovedVideosP(removedVideosP.filter((v) => v.id !== id));
  };

  const removeVideo = (v: Video) => {
    setRemovedVideos([...removedVideos, v]);
  };

  const addVideo = ({ id: { videoId } }: Video) => {
    setRemovedVideos(removedVideos.filter((v) => v.id.videoId !== videoId));
  };

  const btnAddRemoveVP = (pi: PlaylistItem) => {
    const remV = removedVideosP.find((rem) => rem.id === pi.id);
    if (remV) {
      return (
        <button
          type="button"
          style={{ height: '28px' }}
          onClick={() => addPlaylistVideo(pi)}
        >
          Adicionar
        </button>
      );
    }
    return (
      <button
        type="button"
        style={{ height: '28px' }}
        onClick={() => removePlaylistVideo(pi)}
      >
        Remover
      </button>
    );
  };

  const btnAddRemoveV = (vi: Video) => {
    const remV = removedVideos.find((v) => v.id.videoId === vi.id.videoId);
    if (remV) {
      return (
        <button
          type="button"
          style={{ height: '28px' }}
          onClick={() => addVideo(vi)}
        >
          Adicionar
        </button>
      );
    }
    return (
      <button
        type="button"
        style={{ height: '28px' }}
        onClick={() => removeVideo(vi)}
      >
        Remover
      </button>
    );
  };

  const savePlaylist = () => {
    const playL = dailyPlaylists.find((p) => p.day === selectedPlaylist);
    if (playL) {
      const wlsv = watchLaterSelectedVideos.filter((w) => {
        const s = removedVideosP.find((r) => r.id === w.id);
        return s ? false : true;
      });
      const vfpf = videosFromPlaylistsFollowing.filter((f) => {
        const s = removedVideosP.find((r) => r.id === f.id);
        return s ? false : true;
      });
      const pl1 = [...wlsv, ...vfpf];
      const pl2 = followingVideoList.filter((f) => {
        const s = removedVideos.find((r) => r.id.videoId === f.id.videoId);
        return s ? false : true;
      });
      savePlaylistItems(playL.playlist, pl1, pl2);
    }
  };

  return (
    <div className="playlistOfDay">
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
        <>
          <br />
          <button type="button" onClick={savePlaylist}>
            Salvar playlist
          </button>
        </>
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
              {btnAddRemoveVP(v)}
            </div>
          </li>
        ))}
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
              <p>{v.snippet.channelTitle}</p>
              {v.snippet.duration && (
                <p>{convertDuration(v.snippet.duration)}</p>
              )}
              {btnAddRemoveVP(v)}
            </div>
          </li>
        ))}
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
              {btnAddRemoveV(v)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistOfDay;
