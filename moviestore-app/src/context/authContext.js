import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  const [userType, setUserType] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser).userType : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
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
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get('http://localhost:7178/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        window.location.href = '/login';
      } else {
        console.error('Error fetching users:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.put(`http://localhost:7178/api/Users/${updatedUser.userId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUsers();

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout, users, loading, setUsers, fetchUsers, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
