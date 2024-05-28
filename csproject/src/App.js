import React, { useState } from 'react';
import AddProductForm from './AddProductForm';
import './ProductList.css';


// Product Component
const Product = ({ product, handleRemove }) => (
  <div className="product">
    <img src={product.image} alt={product.name} />
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>{product.price}</p>
    <button onClick={() => handleRemove(product.id)}>Remove</button>
  </div>
);

// ProductList Component
const ProductList = ({ products, handleRemove }) => (
  <div className="product-list">
    {products.map(product => (
      <Product key={product.id} product={product} handleRemove={handleRemove} />
    ))}
  </div>
);


// App Component
const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="app">
      <h1>Best Sellers</h1>
      {/* AddProductForm is a component you would create to handle product uploads */}
      <AddProductForm handleAddProduct={handleAddProduct} />
      <ProductList products={products} handleRemove={handleRemoveProduct} />
    </div>
  );
};

export default App;