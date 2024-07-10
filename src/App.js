import React, { useState, useEffect } from 'react';
import { loadCSV } from './utils/csvLoader';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCSV('/data/products.csv');
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className=App>
      <h1>Pharmacy Product Finder</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.상품명} - {product.위치명}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

