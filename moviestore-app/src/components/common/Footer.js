import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-dark text-light py-3 mt-auto">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col xs="auto">
                        <a
                            href="https://www.linkedin.com/in/gil-levin-a84362224"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light mx-3"
                        >
                            <FaLinkedin size={24} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a
                            href="https://github.com/Gil-Levin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light mx-3"
                        >
                            <FaGithub size={24} />
                        </a>
                    </Col>
                    <Col xs="auto">
                        <a
                            href="https://www.codewars.com/users/Shadowlife5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light mx-3"
                        >
                            <FaCode size={24} />
                        </a>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <p className="mb-0">&copy; {new Date().getFullYear()} Gil Levin</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;