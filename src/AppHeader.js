import React from 'react';
import { Title, Group, Anchor, Flex, Divider } from '@mantine/core';
import { Link } from 'react-router-dom';
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
                </Group>
            </Flex>
            <Divider />
        </header>
    );
};

export default AppHeader;

