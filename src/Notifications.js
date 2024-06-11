import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Paper, Title, Timeline, Text } from '@mantine/core';

const Notifications = ({ userIds }) => {
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
                        const recentNotifications = data.filter(notification => {
                            // Assuming notification.time is a timestamp in ISO format
                            const notificationTime = new Date(notification.time);
                            const currentTime = new Date();
                            const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
                            return currentTime - notificationTime < fiveMinutes;
                        });
                        allNotifications.push(...recentNotifications);
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
        <Paper padding="md" shadow="xs" radius="md" style={{ marginTop: 20 }}>
            <Title order={2} style={{ marginBottom: 20 }}>Notifications</Title>
            <Timeline active={0} bulletSize={24} lineWidth={2}>
                {notifications.map((notification, index) => (
                    <Timeline.Item key={notification.id} title={`Notification #${index + 1}`}>
                        <Text size="sm">
                            <strong>Product Name:</strong> {notification.product_name}
                        </Text>
                        <Text size="sm">
                            <strong>Address:</strong> {notification.address}
                        </Text>
                        <Text size="sm">
                            <strong>Time:</strong> {notification.time}
                        </Text>
                    </Timeline.Item>
                ))}
            </Timeline>
        </Paper>
    );
};

export default Notifications;
