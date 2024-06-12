import React, { useState, useEffect } from 'react';
import './ProductList.css';
import Product from './Product';
import PickupModal from './Pickup';
import { supabase } from './supabase';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userId, setUserId] = useState(null); // State to store the logged-in user's ID

    useEffect(() => {
        const fetchProducts = async () => {
            let { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('isauction', false);

            if (error) console.error('Error fetching products:', error);
            else setProducts(data);
        };

        fetchProducts();

        supabase.auth.getUser()
            .then(({ data, error }) => {
                if (data && data.user) setUserId(data.user.id);
                if (error) console.error('Error fetching user data:', error);
            });
    }, []);

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

    const handleRemove = async (id) => {
        const { data, error } = await supabase
            .from('products')
            .delete()
            .match({ id });

        if (error) {
            console.error('Error removing product:', error);
        } else {
            console.log('Product removed:', data);
            setProducts(currentProducts => currentProducts.filter(product => product.id !== id));
        }
    };

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map(product => (
                    <Product key={product.id} product={product}
                             handleRemove={product.user_id === userId ? () => handleRemove(product.id) : undefined}
                             handleClick={handleProductClick} />
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
