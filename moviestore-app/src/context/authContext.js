import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user !== null;
  });

  const [isAuthorized, setIsAuthorized] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      const user = storedUser ? JSON.parse(storedUser) : {};
      return user.userType === 'Admin';
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return false;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:7178/api/Login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setIsAuthorized(user.userType === 'Admin');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAuthorized(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthorized, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
