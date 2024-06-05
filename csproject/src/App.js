import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import AppHeader from './AppHeader';
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
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Router>
                <div className="App">
                    <AppHeader />
                    <h1>Best Sellers</h1>
                    <Routes>
                        <Route path="/" element={<ProductList products={products} handleRemove={handleRemoveProduct} />} />
                        <Route path="/add-product" element={<AddProductForm handleAddProduct={handleAddProduct} />} />
                    </Routes>
                </div>
            </Router>
        </MantineProvider>
    );
}

export default App;
