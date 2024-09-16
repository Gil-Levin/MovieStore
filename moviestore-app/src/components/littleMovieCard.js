import React from 'react';
import { Card } from 'react-bootstrap';
import '../css/LittleMovieCard.css';


const LittleMovieCard = ({ movie }) => {
  const { productId, image, name, category, price } = movie;

  return (
    <Card className="little-movie-card">
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        className="movie-card-img"
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LittleMovieCard;