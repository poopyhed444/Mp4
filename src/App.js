import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import AppHeader from './AppHeader';
import { MantineProvider } from "@mantine/core";
import Auth from './Auth';
import {supabase} from './supabase';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
const App = () => {
    const [products, setProducts] = useState([]);
    const [session, setSession] = useState(null);

    // useEffect(() => {
    //     const currentSession = supabase.auth.session;
    //     setSession(currentSession);
    //     const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    //         setSession(session);
    //     });
    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // }, []);


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
                    <Routes>
                        <Route path="/" element={session ? <ProductList products={products} handleRemove={handleRemoveProduct} /> : <Navigate to="/login" />} />
                        <Route path="/add-product" element={session ? <AddProductForm handleAddProduct={handleAddProduct} /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Auth supabaseClient={supabase} />} />
                    </Routes>
                </div>
            </Router>
        </MantineProvider>
    );
}

export default App;