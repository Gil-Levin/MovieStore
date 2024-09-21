import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7178/api/Login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      login(token, user);
      history.push('/profile'); // Redirect to /profile on successful login
    } catch (error) {
      setNotification({ message: 'Login failed. Please check your credentials.', type: 'danger' });
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="d-flex align-items-center">
                <FaLock className="me-2" />
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            </Form.Group>

            <Button variant="warning" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>

          {notification.message && (
            <Alert variant={notification.type} className="mt-3">
              {notification.message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;