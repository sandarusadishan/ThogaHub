/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { createProduct } from '../services/productService.jsx';
import backgroundImage from '../assets/Background.png';

const bulkItems = [
  "Lentils", "Chili", "Sugar", "Rice", "Flour", "Salt", "Onions", "Potatoes", "Garlic",
  "Tea", "Coffee", "Spices", "Cumin", "Cinnamon", "Cardamom", "Turmeric", "Coriander",
  "Soybeans", "Palm Oil", "Coconut Oil", "Canned Fish", "Dates", "Chickpeas", "Wheat",
  "Maize", "Barley", "Black Pepper", "Green Gram", "Red Beans", "Cashews"
];

// Temporary Mock Data for UI/UX Design (to be replaced with live data later)
const mockSellerPosts = [
  { _id: "post1", title: "Lentils", description: "50-ton bulk lot, ready for shipment.", quantity: 50, price: 950, status: "pending", createdAt: new Date() },
  { _id: "post2", title: "Sugar", description: "100-ton lot, priced to sell fast.", quantity: 100, price: 800, status: "approved", createdAt: new Date(Date.now() - 86400000) },
  { _id: "post3", title: "Coffee", description: "Premium coffee beans, 20-ton lot.", quantity: 20, price: 2500, status: "sold", createdAt: new Date(Date.now() - 172800000) },
  { _id: "post4", title: "Rice", description: "Basmati rice, 50-ton bulk.", quantity: 50, price: 1050, status: "pending", createdAt: new Date() },
];


const SellerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: '', description: '', quantity: '', price: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sellerPosts, setSellerPosts] = useState(mockSellerPosts); // Using mock data for now

  useEffect(() => {
    if (user && user.role !== 'seller') {
      logout();
      navigate('/');
    }
    if (!user) {
      navigate('/login');
    }

    // Uncomment this code block later to fetch live data from the backend
    /*
    const fetchSellerPosts = async () => {
      try {
        // You'll need to create a new API endpoint in your backend to get posts by seller ID
        // For example: GET /api/products/seller/:id
        // For now, we'll just display mock data to focus on the UI
        // const posts = await getSellerPosts(user.id, localStorage.getItem('token'));
        // setSellerPosts(posts);
      } catch (err) {
        console.error('Failed to fetch seller posts:', err);
      }
    };
    fetchSellerPosts();
    */
  }, [user, navigate, logout]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await createProduct(product, localStorage.getItem('token'));
      setSuccessMessage('Your product post has been submitted for admin approval!');
      setProduct({ title: '', description: '', quantity: '', price: '' });
      // In a real app, you would fetch the new list of posts here
      // For now, we'll just add the mock data to the list
      setSellerPosts([{ ...product, _id: `temp-${Date.now()}`, status: 'pending', createdAt: new Date() }, ...sellerPosts]);
    } catch (err) {
      setErrorMessage('Failed to submit post. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400 text-yellow-900';
      case 'approved': return 'bg-green-400 text-green-900';
      case 'sold': return 'bg-red-400 text-red-900';
      default: return 'bg-gray-400 text-gray-900';
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center p-8 text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-md shadow-lg p-8 space-y-8 animate-fade-in-up">
        
        {/* Post Creation Form */}
        <div className="bg-white p-8 rounded-md shadow-md text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">Seller Dashboard</h2>
          <h3 className="text-xl font-semibold mb-4">Create a New Product Post</h3>
          {successMessage && <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-md animate-fade-in">{successMessage}</div>}
          {errorMessage && <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-md animate-fade-in">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col text-left space-y-1">
              <label className="text-gray-600 text-sm">Product Item:</label>
              <select name="title" value={product.title} onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300">
                <option value="">Select an Item</option>
                {bulkItems.map((item, index) => (<option key={index} value={item}>{item}</option>))}
              </select>
            </div>
            <div className="flex flex-col text-left space-y-1">
              <label className="text-gray-600 text-sm">Description:</label>
              <textarea name="description" value={product.description} onChange={handleChange} placeholder="e.g., 200 metric tons of Lentils, ready for shipment." rows="4" required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300"></textarea>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col text-left space-y-1 w-1/2">
                <label className="text-gray-600 text-sm">Quantity (Metric Tons):</label>
                <Input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="e.g., 200" required />
              </div>
              <div className="flex flex-col text-left space-y-1 w-1/2">
                <label className="text-gray-600 text-sm">Price per Unit (USD):</label>
                <Input type="number" name="price" value={product.price} onChange={handleChange} placeholder="e.g., 850" required />
              </div>
            </div>
            <Button type="submit">Submit Post for Approval</Button>
          </form>
        </div>

        {/* My Posts Section */}
        <div className="bg-white p-8 rounded-md shadow-md text-gray-800">
          <h3 className="text-xl font-semibold mb-4">My Posts</h3>
          {sellerPosts.length === 0 ? (
            <p className="text-center text-gray-500">You have not created any posts yet.</p>
          ) : (
            <div className="space-y-4">
              {sellerPosts.map(post => (
                <div key={post._id} className="p-4 border border-gray-200 rounded-md shadow-sm flex justify-between items-center animate-fade-in">
                  <div>
                    <h4 className="text-lg font-semibold">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(post.status)}`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
