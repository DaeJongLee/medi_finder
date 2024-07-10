import React from 'react';

const locations = [
  { id: 'all', name: '전체' },
  { id: 'compounding', name: '조제실' },
  { id: 'storage', name: '집하장' },
  { id: 'sales', name: '판매구역' }
];

function LocationSelector({ onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {locations.map((location) => (
        <option key={location.id} value={location.id}>
          {location.name}
        </option>
      ))}
    </select>
  );
}

export default LocationSelector;

