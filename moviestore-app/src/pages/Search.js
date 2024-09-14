import React, { useContext, useState, useEffect } from 'react';
import MoviesContext from '../context/MoviesContext';
import MovieCard from '../components/movieCard';
import '../css/Search.css';

const Search = () => {
  const { movies, loading, setMovies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [sortOrder, setSortOrder] = useState('default'); 

  const [originalMovies, setOriginalMovies] = useState(movies);

  useEffect(() => {
    setOriginalMovies(movies);
  }, [movies]);

  useEffect(() => {
    const filtered = originalMovies.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, originalMovies]);

  useEffect(() => {
    let sortedMovies = [...filteredMovies];
    switch (sortOrder) {
      case 'name-asc':
        sortedMovies.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedMovies.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedMovies.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedMovies.sort((a, b) => b.price - a.price);
        break;
      case 'default':
        sortedMovies = [...originalMovies.filter(movie =>
          movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        )];
        break;
      default:
        break;
    }
    setFilteredMovies(sortedMovies);
  }, [sortOrder, filteredMovies, searchTerm, originalMovies]);

  const handleToggle = (productId) => {
    const updatedMovies = originalMovies.map((product) => {
      if (product.productId === productId) { 
        return { ...product, isToggleOn: !product.isToggleOn }; 
      }
      return product;
    });
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading movies...</div>;
  }

  return (
    <div>
      <h1 className="search-title">Search Page</h1>
      <div className="search-container">
        <input 
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for movies..."
        />
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="default">Default View</option>
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-desc">Sort by Price (High to Low)</option>
        </select>
      </div>
      <div className="movies-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.productId}
              movie={movie}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <h1>No products to display</h1>
        )}
      </div>
    </div>
  );
};

export default Search;

