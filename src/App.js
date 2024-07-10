import React, { useState, useEffect } from "react";
import { loadCSV } from "./utils/csvLoader";
import SearchBar from "./components/SearchBar";
import LocationSelector from "./components/LocationSelector";
import Pagination from "./components/Pagination";
import ProductModal from "./components/ProductModal";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCSV("/data/products.csv");
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.상품명.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (location === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.위치명.startsWith(location)
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="App">
      <h1>Pharmacy Product Finder</h1>
      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
        <LocationSelector onSelect={handleLocationSelect} />
      </div>
      <ul>
        {currentProducts.map((product, index) => (
          <li key={index} onClick={() => setSelectedProduct(product)}>
            {product.상품명} - {product.위치명}
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
