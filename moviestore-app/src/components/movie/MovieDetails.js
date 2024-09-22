// MovieDetails.js
import React from 'react';
import { Button } from 'react-bootstrap';

const MovieDetails = ({ movie, handleAddToCart, setIsEditing, setShowModal }) => {
  const { name, category, price, description } = movie;

  return (
    <>
      <hr />
      <h2>{name}</h2>
      <hr />
      <h5 className="text-muted">{category}</h5>
      <p><strong>Price: </strong>${price}</p>
      <p>{description}</p>
      <hr />
      <div className="button-group">
        <Button variant="warning" className="me-2" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="primary" className="me-2" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
      </div>
    </>
  );
};

export default MovieDetails;
