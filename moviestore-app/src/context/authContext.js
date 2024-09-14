import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  const [userType, setUserType] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).userType : null;
  });

  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  const login = (token, user) => {
    setIsAuthenticated(true);
    setUserType(user.userType);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserType(null);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log("Token in fetchUsers:", token);
  
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get('http://localhost:7178/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Fetched users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUserType(null);
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserType(JSON.parse(storedUser).userType);
    }

    fetchUsers();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout, users, loading, setUsers, fetchUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
