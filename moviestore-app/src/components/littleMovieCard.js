import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/LittleMovieCard.css';

const LittleMovieCard = ({ movie }) => {
  const { productId, image, name, category, price } = movie;

  return (
    <Link to={`/movies/${productId}`} style={{ textDecoration: 'none' }}>
      <Card className="little-movie-card" role="button">
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="movie-card-img"
        />
        <Card.Body>
          <Card.Title as="h5">{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
          <Card.Text>${price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default LittleMovieCard;