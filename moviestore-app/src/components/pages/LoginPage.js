import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import RegisterUser from '../user/RegisterUser';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const history = useHistory();
  const { login, isLoading } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push('/profile');
    } catch (error) {
      setNotification({ message: 'Login failed. Please check your credentials.', type: 'danger' });
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    }
  };

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Alert variant='warning'>
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

              <Button variant="warning" type="submit" className="w-100" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <p className="text-center mt-3">
              Don't have an account? <Button variant="warning" onClick={handleShowRegisterModal}>Register</Button>
            </p>

            {notification.message && (
              <Alert variant={notification.type} className="mt-3">
                {notification.message}
              </Alert>
            )}
          </Alert>
        </Col>
      </Row>

      {/* Register User Modal */}
      <RegisterUser show={showRegisterModal} handleClose={handleCloseRegisterModal} />
    </Container>
  );
}

export default LoginPage;
