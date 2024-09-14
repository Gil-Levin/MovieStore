import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../css/Edit.css';

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:7178/api/products/${id}`);
        setProduct(response.data);
        setImagePreview(response.data.image); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        const aspectRatio = img.width / img.height;
        let drawWidth, drawHeight;
        let offsetX = 0, offsetY = 0;

        if (aspectRatio > 200 / 300) {
          drawHeight = 300;
          drawWidth = 300 * aspectRatio;
          offsetX = -(drawWidth - 200) / 2;
        } else {
          drawWidth = 200;
          drawHeight = 200 / aspectRatio;
          offsetY = -(drawHeight - 300) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const base64Image = canvas.toDataURL('image/jpeg');
        setProduct({ ...product, image: base64Image });
        setImagePreview(base64Image);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name.trim()) {
      setError('Name cannot be empty.');
      return;
    }
    if (!product.description.trim()) {
      setError('Description cannot be empty.');
      return;
    }
    if (!product.category.trim()) {
      setError('Category cannot be empty.');
      return;
    }
    if (!product.price || product.price <= 0) {
      setError('Price must be greater than 0.');
      return;
    }
    if (!product.image) {
      setError('Image cannot be empty.');
      return;
    }

    if (product.name.length > 50) {
      setError('Name cannot exceed 50 characters.');
      return;
    }
    if (product.description.length > 500) {
      setError('Description cannot exceed 500 characters.');
      return;
    }
    if (product.category.length > 50) {
      setError('Category cannot exceed 50 characters.');
      return;
    }

    try {
      await axios.put(`http://localhost:7178/api/products/${id}`, product);
      setSuccess('Product updated successfully!');
      setTimeout(() => {
        history.push('/edit');
      }, 2000);
    } catch (err) {
      setError('Error updating product');
    }
  };

  const handleCancel = () => {
    history.push('/edit');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-container">
      <img src={imagePreview} alt={product.name} className="product-image" style={{ width: 200, height: 300 }} />
      <div className="product-details">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Image Upload:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
        {error && <div className="notification error">{error}</div>}
        {success && <div className="notification success">{success}</div>}
      </div>
    </div>
  );
};

export default ProductEdit;
