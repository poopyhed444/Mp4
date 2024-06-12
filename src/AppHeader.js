import React from 'react';
import { Title, Group, Anchor, Flex, Divider, ActionIcon, Button, Container} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Bell, Hammer, MoonStars } from 'tabler-icons-react';
import logo from './holmerr.jpg';

const AppHeader = ({ toggleTheme }) => {
    return (
        <header>
            <Flex justify="space-between" align="center" style={{ padding: '0 20px' }}>
                <Group spacing="xs" align="center">
                    <img src={logo} alt="HolmerMarkets Logo" style={{ height: '40px' }} />
                    <Title order={1}>Holmer's List</Title>
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
                    <ActionIcon onClick={toggleTheme}>
                        <MoonStars size={20} />
                    </ActionIcon>
                </Group>
            </Flex>
            <Divider />
        </header>
    );
};

export default AppHeader;
