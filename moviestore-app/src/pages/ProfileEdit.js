import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ProfileEdit.css';

const ProfileEdit = ({ user, onCancel }) => {
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [userType, setUserType] = useState(user.userType);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(user.profilePicture);

  useEffect(() => {
    setImagePreview(user.profilePicture);
  }, [user.profilePicture]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
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
        setProfilePicture(base64Image);
        setImagePreview(base64Image);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7178/api/users/${user.userId}`, {
        userId: user.userId,
        email,
        profilePicture,
        username,
        password,
        userType : user.userType, 
      });
      onCancel();
    } catch (err) {
      setError('Error updating profile');
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <img src={imagePreview} alt="Profile Preview" className="profile-image" style={{ width: 200, height: 300 }} />
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Picture Upload:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        <div className="button-group">
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default ProfileEdit;
