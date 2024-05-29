import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import Product from './ProductList';
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
  <div className="App"> {/* Change this line */}
    <h1>Best Sellers</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
      </ul>
    </nav>
    <Route path="/" exact render={() => (
      <ProductList products={products} handleRemove={handleRemoveProduct} />
    )} />
    <Route path="/add-product" render={() => (
      <AddProductForm handleAddProduct={handleAddProduct} />
    )} />
  </div>
</Router>

  );
};

export default App;
