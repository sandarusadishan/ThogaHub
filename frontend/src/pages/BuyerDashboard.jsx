import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import PrivateMessageModal from '../components/PrivateMessageModal.jsx';

// Temporary Mock Data for UI/UX Design
const mockProducts = [
  {
    _id: "mock1",
    title: "Lentils",
    description: "High-quality red lentils, 50-ton bulk lot, ready for immediate shipment.",
    quantity: 50,
    price: 950,
    seller: { _id: "seller1", email: "seller1@example.com" },
  },
  {
    _id: "mock2",
    title: "Chili",
    description: "Dried chili flakes, 20-ton lot. Great for spice importers.",
    quantity: 20,
    price: 1200,
    seller: { _id: "seller2", email: "seller2@example.com" },
  },
  {
    _id: "mock3",
    title: "Sugar",
    description: "Premium white sugar, 100-ton lot. Priced to sell fast.",
    quantity: 100,
    price: 800,
    seller: { _id: "seller3", email: "seller3@example.com" },
  },
  {
    _id: "mock4",
    title: "Rice",
    description: "Basmati rice, 50-ton bulk. Available for negotiation.",
    quantity: 50,
    price: 1050,
    seller: { _id: "seller4", email: "seller4@example.com" },
  },
  {
    _id: "mock5",
    title: "Flour",
    description: "All-purpose flour, 80-ton lot. Perfect for bakeries and distributors.",
    quantity: 80,
    price: 650,
    seller: { _id: "seller5", email: "seller5@example.com" },
  }
];

const BuyerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    if (user && user.role !== 'buyer') {
      logout();
      navigate('/');
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Use this line to get mock products for a good-looking UI
    setProducts(mockProducts);
    setLoading(false);
    
    // Uncomment the code below to connect to your live backend later
    /*
    const fetchProducts = async () => {
      try { 
        setLoading(true); 
        const approvedProducts = await getApprovedProducts(); 
        setProducts(approvedProducts); 
      }
      catch (err) { 
        setError('Failed to fetch products. Please check the backend.'); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchProducts();
    */
    
  }, [user, navigate, logout]);

  const handleOpenMessage = (sellerId, listingId) => {
    setSelectedSeller(sellerId);
    setSelectedListing(listingId);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Available Products</h2>
        
        {loading && <p className="text-center text-gray-600">Loading products...</p>}
        {error && <p className="text-center text-red-600 font-bold">{error}</p>}
        
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">No approved products available right now.</p>
        )}
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="text-sm text-gray-500 mb-4 space-y-1">
                <p><span className="font-semibold text-gray-700">Quantity:</span> {product.quantity} MT</p>
                <p><span className="font-semibold text-gray-700">Price:</span> ${product.price} per MT</p>
              </div>
              <button
                onClick={() => handleOpenMessage(product.seller._id, product._id)}
                className="w-full py-2 bg-black text-white rounded-md font-semibold transition-colors duration-300 hover:bg-gray-700"
              >
                Inquire (Private Message)
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {showModal && (
        <PrivateMessageModal
          onClose={() => setShowModal(false)}
          recipientId={selectedSeller}
          listingId={selectedListing}
        />
      )}
    </div>
  );
};

export default BuyerDashboard;