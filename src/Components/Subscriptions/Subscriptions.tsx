import React from 'react';
import './Subscriptions.scss';
import { useYtContext } from '../../Contexts/ytContext';
import { Item } from '../../Models';

const Subscriptions = () => {
  const {
    logged,
    subscriptions,
    killing,
    setKilling,
    following,
    setFollowing,
    loadChannelsFromYT,
  } = useYtContext();

  const addToKilling = (sub: Item) => {
    const list = [...killing, sub];
    setKilling(list);
  };

  const removeFromKilling = (sub: Item) => {
    const list = killing.filter((k) => k.id !== sub.id);
    setKilling(list);
  };

  const btnKilling = (sub: Item) => {
    const ac = killing.find(
      (k) => k.snippet.resourceId.channelId === sub.snippet.resourceId.channelId
    );
    return (
      <button
        className={`btn ${ac ? 'active' : ''}`}
        type="button"
        onClick={() => {
          if (ac) removeFromKilling(sub);
          else addToKilling(sub);
        }}
        title="Maratonando"
      >
        M
      </button>
    );
  };

  const addToFollowing = (sub: Item) => {
    const list = [...following, sub];
    setFollowing(list);
  };

  const removeFromFollowing = (sub: Item) => {
    const list = following.filter((f) => f.id !== sub.id);
    setFollowing(list);
  };

  const btnFollowing = (sub: Item) => {
    const ac = following.find(
      (f) => f.snippet.resourceId.channelId === sub.snippet.resourceId.channelId
    );
    return (
      <button
        className={`btn ${ac ? 'active' : ''}`}
        type="button"
        onClick={() => {
          if (ac) removeFromFollowing(sub);
          else addToFollowing(sub);
        }}
        title="Acompanhando"
      >
        A
      </button>
    );
  };

  return (
    <div className="subscriptions">
      <h2>Canais que sou inscrito</h2>
      <p>Canais que estou acompanhando: {following.length}</p>
      {logged && (
        <button type="button" onClick={loadChannelsFromYT}>
          Carregar lista de canais do YT
        </button>
      )}
      {subscriptions.length > 0 && (
        <ul className="list">
          {subscriptions.map((s) => (
            <li key={s.id} className="item">
              <a
                href={`https://www.youtube.com/channel/${s.snippet.resourceId.channelId}`}
                target="_blank"
                rel="noreferrer"
              >
                {s.snippet.title}
              </a>{' '}
              {btnKilling(s)}
              {btnFollowing(s)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subscriptions;
