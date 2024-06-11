import React, { useState, useEffect } from 'react';
import { Drawer, Button, TextInput, Group } from '@mantine/core';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const AddProductForm = () => {
    const [product, setProduct] = useState({ name: '', description: '', price: null, image: '' });
    const [userId, setUserId] = useState(null);
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate(); // Initialize the navigation hook

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data && data.user) {
                console.log('User is logged in:', data.user.id);
                setUserId(data.user.id);
                setOpened(true);
            } else {
                console.error('No user is logged in.', error);
            }
        };

        getUser();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setProduct(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setProduct(prev => ({
                ...prev,
                [name]: name === 'price' ? parseFloat(value) || null : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('products')
            .insert([{ ...product, user_id: userId }]);

        if (error) {
            console.error('Error inserting data: ', error);
        } else {
            console.log('Data inserted successfully: ', data);
            setProduct({ name: '', description: '', price: null, image: '' }); // Reset form
            setOpened(false); // Close the drawer
            navigate('/'); // Navigate to the root page
        }
    };

    const handleClose = () => {
        setOpened(false); // Close the drawer
        navigate('/'); // Navigate to the root page
    };

    return (
        <>
            <Drawer
                opened={opened}
                onClose={handleClose} // Call handleClose when the drawer is closed
                title="Add Product"
                padding="xl"
                size="xl"
                position="left"
            >
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="price">
                        Price:
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price || ''}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', marginTop: 10 }}
                        />
                    </label>
                    <Group position="left" grow>
                        <label htmlFor="image-upload" style={{ width: '100%' }}>
                            Image:
                            <input
                                type="file"
                                id="image-upload"
                                name="image"
                                onChange={handleChange}
                                required
                                style={{ width: '100%', marginTop: 10 }}
                            />
                        </label>
                    </Group>
                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Drawer>
        </>
    );
}

export default AddProductForm;
