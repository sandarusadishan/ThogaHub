/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import AuthContext from '../context/AuthContext.jsx';
import backgroundImage from '../assets/login background.jpg'; // Make sure this path is correct


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    try {
      await login(email, password);
    } catch (err) {
      setAlertMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Black overlay for better form readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-md shadow-lg transition-all duration-500 transform scale-95 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to තොගHub</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          {alertMessage && <div className="text-red-600 text-sm text-center mb-4 animate-fade-in">{alertMessage}</div>}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit">Login</Button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Don't have an account? <Link to="/register" className="text-black font-semibold hover:underline transition-colors duration-300">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
