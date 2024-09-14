import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    email: '',
    profilePicture: '',
    userType: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:7178/api/users/${id}`);
        setUser(response.data);
        setImagePreview(response.data.profilePicture);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setUser({ ...user, profilePicture: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7178/api/users/${id}`, user);
      history.push('/users');
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleCancel = () => {
    history.push('/users');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-container">
      <img src={imagePreview} alt={user.username} className="product-image" style={{ width: 200, height: 300 }} />
      <div className="product-details">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label>User Type:</label>
            <input
              type="text"
              name="userType"
              value={user.userType}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel} style={{ marginLeft: '10px', backgroundColor: '#ccc' }}>
            Cancel
          </button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default UserEdit;
