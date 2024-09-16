import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateError, setUpdateError] = useState('');

  const userId = JSON.parse(localStorage.getItem('user'))?.userId;

  const fetchCart = async () => {
    try {

        const cartResponse = await axios.get(`http://localhost:7178/api/Carts/${userId}`);
      const cartId = cartResponse.data.cartId;

      const itemsResponse = await axios.get(`http://localhost:7178/api/Items/${cartId}`);
      
      const items = Array.isArray(itemsResponse.data) ? itemsResponse.data : [itemsResponse.data];

      const itemDetailsPromises = items.map(async (item) => {
        const productResponse = await axios.get(`http://localhost:7178/api/Products/${item.productID}`);
        return {
          ...item,
          product: productResponse.data
        };
      });

      const itemsWithProducts = await Promise.all(itemDetailsPromises);
      setCartItems(itemsWithProducts);
      setLoading(false);
    } catch (err) {
      setError('Error fetching cart items');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [userId]);

  const updateItemQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(`http://localhost:7178/api/Items/${itemId}`, { 
        itemID: itemId, 
        quantity: newQuantity 
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setUpdateError('Failed to update item quantity.');
    }
  };
  
  const removeItemFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:7178/api/Items/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setUpdateError('Failed to remove item from cart.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {updateError && <div className="error">{updateError}</div>}
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.itemID} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.product.name}</h2>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: 
                  <button onClick={() => updateItemQuantity(item.itemID, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateItemQuantity(item.itemID, item.quantity + 1)}>+</button>
                </p>
                <button onClick={() => removeItemFromCart(item.itemID)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
