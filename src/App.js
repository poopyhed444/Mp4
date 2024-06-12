import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import AppHeader from './AppHeader';
import { MantineProvider } from '@mantine/core';
import { supabase } from './supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Notifications from './Notifications';
import AuctionHouse from "./AuctionHouse";

const App = () => {
    const [products, setProducts] = useState([]);
    const [session, setSession] = useState(null);
    const [userId, setUserId] = useState(null);  // State to store the user ID

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            fetchUserId();  // Fetch the user ID as soon as the session is available
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            fetchUserId();  // Fetch the user ID on auth state changes
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserId = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data && data.user) {
            setUserId(data.user.id);  // Set user ID in state
        } else if (error) {
            console.error('Error fetching user data:', error);
        }
    };

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
                        <Route path="/auctions" element={session ? <AuctionHouse userId={userId} /> : <Navigate to="/login" />} />
                        <Route path="/add-product" element={session ? <AddProductForm handleAddProduct={handleAddProduct} /> : <Navigate to="/login" />} />
                        <Route path="/notifications" element={session && userId ? <Notifications userIds={[userId]} /> : <Navigate to="/login" />} />
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
