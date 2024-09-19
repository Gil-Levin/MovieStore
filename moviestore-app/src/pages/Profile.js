import React, { useState, useContext } from 'react';
import EditProfile from './ProfileEdit';
import AuthContext from '../context/authContext';
import { Link } from 'react-router-dom';
import '../css/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  
  const user = JSON.parse(localStorage.getItem('user'));

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {!isEditing ? (
        <div className="profile-view">
          <h1>{user.username}'s Profile</h1>
          <div className="profile-details">
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
          {isAuthenticated && (
            <Link to="/cart" className="view-cart-link">View Cart</Link>
          )}
        </div>
      ) : (
        <EditProfile user={user} onCancel={handleCancelClick} />
      )}
    </div>
  );
};

export default Profile;

