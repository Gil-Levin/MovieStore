import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import MoviesContext from '../../context/MoviesContext';
import './movie-page.css';

const MoviePage = () => {
  const { productId } = useParams();
  const { movies, loading } = useContext(MoviesContext);

  const movie = movies.find(m => m.productId === parseInt(productId));

  if (loading) {
    document.title = "Movie Store - Loading...";
    return (
      <Container className="movie-page">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!movie) {
    document.title = "Movie Store - Movie not found!";
    return (
      <Container className="movie-page">
        <Alert variant="danger">Movie not found!</Alert>
      </Container>
    );
  }

  const { image, name, category, price, description } = movie;
  document.title = `Movie Store - ${movie.name}`;

  return (
    <Container className="movie-page">
      <Row>
        <Col md={4}>
          <Image src={image} alt={name} fluid className="movie-page-img" />
        </Col>
        <Col md={8}>
          <h2>{name}</h2>
          <h5 className="text-muted">{category}</h5>
          <p><strong>Price: </strong>${price}</p>
          <p>{description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;