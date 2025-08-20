/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import AuthContext from "../context/AuthContext.jsx";
import backgroundImage from "../assets/register background.jpg";
import { registerUser } from "../services/authService.jsx";

// Import the eye icon from a common icon library or use an SVG
// This is the same reusable icon component used on the Login Page.
const EyeIcon = ({ onClick, isPasswordVisible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    onClick={onClick}
  >
    {isPasswordVisible ? (
      <>
        {/* Eye open icon */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ) : (
      <>
        {/* Eye closed icon with slash */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.25 0 2.484.14 3.676.402"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3l18 18"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21.542 12C20.268 7.943 16.477 5 12 5c-1.25 0-2.484.14-3.676.402M15.5 12a3.5 3.5 0 01-7 0"
        />
      </>
    )}
  </svg>
);

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
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

          <div className="relative">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <EyeIcon
                onClick={togglePasswordVisibility}
                isPasswordVisible={isPasswordVisible}
              />
            </span>
          </div>
          <div className="relative">
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <EyeIcon
                onClick={toggleConfirmPasswordVisibility}
                isPasswordVisible={isConfirmPasswordVisible}
              />
            </span>
          </div>
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
