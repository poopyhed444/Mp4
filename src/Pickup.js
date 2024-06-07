import React, { useState } from 'react';

const PickupModal = ({ isOpen, product, onClose, onConfirm }) => {
    const [address, setAddress] = useState('');
    const [time, setTime] = useState('');

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
                <button onClick={() => onConfirm(product.id, address, time)}>Confirm</button>
            </div>
        </div>
    );
};
export default PickupModal;