import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true); 
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
