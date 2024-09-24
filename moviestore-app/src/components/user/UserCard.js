import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

const UserCard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Card className="p-4 shadow-lg">
            <Row className="text-center mb-4">
                <Col>
                    {user && user.profilePicture ? (
                        <Image
                            src={user.profilePicture}
                            roundedCircle
                            width="150"
                            height="150"
                            alt="Profile"
                            className="border border-dark"
                        />
                    ) : (
                        <FaUser size={150} className="text-muted" />
                    )}
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <h3>{user ? user.username : 'Unknown User'}</h3>
                    <p>{user ? user.email : 'No Email Provided'}</p>
                </Col>
            </Row>
        </Card>
    );
};

export default UserCard;
