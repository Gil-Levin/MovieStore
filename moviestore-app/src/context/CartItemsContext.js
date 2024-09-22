import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartItemsContext = createContext();

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var user = JSON.parse(localStorage.getItem('user'));
  var userId = user?.userId;
  
  const fetchCartItems = useCallback(async () => {
    setIsLoading(true);
    user = JSON.parse(localStorage.getItem('user'));
    userId = user?.userId;
    if (!userId) {
      console.error('No userId found in local storage');
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(`http://localhost:7178/api/Items/${userId}`);
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  console.log(cartItems);

  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems, isLoading, refreshCartItems: fetchCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsContext;
