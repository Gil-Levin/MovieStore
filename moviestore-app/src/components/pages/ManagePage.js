import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState } from 'react';

// Tables
import MoviesTable from '../movie/MoviesTable';
import UsersTable from '../user/UsersTable';
import OrdersTable from '../order/OrdersTable';

const ManagePage = () => {
    const [activeTab, setActiveTab] = useState('movies');

    const renderTable = () => {
        switch (activeTab) {
            case 'movies':
                return <MoviesTable />;
            case 'users':
                return <UsersTable />;
            case 'orders':
                return <OrdersTable />;
            default:
                return null;
        }
    };

    return (
        <Container fluid>
            <Row className="mb-3">
                <Col>
                    <Button
                        variant={activeTab === 'movies' ? 'warning' : 'secondary'}
                        onClick={() => setActiveTab('movies')}
                    >
                        Show Movies
                    </Button>
                    <Button
                        variant={activeTab === 'users' ? 'warning' : 'secondary'}
                        onClick={() => setActiveTab('users')}
                        className="ms-2"
                    >
                        Show Users
                    </Button>
                    <Button
                        variant={activeTab === 'orders' ? 'warning' : 'secondary'}
                        onClick={() => setActiveTab('orders')}
                        className="ms-2"
                    >
                        Show Orders
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {renderTable()}
                </Col>
            </Row>
        </Container>
    );
};

export default ManagePage;
