import axios from 'axios';
import { useContext } from 'react';
import CartItemsContext from '../context/CartItemsContext';

const API_URL = 'http://localhost:7178/api/items';
const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const useCartItemsApi = () => {
  const { refreshCartItems, setCartItems } = useContext(CartItemsContext);

  const updateItem = async (updatedProperties) => {
    try {
      await axios.put(`${API_URL}/${updatedProperties.itemID}`, updatedProperties, { headers: headers() });
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.itemID === updatedProperties.itemID
            ? { ...item, ...updatedProperties }
            : item
        )
      );
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/${itemId}`, { headers: headers() });
      setCartItems((prevItems) => prevItems.filter(item => item.itemID !== itemId));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const addItem = async (item) => {
    try {
      await axios.post(API_URL, item, { headers: headers() });
      refreshCartItems();
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  return {
    updateItem,
    deleteItem,
    addItem,
  };
};
