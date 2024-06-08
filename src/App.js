import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import AppHeader from './AppHeader';
import { MantineProvider } from "@mantine/core";
import {supabase} from './supabase';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {Auth} from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'

const App = () => {
    const [products, setProducts] = useState([]);
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAddProduct = (product) => {
        setProducts(prevProducts => [...prevProducts, product]);
    };

    const handleRemoveProduct = (id) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    };
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Router>
                <div className="App">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={session ? <ProductList products={products} handleRemove={handleRemoveProduct} /> : <Navigate to="/login" />} />
                        <Route path="/add-product" element={session ? <AddProductForm handleAddProduct={handleAddProduct} /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!session ? (
                            <Auth
                                supabaseClient={supabase}
                                appearance={{ theme: ThemeSupa }}
                                providers={['google']}
                            />
                        ) : <Navigate to="/" />}
                        />
                    </Routes>
                </div>
            </Router>
        </MantineProvider>
    );
};


export default App;