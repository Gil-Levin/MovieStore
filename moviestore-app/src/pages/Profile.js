import React, { useState } from 'react';
import EditProfile from './ProfileEdit';
import '../css/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

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
            <p><strong>Password:</strong> {user.password}</p>
          </div>
          <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
        </div>
      ) : (
        <EditProfile user={user} onCancel={handleCancelClick} />  
      )}
    </div>
  );
};

export default Profile;
