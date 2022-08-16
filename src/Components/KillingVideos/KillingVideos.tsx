import React, { useState } from 'react';
import './KillingVideos.scss';
import { useYtContext } from '../../Contexts/ytContext';

const KillingVideos = () => {
  const {
    logged,
    watchLaterSelectedVideos,
    loadKillingVideosFromWL,
    removeVideoFromKillingSelectedVideos,
  } = useYtContext();
  const [loading, setLoading] = useState(false);

  const loadVideos = async () => {
    setLoading(true);
    try {
      await loadKillingVideosFromWL();
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="killingVideos">
      {logged && (
        <button type="button" onClick={loadVideos} disabled={loading}>
          Carregar videos de Maratonando
        </button>
      )}
      <p>Videos</p>
      <ul className="list">
        {watchLaterSelectedVideos.map((wls) => (
          <li key={wls.id} className="item">
            <img
              alt="thumb"
              src={wls.snippet.thumbnails.default.url}
              width={wls.snippet.thumbnails.default.width}
              height={wls.snippet.thumbnails.default.height}
            />
            <div>
              <p>{wls.snippet.title}</p>
              <p>{wls.snippet.videoOwnerChannelTitle}</p>
              <button
                type="button"
                style={{ height: '28px' }}
                onClick={() => removeVideoFromKillingSelectedVideos(wls)}
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

export default KillingVideos;
