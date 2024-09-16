import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/Register.css';
import '../css/Notification.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [userType, setUserType] = useState(''); 
  const [notification, setNotification] = useState({ message: '', type: '' });
  const history = useHistory();

  const checkIfExists = async () => {
    try {
      const response = await axios.get('http://localhost:7178/api/Users/check', {
        params: { username, email }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking existence:', error);
      setNotification({ message: 'Error checking if the username or email exists.', type: 'error' });
      return { usernameExists: false, emailExists: false };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        setNotification({ message: 'Username, Email, and Password are required.', type: 'error' });
        return;
      }

      const { usernameExists, emailExists } = await checkIfExists();
      
      if (usernameExists) {
        setNotification({ message: 'Username is already taken.', type: 'error' });
        return;
      }
      
      if (emailExists) {
        setNotification({ message: 'Email is already in use.', type: 'error' });
        return;
      }

      const response = await axios.post('http://localhost:7178/api/Users', {
        username,
        email,
        password,
        profilePicture: "https://placeimg.com/185/104/arch?param=" + Math.random(),
        userType: "customer"
      });
  
      setNotification({ message: 'Registration successful! You can now log in.', type: 'success' });
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        setNotification({ message: `Registration failed. Reason: ${JSON.stringify(error.response.data)}`, type: 'error' });
      } else {
        setNotification({ message: 'Registration failed. Please check the details and try again.', type: 'error' });
      }
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default Register;
