import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Tables
import MoviesTable from '../movie/MoviesTable';
import UsersTable from '../user/UsersTable';
import OrdersTable from '../order/OrdersTable';

const tabs = {
  movies: {
    path: '/manage/movies',
    component: <MoviesTable />,
    title: 'Movie Store - Manage Movies',
  },
  users: {
    path: '/manage/users',
    component: <UsersTable />,
    title: 'Movie Store - Manage Users',
  },
  orders: {
    path: '/manage/orders',
    component: <OrdersTable />,
    title: 'Movie Store - Manage Orders',
  },
};

const ManagePage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const activeTab = Object.keys(tabs).find((key) => pathname === tabs[key].path) || '';

  useEffect(() => {
    document.title = tabs[activeTab]?.title || 'Movie Store - Manage';
  }, [activeTab]);

  const handleTabChange = (tab) => {
    history.push(tabs[tab].path);
  };

  return (
    <Container fluid>
      <Row className="mb-3 justify-content-center">
        <Col className="welcome-section text-center py-5 bg-warning m-4 rounded">
          <h1 className="display-4">Welcome, Admin!</h1>
          <hr />
          <h2 className="lead">
            Manage your movies, users, and orders from this page.
          </h2>
          <hr />
          <p>Which table do you want to manage?</p>
          {Object.keys(tabs).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'warning' : 'secondary'}
              onClick={() => handleTabChange(tab)}
              className={activeTab === tab ? 'mx-2 fw-bold' : 'mx-2'}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>{tabs[activeTab]?.component}</Col>
      </Row>
    </Container>

  );
};

export default ManagePage;
