/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import {
  getPendingProducts,
  approveProduct,
} from "../services/productService.jsx";
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getPendingProducts(token);
        setPendingPosts(posts);
      } catch (error) {
        setError("Failed to fetch pending posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [user, token, navigate]);
  const handleApprove = async (productId) => {
    try {
      await approveProduct(productId, token);
      setPendingPosts(pendingPosts.filter((post) => post._id !== productId));
    } catch (error) {
      setError("Failed to approve post.");
    }
  };
  return (
    <div className="min-h-screen container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
      {loading && <p className="text-center">Loading pending posts...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && pendingPosts.length === 0 && (
        <p className="text-center text-gray-500">
          No new posts waiting for approval.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pendingPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white border border-gray-300 rounded-md shadow-md p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.description}</p>
            <p className="text-gray-500 text-sm">
              Quantity: {post.quantity} MT
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Price: ${post.price} per MT
            </p>
            <button
              onClick={() => handleApprove(post._id)}
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
            >
              Approve Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminDashboard;
