import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import backgroundImage from "../assets/home.jpg";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  let dashboardLink = "/";
  if (user) {
    if (user.role === "seller") {
      dashboardLink = "/seller-dashboard";
    } else if (user.role === "buyer") {
      dashboardLink = "/buyer-dashboard";
    } else if (user.role === "admin") {
      dashboardLink = "/admin-dashboard";
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Black overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-white">
        <div className="text-center animate-fade-in-up">
          {user ? (
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-zoom-in">
              Welcome to තොගHub,{" "}
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}!
            </h1>
          ) : (
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-zoom-in">
              Welcome to තොගHub!
            </h1>
          )}
          <p className="text-lg md:text-xl font-light mb-8 animate-fade-in delay-200">
            The private platform for trusted bulk trading.
          </p>

          {user ? (
            <div className="space-x-4 animate-fade-in delay-500">
              <Link
                to={dashboardLink}
                className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Go to Your Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-x-4 animate-fade-in delay-500">
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-gray-200 text-black text-lg font-bold rounded-full hover:bg-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
