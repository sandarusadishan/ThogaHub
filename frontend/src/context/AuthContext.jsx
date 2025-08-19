/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import { registerUser, loginUser } from '../services/authService.jsx';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decodedToken.user);
        }
      } catch (error) {
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setToken(data.token);
    setUser(jwtDecode(data.token).user);
    localStorage.setItem('token', data.token);
  };

  const register = async (email, password, role) => {
    const data = await registerUser(email, password, role);
    setToken(data.token);
    setUser(jwtDecode(data.token).user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;