import React from 'react';
import { Title, Group, Anchor, Flex, Divider, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Bell, Hammer } from 'tabler-icons-react'; // Import the Hammer icon here, replace Hammer if using a different icon
import logo from './holmerr.jpg';

const AppHeader = () => {
    return (
        <header>
            <Flex justify="space-between" align="center" style={{ padding: '0 20px' }}>
                <Group spacing="xs" align="center">
                    <img src={logo} alt="HolmerMarkets Logo" style={{ height: '40px' }} />
                    <Title order={1}>HolmerMarkets</Title>
                </Group>
                <Group spacing="xl">
                    <Anchor component={Link} to="/" underline={false}>Home</Anchor>
                    <Anchor component={Link} to="/add-product" underline={false}>Add Product</Anchor>
                    <Anchor component={Link} to="/auctions" underline={false}>
                        <ActionIcon component={Link} to="/auctions">
                            <Hammer size={20} />
                        </ActionIcon>
                    </Anchor>
                    <Anchor component={Link} to="/notifications" underline={false}>
                        <ActionIcon component={Link} to="/notifications">
                            <Bell size={20} />
                        </ActionIcon>
                    </Anchor>
                </Group>
            </Flex>
            <Divider />
        </header>
    );
};

export default AppHeader;
