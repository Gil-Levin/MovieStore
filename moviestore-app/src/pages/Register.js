import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [userType, setUserType] = useState(''); 
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        alert('Username, Email, and Password are required.');
        return;
      }
  
      const response = await axios.post('http://localhost:7178/api/Users', {
        username,
        email,
        password,
        profilePicture:"https://api.api-ninjas.com/v1/randomimage",
        userType : "customer"
      });
  
      alert('Registration successful! You can now log in.');
      history.push('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data); // Log server response data
        alert(`Registration failed. Reason: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Registration failed. Please check the details and try again.');
      }
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
        {/* <div>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div> */}
        {/* <div>
          <label>User Type:</label>
          <input
            type="text"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          />
        </div> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
