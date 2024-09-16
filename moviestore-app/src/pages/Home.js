import React, { useContext } from 'react';
import MoviesContext from '../context/MoviesContext';
import LittleMovieCard from '../components/littleMovieCard';
import '../css/Home.css';

const Home = () => {
  const { movies, loading } = useContext(MoviesContext);

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="home-page">
      <section className="movies-section">
        <h2 className="movies-title">Featured Movies</h2>
        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <LittleMovieCard
                key={index}
                movie={movie}
              />
            ))
          ) : (
            <h1>No movies to display</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;