import React, { useState } from 'react';
import { supabase } from './supabase';

const PickupModal = ({ isOpen, product, onClose, onConfirm }) => {
    const [address, setAddress] = useState('');
    const [datetime, setDatetime] = useState('');  // Renamed to datetime to reflect both date and time

    const handleConfirm = async () => {
        const { data, error } = await supabase
            .from('pickups')
            .insert([
                {
                    product_id: product.id,
                    product_name: product.name,  // Assuming the product object has a 'name' property
                    address,
                    time: datetime,  // Using datetime here
                    user_id: product.user_id
                }
            ]);
        if (error) {
            console.error('Error inserting pickup data: ', error);
        } else {
            console.log('Pickup data inserted successfully: ', data);
            onConfirm(product.id, address, datetime);  // Pass datetime instead of just time
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Pickup Details for {product.name}</h2>
                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                />
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default PickupModal;
