import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = ({ history }) => {

    const goBack = () => {
        history.goBack();
    };

    const goHome = () => {
        history.push('/');
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <FaExclamationTriangle size={100} color="orange" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>404 - Page Not Found</h1>
                    <p className="lead">Oops! The page you are looking for doesn’t exist.</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="warning" onClick={goHome} className="me-3">
                        Home Page
                    </Button>
                    <Button variant="secondary" onClick={goBack}>
                        Go Back
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
