// src/components/DeviceForm.js
import React, { useState } from 'react';

const DeviceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    serial: '',
    inventory: '',
    description: '',
    plan: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      serial: '',
      inventory: '',
      description: '',
      plan: '',
    });
  };

  return (
    <form className="device-form" onSubmit={handleSubmit}>
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
      <button type="submit">Dodaj urządzenie</button>
    </form>
  );
};

export default DeviceForm;
