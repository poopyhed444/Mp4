import React from 'react';
import './Product.css';

const Product = ({ product, handleRemove, handleClick }) => (
    <div className="product" onClick={() => handleClick(product)}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{"$" + product.price}</p>
        <button onClick={(e) => {
            e.stopPropagation();
            handleRemove(product.id);
        }}>Remove</button>
    </div>
);

export default Product;
