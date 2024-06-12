import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { MantineProvider, Button } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import AppHeader from './AppHeader';
import { supabase } from './supabase';
import { Auth } from '@supabase/auth-ui-react';
import Notifications from './Notifications';
import AuctionHouse from "./AuctionHouse";

const App = () => {
    const [products, setProducts] = useState([]);
    const [session, setSession] = useState(null);
    const [userId, setUserId] = useState(null);

    // Mantine hook to get the preferred color scheme (light or dark)
    const systemTheme = useColorScheme();

    // Use local storage to persist the theme selection
    const [theme, setTheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: systemTheme,
        getInitialValueInEffect: true
    });

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            fetchUserId();
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            fetchUserId();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserId = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data && data.user) {
            setUserId(data.user.id);
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
        <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles withNormalizeCSS>
            <Router>
                <div className="App">
                    <AppHeader toggleTheme={toggleTheme} /> {}
                    <Routes>
                        <Route path="/" element={session ? <ProductList products={products} handleRemove={handleRemoveProduct} /> : <Navigate to="/login" />} />
                        <Route path="/auctions" element={session ? <AuctionHouse userId={userId} /> : <Navigate to="/login" />} />
                        <Route path="/add-product" element={session ? <AddProductForm handleAddProduct={handleAddProduct} /> : <Navigate to="/login" />} />
                        <Route path="/notifications" element={session && userId ? <Notifications userIds={[userId]} /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!session ? (
                            <Auth
                                supabaseClient={supabase}
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
