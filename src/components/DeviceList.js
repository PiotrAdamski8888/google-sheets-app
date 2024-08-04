// src/components/DeviceList.js
import React, { useEffect, useState } from 'react';
import { fetchRows } from './ApiService';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const data = await fetchRows('devices');
        if (data.result === 'success') {
          setDevices(data.data);
        } else {
          throw new Error('Nie udało się pobrać danych.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDevices();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <ul className="device-list">
      {devices.map((device, index) => (
        <li key={index} className="device-item">
          <div className="device-info">
            <strong>{device[0]}</strong>
            <span>Nr seryjny: {device[1]}</span>
            <span>Nr ewidencyjny: {device[2]}</span>
            <span>Opis: {device[3]}</span>
            <span>Plan: {device[4]}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DeviceList;
