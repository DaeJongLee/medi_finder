import React, { useState, useEffect } from 'react';
import { loadCSV } from './utils/csvLoader';
import SearchBar from './components/SearchBar';
import LocationSelector from './components/LocationSelector';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCSV('/data/products.csv');
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product => 
      product.상품명.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (location === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.위치명.startsWith(location)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className=App>
      <h1>Pharmacy Product Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <LocationSelector onSelect={handleLocationSelect} />
      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>{product.상품명} - {product.위치명}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

