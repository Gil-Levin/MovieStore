import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('http://localhost:7178/api/products');
      const products = data.map((product) => ({
        ...product,
        isToggleOn: false,
      }));
      setMovies(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <MoviesContext.Provider value={{ movies, isLoading, refreshMovies: fetchMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;