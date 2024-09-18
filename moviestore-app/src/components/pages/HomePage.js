import React, { useContext } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import MoviesContext from '../../context/MoviesContext';
import MovieCard from '../movie/MovieCard';
import Loading from '../common/Loading';

import './home-page.css';


const HomePage = () => {
  const { movies, isLoading } = useContext(MoviesContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container fluid>
      {/* Welcome Section */}
      <Row className="justify-content-center">
        <Col className="welcome-section text-center py-5 bg-warning m-4 rounded">

          <h1 className="display-4">Welcome to The Movie Store!</h1>
          <hr />
          <p className="lead">
            Discover and buy your favorite movies from a wide selection.
            <br />
            Explore our latest collections and find the perfect movie for you.
          </p>
          <Button variant="dark" href="/movies" className="btn-lg">
            Explore Movies
          </Button>
        </Col>

      </Row>

      {/* Movie Cards Section */}
      <Row className="justify-content-center">
        <h2>Our Latest Collection</h2>
        {movies.length > 0 ? (
          movies.slice(-6).map((movie, index) => (
            <Col
              key={index}
              xs={6} sm={6} md={4} lg={3} xl={2}
              className="d-flex justify-content-center mb-4"
            >
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <h2>Sorry, Couldn't find any movies to show.</h2>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
