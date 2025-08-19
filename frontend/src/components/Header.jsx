/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { getPendingProducts } from "../services/productService.jsx";
import logo from "../assets/logo.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [pendingCount, setPendingCount] = useState(0);
  
  // Use a simple polling method to check for pending posts every 30 seconds
  useEffect(() => {
    const fetchPendingCount = async () => {
      if (user && user.role === "admin") {
        try {
          const posts = await getPendingProducts(localStorage.getItem("token"));
          setPendingCount(posts.length);
        } catch (err) {
          console.error("Could not fetch pending post count.");
          setPendingCount(0);
        }
      } else {
        setPendingCount(0);
      }
    };
    
    // Fetch immediately on component mount
    fetchPendingCount();

    // Set up interval for subsequent fetches
    const interval = setInterval(fetchPendingCount, 30000); // Check every 30 seconds
    
    // Clean up the interval on unmount
    return () => clearInterval(interval);
    
  }, [user]); // Only re-run if the user changes

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <img src={logo} alt="Thogahub Logo" className="h-8 mr-2" />
          <span className="hidden sm:inline">තොගHub</span>
        </Link>
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              {user.role === "seller" && (
                <Link to="/seller-dashboard" className="hover:underline">
                  Seller Dashboard
                </Link>
              )}
              {user.role === "buyer" && (
                <Link to="/buyer-dashboard" className="hover:underline">
                  Buyer Dashboard
                </Link>
              )}
              {user.role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  className="relative hover:underline"
                >
                  Admin Dashboard{" "}
                  {pendingCount > 0 && (
                    <span className="absolute -top-2 -right-3 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-xs font-bold text-white">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-white text-black px-4 py-1 rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-4 py-1 rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;