import React from 'react';
import '../css/MovieCard.css';

const MovieCard = ({ movie, onToggle }) => {
  return (
    <div
      className="movie-card"
      onClick={() => onToggle(movie.productId)}
    >
      <div className="movie-url">
        {movie.image && (
          <img
            src={movie.image}
            alt={movie.name}
          />
        )}
      </div>
      <div className="title">{movie.name}</div>
      {!!movie.isToggleOn && (
        <div className="movie-details">
          <div className="overview">{movie.description}</div>
          <div className="price">Price: ${movie.price}</div>
          <div className="genre">Category: {movie.category}</div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
