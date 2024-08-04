// src/api.js
import axios from 'axios';

const API_URL =
  'https://script.google.com/macros/s/AKfycbzEf9R8tc5oxRF8ZA414R8oepMqamhkSIWW3WxlkCD1gPHuXnxadicjo0K9n0bAmSV7/exec';

// export const fetchRows = async () => {
//   const response = await axios.get(API_URL, { params: { action: 'getRows' } });
//   if (response.data.result === 'success') {
//     return response.data.data;
//   } else {
//     throw new Error('Nie udało się pobrać danych.');
//   }
// };

export const fetchRows = async () => {
  const response = await axios.get(API_URL, { params: { action: 'getRows' } });
  if (response.data.result === 'success') {
    const data = response.data.data;
    const rows = data.slice(1); // Pomija pierwszy wiersz (nagłówki)
    return rows;
  } else {
    throw new Error('Nie udało się pobrać danych.');
  }
};

export const addRow = async data => {
  await axios.get(API_URL, {
    params: { action: 'addRow', data: JSON.stringify(data) },
  });
};

export const updateRow = async (index, data) => {
  await axios.get(API_URL, {
    params: {
      action: 'updateRow',
      rowIndex: index + 1,
      data: JSON.stringify(data),
    },
  });
};

export const deleteRow = async index => {
  await axios.get(API_URL, {
    params: { action: 'deleteRow', rowIndex: index + 1 },
  });
};
