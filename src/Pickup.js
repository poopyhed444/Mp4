import React, { useState } from 'react';
import { supabase } from './supabase';
const PickupModal = ({ isOpen, product, onClose, onConfirm }) => {
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');

    const handleConfirm = async () => {
        const { data, error } = await supabase
            .from('pickups')
            .insert([
                {
                    product_id: product.id,
                    address,
                    time,
                    user_id: product.user_id
                }
            ]);
        if (error) {
            console.error('Error inserting pickup data: ', error);
        } else {
            console.log('Pickup data inserted successfully: ', data);
            onConfirm(product.id, address, time);
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
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    );
};
export default PickupModal;