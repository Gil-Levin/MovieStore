import React, { useContext, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FaCartPlus, FaEdit, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import CartItemsContext from '../../context/CartItemsContext';
import { useAddToCart } from '../../hooks/useAddToCart';

const MovieDetails = ({ movie, setIsEditing, setShowModal }) => {
  const { productId, name, category, price, description } = movie;
  const { cartItems } = useContext(CartItemsContext);
  const { isAuthenticated, isAuthorized } = useContext(AuthContext);
  const { handleAddToCart } = useAddToCart();
  const history = useHistory();
  const [cartMessage, setCartMessage] = useState(null);
  const isInCart = cartItems.some(item => item.productID === productId);

  const addToCart = async () => {
    try {
      await handleAddToCart(productId);
      setCartMessage(`${name} has been added to your cart.`);
    } catch (error) {
      setCartMessage(`Failed to add ${name} to your cart.`);
    }
  };

  return (
    <>
      <hr />
      <h2>{name}</h2>
      <hr />
      <h5 className="text-muted">{category}</h5>
      <p><strong>Price: </strong>${price}</p>
      <p>{description}</p>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <div className="button-group">
          {isAuthenticated && (
            <>
              {isInCart || cartMessage ? (
                <Alert variant="warning">
                  {isInCart ? `${name} has been added to your cart.` : cartMessage}
                </Alert>
              ) : (
                <Button variant="warning" className="me-2" onClick={addToCart}>
                  <FaCartPlus className="me-1" /> Add to Cart
                </Button>
              )}
            </>
          )}
          {isAuthorized && (
            <>
              <Button variant="primary" className="me-2" onClick={() => setIsEditing(true)}>
                <FaEdit className="me-1" /> Edit
              </Button>
              <Button variant="danger" className="me-2" onClick={() => setShowModal(true)}>
                <FaTrashAlt className="me-1" /> Delete
              </Button>
            </>
          )}
        </div>
        <div>
          <Button variant="secondary" onClick={() => history.goBack()} className="float-end">
            <FaArrowLeft className="me-1" /> Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;