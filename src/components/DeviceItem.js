import React from 'react';

const DeviceItem = ({ row, index, handleEdit, handleDelete }) => (
  <li className="device-item">
    <div className="device-info">
      <strong>{row[0]}</strong>
      <span>Nr seryjny: {row[1]}</span>
      <span>Nr ewidencyjny: {row[2]}</span>
      <span>Opis: {row[3]}</span>
      <span>Plan: {row[4]}</span> {/* Dodaj wyświetlanie planu */}
    </div>
    <div className="device-actions">
      <button onClick={() => handleEdit(index)}>Edytuj</button>
      <button onClick={() => handleDelete(index)}>Usuń</button>
    </div>
  </li>
);

export default DeviceItem;
