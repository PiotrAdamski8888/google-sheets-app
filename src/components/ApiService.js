// ApiService.js
import axios from 'axios';

const API_URL =
  'https://script.google.com/macros/s/AKfycbxFmZUbsaXumHLBLFhEs12obw4Oih0xPiAYKN2jKrotUdGsngHzmzVbvjVLJ81OQiUf/exec';

export const fetchRows = async () => {
  const response = await axios.get(API_URL, {
    params: {
      action: 'getRows',
    },
  });
  return response.data;
};

export const addRow = async data => {
  await axios.get(API_URL, {
    params: {
      action: 'addRow',
      data: JSON.stringify(data),
    },
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
    params: {
      action: 'deleteRow',
      rowIndex: index + 1,
    },
  });
};
