// src/components/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import DeviceForm from './DeviceForm';
import DeviceSearch from './DeviceSearch';
import DeviceList from './DeviceList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = data => {
    console.log('Dodano urządzenie:', data);
    // Tutaj możesz dodać logikę do dodawania urządzenia
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Strona Główna</h2>
                <DeviceSearch onSearch={handleSearch} />
                <DeviceForm onSubmit={handleFormSubmit} />
              </>
            }
          />
          <Route
            path="/devices"
            element={<DeviceList searchQuery={searchQuery} />}
          />
          <Route path="/sold" element={<h2>Sprzedane urządzenia</h2>} />
          <Route path="/rented" element={<h2>Wynajęte urządzenia</h2>} />
          <Route path="/returned" element={<h2>Odesłane urządzenia</h2>} />
          <Route path="/in-branch" element={<h2>Urządzenia w oddziale</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
