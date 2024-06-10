import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const Notifications = ({userIds}) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const allNotifications = [];
                for (const userId of userIds) {
                    const { data, error } = await supabase
                        .from('pickups')
                        .select('*')
                        .eq('user_id', userId);

                    if (error) {
                        console.error(`Error fetching notifications for user ${userId}:`, error);
                    } else {
                        allNotifications.push(...data);
                    }
                }
                setNotifications(allNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userIds]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        Product ID: {notification.product_id}, Address: {notification.address}, Time: {notification.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
