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
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Error fetching user details');
      } finally {
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
    setError(''); // Clear previous errors

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await axios.put(`http://localhost:7178/api/users/${id}`, user);
      history.push('/users');
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 409:
            setError(err.response.data.message || 'Username or email is already taken. Please choose a different one.');
            break;
          case 400:
            setError('Invalid data. Please check your input and try again.');
            break;
          default:
            setError('Error updating user');
        }
      } else {
        setError('Error updating user');
      }
    }
  };

  const handleCancel = () => {
    history.push('/users');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-container">
      <img src={imagePreview} alt={`Profile of ${user.username}`} className="profile-image" style={{ width: 200, height: 300 }} />
      <div className="edit-form">
        <h2>Edit User</h2>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <label htmlFor="userType">User Type:</label>
            <input
              type="text"
              id="userType"
              name="userType"
              value={user.userType}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel} style={{ marginLeft: '10px', backgroundColor: '#ccc' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
