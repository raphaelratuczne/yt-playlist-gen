import React from 'react';
import { useYtContext } from '../../Contexts/ytContext';

const DataManager = () => {
  const { exportDataAsFile, importDataFromFile } = useYtContext();

  return (
    <div className="dataManager">
      <button type="button" onClick={exportDataAsFile}>
        Exportar dados
      </button>
      <button type="button" onClick={importDataFromFile}>
        Importar dados
      </button>
    </div>
  );
};

export default DataManager;
