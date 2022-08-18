import React from 'react';
import './Login.scss';
import ClientId from '../../Components/ClientId/ClientId';
import { useYtContext } from '../../Contexts/ytContext';
import Accordion from '../../Components/Accordion/Accordion';
import DataManager from '../../Components/DataManager/DataManager';

const Login = () => {
  const { logged, login, logout } = useYtContext();
  return (
    <div className="login">
      <Accordion label="Importar/Exportar">
        <DataManager />
      </Accordion>
      <h2>Login</h2>
      {logged ? (
        <>
          <button type="button" onClick={logout}>
            Logout
          </button>
          <br />
          <br />
        </>
      ) : (
        <>
          <button type="button" onClick={login}>
            Login
          </button>
          <br />
          <br />
        </>
      )}
      <Accordion label="Client ID">
        <ClientId />
      </Accordion>
    </div>
  );
};

export default Login;
