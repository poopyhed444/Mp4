import React from 'react';
import { Title, Group, Anchor, Flex, Divider } from '@mantine/core';
import { Link } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header>
            <Flex justify="space-between" align="center" style={{ padding: '0 20px' }}>
                <Title order={1}>HolmerMarkets</Title>
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
