import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Edit.css';

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:7178/api/products');
        setProducts(response.data.map(product => ({ ...product, isToggleOn: false })));
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToggle = (productId) => {
    setProducts(products.map(product => 
      product.productId === productId
        ? { ...product, isToggleOn: !product.isToggleOn }
        : product
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Products</h1>
      <h3 className="subheader">
        Manage and update your products here. Click on any product to edit its details.
      </h3>
      <div className="movies-container">
        {products.length > 0 ? (
          products.map(product => (
            <div className="movie" key={product.productId} onClick={() => handleToggle(product.productId)}>
              <div className="movie-url">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="movie-image"
                  />
                )}
              </div>
              <div className="title">{product.name}</div>
              {!!product.isToggleOn && (
                <div className="movie-details">
                  <div className="overview">Overview: {product.description}</div>
                  <div className="price">Price: ${product.price}</div>
                  <div className="genre">Category: {product.category}</div>
                  <div className="rating">Rating: {product.rating}</div>
                  <button><Link to={`/edit/${product.productId}`} className="edit-button">Edit</Link></button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1>No products to display</h1>
        )}
      </div>
    </div>
  );
};

export default Edit;
