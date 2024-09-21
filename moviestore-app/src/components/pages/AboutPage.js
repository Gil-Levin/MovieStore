import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './about-page.css';

const AboutPage = () => {
    useEffect(() => {
        document.title = "Movie Store - About";
    }, []);

    const handleImageClick = (e) => {
        e.target.classList.add('backflip');
        setTimeout(() => {
            e.target.classList.remove('backflip');
        }, 1000); // Duration of the animation
    };

    return (
        <Container className="text-center my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={12}>
                    <Alert variant="warning" className='about-window'>
                        <h2>Hello, I'm Gil.</h2>
                        <h3>A Full Stack Web Developer</h3>
                    </Alert>
                </Col>
            </Row>
            <hr />
            <Row className="my-4">
                <Col xs={12} md={4} className='my-2'>
                    <Alert variant="warning" className='about-window'>
                        Welcome to my Movie Store! This unique website was built from the ground up using a full-stack approach, combining robust back-end technologies with a dynamic front-end experience. You can effortlessly search for any movie you desire, thanks to a well-organized database.
                    </Alert>
                </Col>
                <Col xs={12} md={4} className='my-2'>
                    <Image
                        src="https://preview.redd.it/7qalrjf53th51.png?auto=webp&s=5394748cc864bcb0d0dd4b1809e17a3ef296e437"
                        alt="funny"
                        fluid
                        onClick={handleImageClick}
                        className='about-image'
                    />
                </Col>
                <Col xs={12} md={4} className='my-2'>
                    <Alert variant="warning" className='about-window'>
                        As a passionate developer, I poured my heart into creating this platform. Explore a vast collection of movies, searchable by various keywords, ensuring you find exactly what you're looking for. Enjoy the experience and happy movie watching!
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;
