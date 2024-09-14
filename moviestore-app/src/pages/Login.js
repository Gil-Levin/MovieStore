import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/authContext';
import '../css/Login.css';
import '../css/Notification.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7178/api/Login/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      login(token, user);

      setNotification({ message: 'Login successful!', type: 'success' });
      
      setTimeout(() => {
        history.push('/');
      }, 2000);
    } catch (error) {
      setNotification({ message: 'Login failed. Please check your credentials.', type: 'error' });
        setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account yet? <Link to="/register">Register here</Link>
      </p>
      
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default Login;
