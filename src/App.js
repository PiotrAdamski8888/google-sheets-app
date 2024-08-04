import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

// Komponent Loader
const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

function App() {
  const [formData, setFormData] = useState({
    name: '',
    serial: '',
    inventory: '',
    description: '',
    plan: '',
  });
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL =
    'https://script.google.com/macros/s/AKfycbxFmZUbsaXumHLBLFhEs12obw4Oih0xPiAYKN2jKrotUdGsngHzmzVbvjVLJ81OQiUf/exec';

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          action: 'getRows',
        },
      });
      if (response.data.result === 'success') {
        setRows(response.data.data);
      } else {
        throw new Error('Nie udało się pobrać danych.');
      }
    } catch (error) {
      console.error('Błąd:', error);
      setMessage('Nie udało się pobrać danych.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await axios.get(API_URL, {
          params: {
            action: 'updateRow',
            rowIndex: editIndex + 1,
            data: JSON.stringify({
              name: formData.name,
              serial: formData.serial,
              inventory: formData.inventory,
              description: formData.description,
              plan: formData.plan, // Dodaj pole plan
            }),
          },
        });
        setMessage('Urządzenie zostało zaktualizowane!');

        // Aktualizuj lokalny stan rows
        setRows(prevRows => {
          const newRows = [...prevRows];
          newRows[editIndex] = [
            formData.name,
            formData.serial,
            formData.inventory,
            formData.description,
            formData.plan, // Dodaj pole plan
          ];
          return newRows;
        });

        setIsEditing(false);
        setEditIndex(null);
      } else {
        await axios.get(API_URL, {
          params: {
            action: 'addRow',
            data: JSON.stringify({
              name: formData.name,
              serial: formData.serial,
              inventory: formData.inventory,
              description: formData.description,
              plan: formData.plan, // Dodaj pole plan
            }),
          },
        });
        setMessage('Urządzenie zostało dodane!');
        await fetchRows(); // Pobierz zaktualizowane dane
      }
      setFormData({
        name: '',
        serial: '',
        inventory: '',
        description: '',
        plan: '',
      }); // Resetuj wszystkie pola
    } catch (error) {
      console.error('Błąd:', error);
      setMessage('Wystąpił błąd podczas zapisywania danych.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = index => {
    setFormData({
      name: rows[index][0],
      serial: rows[index][1],
      inventory: rows[index][2],
      description: rows[index][3],
      plan: rows[index][4], // Dodaj pole plan
    });
    setIsEditing(true);
    setEditIndex(index);
    setMessage('');
  };

  const handleDelete = async index => {
    setLoading(true);
    try {
      await axios.get(API_URL, {
        params: {
          action: 'deleteRow',
          rowIndex: index + 1,
        },
      });
      setMessage('Urządzenie zostało usunięte!');
      await fetchRows(); // Pobierz zaktualizowane dane
    } catch (error) {
      console.error('Błąd:', error);
      setMessage('Wystąpił błąd podczas usuwania urządzenia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <Loader />} {/* Dodaj komponent Loader */}
      <h1>Dodaj urządzenie</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nazwa urządzenia"
        />
        <input
          type="text"
          name="serial"
          value={formData.serial}
          onChange={handleChange}
          placeholder="Nr seryjny"
        />
        <input
          type="text"
          name="inventory"
          value={formData.inventory}
          onChange={handleChange}
          placeholder="Nr ewidencyjny"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Opis"
          rows="4"
        />
        <input
          type="text"
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          placeholder="Plan"
        />
        <button type="submit">{isEditing ? 'Zaktualizuj' : 'Dodaj'}</button>
      </form>
      <h2>Lista urządzeń</h2>
      {rows.length > 0 ? (
        <ul className="device-list">
          {rows.map((row, index) => (
            <li key={index} className="device-item">
              <div className="device-info">
                <strong>{row[0]}</strong>
                <span>Nr seryjny: {row[1]}</span>
                <span>Nr ewidencyjny: {row[2]}</span>
                <span>Opis: {row[3]}</span>
                <span>Plan: {row[4]}</span>
              </div>
              <div className="device-actions">
                <button onClick={() => handleEdit(index)}>Edytuj</button>
                <button onClick={() => handleDelete(index)}>Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak urządzeń na liście.</p>
      )}
    </div>
  );
}

export default App;
