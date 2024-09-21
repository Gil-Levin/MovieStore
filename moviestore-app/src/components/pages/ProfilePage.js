import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Loading from "../common/Loading";
import UserCard from '../user/UserCard';
import CartTable from '../cart/CartTable';

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
        setLoading(false); // Loading ends after checking the user data
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
                <Col md={8} lg={6}>
                    <UserCard user={user} />
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h4>Cart Items</h4>
                    <CartTable />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
