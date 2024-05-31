import { Header, Group, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <Header height={60} p="xs">
      <Group position="apart" style={{ height: '100%' }}>
        <div>Best Sellers</div>
        <Group>
          <Button variant="subtle" component={Link} to="/">
            Home
          </Button>
          <Button variant="subtle" component={Link} to="/add-product">
            Add Product
          </Button>
        </Group>
      </Group>
    </Header>
  );
};

export default AppHeader;
