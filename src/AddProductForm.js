import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const AddProductForm = () => {
    const [product, setProduct] = useState({ name: '', description: '', price: '', image: '' });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data && data.user) {
                console.log('User is logged in:', data.user.id);
                setUserId(data.user.id);
            } else {
                console.error('No user is logged in.', error);
            }
        };

        getUser();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            let reader = new FileReader();
            reader.onloadend = () => {
                setProduct({ ...product, image: reader.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    name: product.name,
                    description: product.description,
                    price: parseFloat(product.price),
                    image: product.image,
                    user_id: userId
                }
            ]);
        if (error) {
            console.error('Error inserting data: ', error);
        } else {
            console.log('Data inserted successfully: ', data);
            setProduct({ name: '', description: '', price: '', image: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={product.name} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={product.description} onChange={handleChange} required />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </label>
            <label>
                Image:
                <input type="file" name="image" onChange={handleChange} required />
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddProductForm;
