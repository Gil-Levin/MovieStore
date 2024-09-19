import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [originalCartItems, setOriginalCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
      setOriginalCartItems(itemsWithProducts);
      setLoading(false);
    } catch (err) {
      setError('You have no items in the cart!');
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

  const updateItemQuantity = (itemId, newQuantity) => {
    if (!isEditing || newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.itemID === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItemFromCart = (itemId) => {
    if (!isEditing) return;

    setCartItems(prevItems => prevItems.filter(item => item.itemID !== itemId));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUpdateError('User not authenticated.');
        return;
      }

      await Promise.all(cartItems.map(async (item) => {
        const payload = {
          itemID: item.itemID,
          quantity: item.quantity
        };
        await axios.put(`http://localhost:7178/api/Items/${item.itemID}`, payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }));

      setOriginalCartItems(cartItems);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating cart items:', error);
      setUpdateError('Failed to update cart items.');
    }
  };

  const handleCancelChanges = () => {
    setCartItems(originalCartItems);
    setIsEditing(false);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {updateError && <div className="error">{updateError}</div>}

      {isEditing ? (
        <div className="cart-actions">
          <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
          <button onClick={handleCancelChanges} className="cancel-button">Cancel Changes</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
      )}

      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.itemID} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.product.name}</h2>
                <p>Price: ${item.product.price}</p>
                <div className="quantity-container">
                  <button
                    onClick={() => updateItemQuantity(item.itemID, item.quantity - 1)}
                    disabled={!isEditing}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => updateItemQuantity(item.itemID, item.quantity + 1)}
                    disabled={!isEditing}
                  >
                    +
                  </button>
                </div>
                {isEditing && (
                  <button
                    onClick={() => removeItemFromCart(item.itemID)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                )}
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
