import React from 'react';
import ReactDOM from 'react-dom/client'; // Zmiana importu
import App from './components/App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Utworzenie root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
