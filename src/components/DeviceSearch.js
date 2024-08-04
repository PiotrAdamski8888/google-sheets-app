// src/components/DeviceSearch.js
import React, { useState } from 'react';
import { fetchRows } from './ApiService';

const DeviceSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchRows('devices');
      if (data.result === 'success') {
        const device = data.data.find(
          device => device[1].toLowerCase() === searchQuery.toLowerCase()
        );
        setSearchResults(device);
      } else {
        throw new Error('Nie udało się pobrać danych.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Wyszukaj po nr seryjnym"
      />
      <button onClick={handleSearch}>Szukaj</button>

      {searchResults ? (
        <div className="search-result">
          <h3>{searchResults[0]}</h3>
          <p>Nr seryjny: {searchResults[1]}</p>
          <p>Nr ewidencyjny: {searchResults[2]}</p>
          <p>Opis: {searchResults[3]}</p>
          <p>Plan: {searchResults[4]}</p>
        </div>
      ) : (
        <p>Nie znaleziono urządzenia.</p>
      )}
    </div>
  );
};

export default DeviceSearch;
