import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Loading from "../common/Loading";
import UserCard from '../user/UserCard';
import CartTable from '../cart/CartTable';
import UserOrders from '../user/UserOrders';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setError(true);
        }
        setLoading(false);
    }, []);

    document.title = "Movie Store - Profile";

    if (loading) return <Loading />;
    if (error) {
        return (
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Alert variant="danger" className="text-center">
                            Couldn't get the user information. Please try again later.
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={12} md={5} lg={5} xl={4} xxl={3}>
                    <UserCard />
                    <UserOrders />
                </Col>
                <Col xs={12} sm={12} md={7} lg={7} xl={8} xxl={9}>
                    <CartTable />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;