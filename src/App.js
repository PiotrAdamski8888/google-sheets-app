// App.js
import React, { useState, useEffect } from 'react';
import { fetchRows, addRow, updateRow, deleteRow } from './ApiService';
//
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updateRow(editIndex, {
          name: formData.name,
          serial: formData.serial,
          inventory: formData.inventory,
          description: formData.description,
          plan: formData.plan,
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
            formData.plan,
          ];
          return newRows;
        });
        setIsEditing(false);
        setEditIndex(null);
      } else {
        await addRow({
          name: formData.name,
          serial: formData.serial,
          inventory: formData.inventory,
          description: formData.description,
          plan: formData.plan,
        });
        setMessage('Urządzenie zostało dodane!');
        await fetchRowsData(); // Pobierz zaktualizowane dane
      }
      setFormData({
        name: '',
        serial: '',
        inventory: '',
        description: '',
        plan: '',
      });
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
      plan: rows[index][4],
    });
    setIsEditing(true);
    setEditIndex(index);
    setMessage('');
  };

  const handleDelete = async index => {
    setLoading(true);
    try {
      await deleteRow(index);
      setMessage('Urządzenie zostało usunięte!');
      await fetchRowsData(); // Pobierz zaktualizowane dane
    } catch (error) {
      console.error('Błąd:', error);
      setMessage('Wystąpił błąd podczas usuwania urządzenia.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRowsData = async () => {
    setLoading(true);
    try {
      const data = await fetchRows();
      if (data.result === 'success') {
        setRows(data.data);
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

  useEffect(() => {
    fetchRowsData();
  }, []);

  return (
    <div className="App">
      {loading && <div className="loader">Loading...</div>}
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
