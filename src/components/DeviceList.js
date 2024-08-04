import React from 'react';
import DeviceItem from './DeviceItem';

const DeviceList = ({ rows, handleEdit, handleDelete }) => (
  <ul className="device-list">
    {rows.map((row, index) => (
      <DeviceItem
        key={index}
        row={row}
        index={index}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    ))}
  </ul>
);

export default DeviceList;
