import React, { useState, useEffect } from 'react';
import { Drawer, Button, TextInput, Group, Switch, NumberInput } from '@mantine/core';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const [product, setProduct] = useState({ name: '', description: '', price: null, image: '', isauction: false, timeend: '' });
    const [userId, setUserId] = useState(null);
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data && data.user) {
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
                [name]: value
            }));
        }
    };

    const handleSwitchChange = (event) => {
        const isChecked = event.currentTarget.checked;
        setProduct(prev => ({
            ...prev,
            isauction: isChecked,
            timeend: isChecked ? prev.timeend : ''  // Clear the timeend if not auction
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure timeend is not set if not an auction
        const submissionData = {
            ...product,
            user_id: userId,
            timeend: product.isauction ? product.timeend : null
        };

        const { data, error } = await supabase
            .from('products')
            .insert([submissionData]);

        if (error) {
            console.error('Error inserting data: ', error);
        } else {
            setProduct({ name: '', description: '', price: null, image: '', isauction: false, timeend: '' });
            setOpened(false);
            navigate('/');
        }
    };

    const handleClose = () => {
        setOpened(false);
        navigate('/');
    };

    return (
        <>
            <Drawer
                opened={opened}
                onClose={handleClose}
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
                    <NumberInput
                        label={product.isauction ? "Starting Bid" : "Price"}
                        name="price"
                        value={product.price || ''}
                        onChange={value => setProduct(prev => ({ ...prev, price: value }))}
                        required
                    />
                    <Switch
                        label="List as auction"
                        checked={product.isauction}
                        onChange={handleSwitchChange}
                    />
                    {product.isauction && (
                        <input
                            type="datetime-local"
                            name="timeend"
                            value={product.timeend}
                            onChange={handleChange}
                            required={product.isauction}
                            style={{ width: '100%', marginTop: 10, padding: '8px' }}
                        />
                    )}

                    <Group position="left" grow>
                        <label htmlFor="image-upload">
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
