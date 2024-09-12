import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const MoviesContext = createContext(); 

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);  

      try {
        const response = await axios.get('http://localhost:7178/api/products');
        const products = response.data.map((product) => ({
          ...product,
          isToggleOn: false,
        }));

        setMovies(products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, loading, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
