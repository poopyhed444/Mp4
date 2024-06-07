import React, { useState } from 'react';
import './ProductList.css';
import Product from './Product';
import PickupModal from './Pickup';  // Ensure this is imported if it's a separate component

const ProductList = ({ products, handleRemove }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleConfirm = (id, address, time) => {
        console.log(`Product ID: ${id}, Address: ${address}, Time: ${time}`);
        setSelectedProduct(null);
    };

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map(product => (
                    <Product key={product.id} product={product} handleRemove={handleRemove} handleClick={handleProductClick} />
                ))
            ) : (
                <p>No products available.</p>
            )}
            <PickupModal
                isOpen={!!selectedProduct}
                product={selectedProduct}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default ProductList;
