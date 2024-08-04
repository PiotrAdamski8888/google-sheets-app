 fix-all



import React, { useState, useEffect } from 'react';
import './index.css';
import Loader from './components/Loader';
import DeviceForm from './components/DeviceForm';
import DeviceList from './components/DeviceList';
import { fetchRows, addRow, updateRow, deleteRow } from './api';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    serial: '',
    inventory: '',
    description: '',
    plan: '', // Dodaj nowe pole
  });
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRows();
  }, []);

  const loadRows = async () => {
    setLoading(true);
    try {
      const data = await fetchRows();
      setRows(data);
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
        await updateRow(editIndex, formData); // Upewnij się, że formData zawiera plan
        setMessage('Urządzenie zostało zaktualizowane!');
        setRows(prevRows => {
          const newRows = [...prevRows];
          newRows[editIndex] = [
            formData.name,
            formData.serial,
            formData.inventory,
            formData.description,
            formData.plan, // Upewnij się, że plan jest tutaj
          ];
          return newRows;
        });
        setIsEditing(false);
        setEditIndex(null);
      } else {
        await addRow(formData); // Upewnij się, że formData zawiera plan
        setMessage('Urządzenie zostało dodane!');
        await loadRows(); // Ładowanie zaktualizowanej listy
      }
      setFormData({
        name: '',
        serial: '',
        inventory: '',
        description: '',
        plan: '',
      }); // Resetuje formularz
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
      await loadRows(); // Pobierz zaktualizowane dane
    } catch (error) {
      console.error('Błąd:', error);
      setMessage('Wystąpił błąd podczas usuwania urządzenia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <Loader />}
      <h1>Dodaj urządzenie</h1>
      {message && <div className="message">{message}</div>}
      <DeviceForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />
      <h2>Lista urządzeń</h2>
      {rows.length > 0 ? (
        <DeviceList
          rows={rows}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <p>Brak urządzeń na liście.</p>
      )}
    </div>
  );
}

export default App;
