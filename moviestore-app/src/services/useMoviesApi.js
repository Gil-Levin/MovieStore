import axios from 'axios';
import { useContext } from 'react';
import MoviesContext from '../context/MoviesContext';
import CartItemsContext from '../context/CartItemsContext';

const API_URL = 'http://localhost:7178/api/products';
const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const useMoviesApi = () => {
  const { setMovies, refreshMovies } = useContext(MoviesContext);
  const { setCartItems } = useContext(CartItemsContext);

  const updateMovie = async (movie) => {
    try {
      await axios.put(`${API_URL}/${movie.productId}`, movie, { headers: headers() });
      refreshMovies();
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  const deleteMovie = async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`, { headers: headers() });
      setMovies((prevMovies) => prevMovies.filter(movie => movie.productId !== productId));
      setCartItems((prevCartItems) => prevCartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const addMovie = async (movie) => {
    try {
      await axios.post(API_URL, movie, { headers: headers() });
      refreshMovies();
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return {
    updateMovie,
    deleteMovie,
    addMovie,
  };
};
