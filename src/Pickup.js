import React, { useState } from 'react';
import { supabase } from './supabase';

const PickupModal = ({ isOpen, product, onClose, onConfirm }) => {
    const [address, setAddress] = useState('');
    const [datetime, setDatetime] = useState('');  // Renamed to datetime to reflect both date and time

    const handleConfirm = async () => {
        const { data: pickupData, error: pickupError } = await supabase
            .from('pickups')
            .insert([
                {
                    product_id: product.id,
                    product_name: product.name,
                    address,
                    time: datetime,
                    user_id: product.user_id
                }
            ]);

        if (pickupError) {
            console.error('Error inserting pickup data: ', pickupError);
            return;
        }
        console.log('Pickup data inserted successfully: ', pickupData);

        const { data: deleteData, error: deleteError } = await supabase
            .from('products')
            .delete()
            .match({ id: product.id });

        if (deleteError) {
            console.error('Error deleting product: ', deleteError);
        } else {
            console.log('Product deleted successfully: ', deleteData);
            onConfirm(product.id, address, datetime);
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
