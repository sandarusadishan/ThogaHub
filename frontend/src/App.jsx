import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import BuyerDashboard from './pages/BuyerDashboard.jsx';
import ThogaHub from './pages/thogahub-seller-dashboard.jsx'
 
const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) { return <Navigate to="/login" replace />; }
  if (role && user.role !== role) { return <Navigate to="/" replace />; }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/thogahub" element={<ThogaHub />} />
          <Route path="/seller-dashboard" element={<PrivateRoute role="seller"><SellerDashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/buyer-dashboard" element={<PrivateRoute role="buyer"><BuyerDashboard /></PrivateRoute>} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;