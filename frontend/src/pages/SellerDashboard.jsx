import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { createProduct } from "../services/productService.jsx";
const bulkItems = [
  "Lentils",
  "Chili",
  "Sugar",
  "Rice",
  "Flour",
  "Salt",
  "Onions",
  "Potatoes",
  "Garlic",
  "Tea",
  "Coffee",
  "Spices",
  "Cumin",
  "Cinnamon",
  "Cardamom",
  "Turmeric",
  "Coriander",
  "Soybeans",
  "Palm Oil",
  "Coconut Oil",
  "Canned Fish",
  "Dates",
  "Chickpeas",
  "Wheat",
  "Maize",
  "Barley",
  "Black Pepper",
  "Green Gram",
  "Red Beans",
  "Cashews",
];
const SellerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (user && user.role !== "seller") {
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await createProduct(product, localStorage.getItem("token"));
      setSuccessMessage(
        "Your product post has been submitted for admin approval!"
      );
      setProduct({ title: "", description: "", quantity: "", price: "" });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMessage("Failed to submit post. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-md shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Seller Dashboard
        </h2>
        <h3 className="text-xl font-semibold mb-4">
          Create a New Product Post
        </h3>
        {successMessage && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col text-left space-y-1">
            <label className="text-gray-600 text-sm">Product Item:</label>
            <select
              name="title"
              value={product.title}
              onChange={handleChange}
              required
              className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">Select an Item</option>
              {bulkItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col text-left space-y-1">
            <label className="text-gray-600 text-sm">Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="e.g., 200 metric tons of Lentils, ready for shipment."
              rows="4"
              required
              className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col text-left space-y-1 w-1/2">
              <label className="text-gray-600 text-sm">
                Quantity (Metric Tons):
              </label>
              <Input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="e.g., 200"
                required
              />
            </div>
            <div className="flex flex-col text-left space-y-1 w-1/2">
              <label className="text-gray-600 text-sm">
                Price per Unit (USD):
              </label>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="e.g., 850"
                required
              />
            </div>
          </div>
          <Button type="submit">Submit Post for Approval</Button>
        </form>
      </div>
    </div>
  );
};
export default SellerDashboard;



//sandarusadishan0404@gmail.com
//shan2001