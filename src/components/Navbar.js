// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>Moja Aplikacja</h1>
      <ul>
        <li>
          <Link to="/">Strona Główna</Link>
        </li>
        <li>
          <Link to="/devices">Lista Urządzeń</Link>
        </li>
        <li>
          <Link to="/sold">Sprzedane</Link>
        </li>
        <li>
          <Link to="/rented">Wynajęte</Link>
        </li>
        <li>
          <Link to="/returned">Odesłane</Link>
        </li>
        <li>
          <Link to="/in-branch">W Oddziale</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
