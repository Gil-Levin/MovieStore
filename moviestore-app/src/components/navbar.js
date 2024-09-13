import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/authContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const history = useHistory();
  const userType = JSON.parse(localStorage.getItem('user'))?.userType || '';

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/search" className="navbar-link">Search</Link>
          </li>
          {isAuthenticated && userType.toLowerCase() === 'admin' && (
            <li className="navbar-item">
              <Link to="/edit" className="navbar-link">Edit</Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">Profile</Link>
              </li>
              <li className="navbar-item">
                <button className="navbar-button" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
