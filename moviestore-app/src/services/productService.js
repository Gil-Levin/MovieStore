import axios from 'axios';

const API_URL = 'http://localhost:7178/api/products';

export async function getProduct(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
}

export async function updateProduct(id, product) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}


export async function setMovies(movie) {
    try {
      await axios.put(`${API_URL}/${movie.id}`, movie);
      console.log('Movie updated successfully');
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  }
  
