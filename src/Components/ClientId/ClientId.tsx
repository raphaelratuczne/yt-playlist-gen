import React from 'react';
import { useYtContext } from '../../Contexts/ytContext';

const ClientId = () => {
  const { clientID, setClientID } = useYtContext();
  return (
    <div className="clientId">
      <label htmlFor="clientId">ClientId:</label>{' '}
      <input
        id="clientId"
        placeholder="Client ID"
        value={clientID}
        onChange={(ev) => setClientID(ev.target.value)}
      />
    </div>
  );
};

export default ClientId;
