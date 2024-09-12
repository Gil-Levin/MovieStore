import React, { useContext, useEffect, useState } from 'react';

const Profile = () => {
const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User Type:</strong> {user.userType}</p>
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      )}
    </div>
  );
};

export default Profile;
