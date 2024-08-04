import React from 'react';

const DeviceForm = ({ formData, handleChange, handleSubmit, isEditing }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Nazwa urządzenia"
      required
    />
    <input
      type="text"
      name="serial"
      value={formData.serial}
      onChange={handleChange}
      placeholder="Nr seryjny"
      required
    />
    <input
      type="text"
      name="inventory"
      value={formData.inventory}
      onChange={handleChange}
      placeholder="Nr ewidencyjny"
      required
    />
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Opis"
      required
      rows="4"
    />
    <input
      type="text"
      name="plan"
      value={formData.plan}
      onChange={handleChange}
      placeholder="Plan"
      required
    />{' '}
    {/* Dodaj nowe pole */}
    <button type="submit">{isEditing ? 'Zaktualizuj' : 'Dodaj'}</button>
  </form>
);

export default DeviceForm;
