import axios from 'axios';

const API_URL = 'http://localhost:7178/api/products';

// Helper function to get the token
const getToken = () => localStorage.getItem('token');

export const updateMovie = async (movie) => {
  const token = getToken();
  return axios.put(`${API_URL}/${movie.productId}`, movie, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

export const deleteMovie = async (productId) => {
  const token = getToken();
  return axios.delete(`${API_URL}/${productId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};
