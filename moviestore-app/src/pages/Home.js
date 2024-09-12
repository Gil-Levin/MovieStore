import React, { useContext } from 'react';
import MoviesContext from '../context/MoviesContext';
import '../css/Home.css';

const Home = () => {
  const { movies, loading, setMovies } = useContext(MoviesContext);

  const handleToggle = (productId) => {
    const updatedMovies = movies.map((product) => {
      if (product.productId === productId) {
        return { ...product, isToggleOn: !product.isToggleOn };
      }
      return product;
    });
    setMovies(updatedMovies);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1 className="welcome-title">Welcome to Movie Haven</h1>
        <p className="welcome-subtitle">Discover and enjoy the greatest movies (not really)!</p>
        <p className="welcome-description">
          Dive into our curated collection of films and find your next favorite movie. Scroll down to start exploring!
        </p>
      </section>
      <section className="movies-section">
        <h2 className="movies-title">Featured Movies</h2>
        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((product, index) => (
              <div
                className="movie"
                key={index}
                onClick={() => handleToggle(product.productId)}
              >
                <div className="movie-url">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  )}
                </div>
                <div className="title">{product.name}</div>
                {!!product.isToggleOn && (
                  <div className="movie-details">
                    <div className="overview">{product.description}</div>
                    <div className="price">Price: ${product.price}</div>
                    <div className="genre">Category: {product.category}</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h1>No products to display</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
