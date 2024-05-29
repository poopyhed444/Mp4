import React from 'react';
import './ProductList.css';
const Product = ({ product, handleRemove }) => (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => handleRemove(product.id)}>Remove</button>
    </div>
  );
  
  const ProductList = ({ products, handleRemove }) => (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <Product key={product.id} product={product} handleRemove={handleRemove} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
 export default ProductList;

