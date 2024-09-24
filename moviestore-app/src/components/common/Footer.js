import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const logoPath = process.env.PUBLIC_URL + '/favicon/android-chrome-192x192.png';

function Footer() {
    const history = useHistory();

    // Function to navigate to a specific route
    const navigateTo = (path) => {
        history.push(path);
    };

    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                {/* Introduction Section */}
                <Row className="text-center mb-4">
                    <Col>
                        <h4>
                            <img src={logoPath} alt="Logo" style={{ width: '30px', marginRight: '8px' }} />
                            Movie Store
                        </h4>
                        <p className="lead">By Full Stack Developer Gil Levin</p>
                        <p>
                            Welcome! This site was built with robust back-end tech and a dynamic front-end.
                            Search our extensive movie database effortlessly. Enjoy the experience!
                        </p>
                    </Col>
                </Row>

                {/* Navigation Buttons */}
                <Row className="justify-content-center mb-3">
                    {['/', '/movies', '/about', '/profile', '/manage'].map((path, index) => (
                        <Col key={index} xs="auto">
                            <Button variant="outline-light" onClick={() => navigateTo(path)}>
                                {path === '/' ? 'Home' : path.charAt(1).toUpperCase() + path.slice(2)}
                            </Button>
                        </Col>
                    ))}
                </Row>

                {/* Social Links */}
                <Row className="justify-content-center text-center mb-3">
                    <Col xs="auto">
                        <a
                            href="https://www.linkedin.com/in/gil-levin-a84362224"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light mx-2"
                        >
                            <FaLinkedin size={24} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a
                            href="https://github.com/Gil-Levin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light mx-2"
                        >
                            <FaGithub size={24} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a
                            href="https://www.codewars.com/users/Shadowlife5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light mx-2"
                        >
                            <FaCode size={24} />
                        </a>
                    </Col>
                </Row>

                {/* Copyright */}
                <Row className="text-center">
                    <Col>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Gil Levin. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
