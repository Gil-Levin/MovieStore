import React, { useContext } from 'react';
import MoviesContext from '../context/MoviesContext';

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
    return <div>Loading movies...</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
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
                  <div className="rating">Price: ${product.price}</div>
                  <div className="genre">Category: {product.category}</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1>No products to display</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
