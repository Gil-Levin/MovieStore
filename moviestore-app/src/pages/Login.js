import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/authContext';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext); // Use login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7178/api/Login/login', { email, password });
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Store user object in localStorage
      }
      
      login(token); // Call login function to update AuthContext
      console.log("Successful login!");
      history.push('/'); // Redirect to the home page
    } catch (error) {
      alert('Login failed. Please check your credentials.');
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
    </div>
  );
}

export default Login;
