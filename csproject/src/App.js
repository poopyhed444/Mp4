import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import AppHeader from './AppHeader'; // Make sure this path is correct
import { MantineProvider } from "@mantine/core";

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleRemoveProduct = (id) => {
 setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <AppHeader /> {/* This is where you call AppHeader */}
        <h1>Best Sellers</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-product">Add Product</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList products={products} handleRemove={handleRemoveProduct} />} />
          <Route path="/add-product" element={<AddProductForm handleAddProduct={handleAddProduct} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
