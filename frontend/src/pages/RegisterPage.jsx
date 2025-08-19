/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import AuthContext from "../context/AuthContext.jsx";
import backgroundImage from "../assets/register background.jpg";
import { registerUser } from "../services/authService.jsx";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setAlertMessage("");

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      return;
    }

    try {
      await registerUser(email, password, confirmPassword, role);
      navigate("/login");
    } catch (error) {
      setAlertMessage("Registration failed. The user may already exist.");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Black overlay for better form readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Register Form Container */}
      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-md shadow-lg transition-all duration-500 transform scale-95 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register with තොගHub
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          {alertMessage && (
            <div className="text-red-600 text-sm text-center mb-4 animate-fade-in">
              {alertMessage}
            </div>
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex flex-col text-left space-y-1">
            <label className="text-gray-600 text-sm">I am a:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <Button type="submit">Register</Button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
