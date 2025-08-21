/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// The following imports are commented out to resolve the compilation errors.
// Since we don't have access to these files, the app won't compile with them.
// In a real-world scenario, you would need to ensure these files exist.
// import AuthContext from "../context/AuthContext.jsx";
// import Input from "../components/Input.jsx";
// import Button from "../components/Button.jsx";
// import { createProduct } from "../services/productService.jsx";

// Mocking the dependencies to make the code runnable and fix the compilation errors.
const AuthContext = React.createContext(null);
const Input = (props) => <input {...props} className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />;
const Button = ({ children, ...props }) => <button {...props} className="w-full py-3 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
    {children}
  </button>;
const createProduct = async (product) => {
  console.log("Product created:", product);
  return new Promise(resolve => setTimeout(resolve, 1000));
};

// This array contains the list of bulk items.
const bulkItems = [
  "Barley",
  "Black Pepper",
  "Canned Fish",
  "Cardamom",
  "Cashews",
  "Chickpeas",
  "Chili",
  "Cinnamon",
  "Coconut Oil",
  "Coffee",
  "Coriander",
  "Cumin",
  "Dates",
  "Flour",
  "Garlic",
  "Green Gram",
  "Lentils",
  "Maize",
  "Onions",
  "Palm Oil",
  "Potatoes",
  "Red Beans",
  "Rice",
  "Salt",
  "Soybeans",
  "Spices",
  "Sugar",
  "Tea",
  "Turmeric",
  "Wheat",
];

// This object maps each item to a unique placeholder image URL.
// The keys are now also sorted alphabetically.
const productImages = {
  "Barley": "https://5.imimg.com/data5/ANDROID/Default/2025/4/503791377/BD/XE/VK/226021155/product-jpeg-500x500.jpg",
  "Black Pepper": "https://www.cord360.com/Data/Images/112/Gallery/Pepper1.jpeg",
  "Canned Fish": "https://www.foodandwine.com/thmb/ixBbiYyRTOUiqOcAK7oFZG47HNc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Tinned-Fish-Taste-Test-FT-BLOG1122-0f670ba5770441fa83061bbf0c3f662f.jpg",
  "Cardamom": "https://www.greenspices.in/wp-content/uploads/2021/07/Cardamom.jpg",
  "Cashews": "https://beyondthenut.com/wp-content/uploads/2021/03/A-Real-Life-Review-of-Our-Bulk-Cashews.jpg",
  "Chickpeas": "https://img.freepik.com/premium-photo/raw-chickpeas-bulk-sale-legumes_131238-436.jpg",
  "Chili": "https://www.snexplores.org/wp-content/uploads/2019/11/header-860-Red_Peppers.jpg",
  "Cinnamon": "https://www.adidevgroup.com/img/products/cinnamon-stick-exporters-in-india.jpg",
  "Coconut Oil": "https://5.imimg.com/data5/SELLER/Default/2023/11/360522263/SZ/RX/CA/86555400/bulk-coconut-oil.png",
  "Coffee": "https://www.cnbco.com/wp-content/uploads/2023/08/instant-coffee-spray-dried.jpg",
  "Coriander": "https://img.joomcdn.net/bb61c9de8bb29750ed60491175f35f9de0b1fe9b_1024_682.jpeg",
  "Cumin": "https://5.imimg.com/data5/SELLER/Default/2022/4/FZ/EA/LQ/150428527/cumin-seeds-1-jpg-500x500.jpg",
  "Dates": "https://wholesalesupercenters.com/wp-content/uploads/2024/07/organic-medjool-dates-in-bulk.jpg",
  "Flour": "https://dupqk6pckaoq7.cloudfront.net/blog/articles/6/featured.webp",
  "Garlic": "https://i.ebayimg.com/images/g/6WEAAOSwrr5jxbci/s-l1200.jpg",
  "Green Gram": "https://www.agrifarming.in/wp-content/uploads/Ultimate-Guide-to-Green-Gram-Farming-1.jpg",
  "Lentils": "https://5.imimg.com/data5/ZX/NR/EE/SELLER-53925439/red-lentils-289126-1280-495x400-500x500.jpg",
  "Maize": "https://wigmoretrading.com/wp-content/uploads/2025/07/yellow-corn-kernels-with-clay-bowl-in-burlap-sack-2025-03-05-23-10-33-utc-min-1-scaled.jpg",
  "Onions": "https://thumbs.dreamstime.com/b/onions-different-colors-store-bulk-sales-46136908.jpg",
  "Palm Oil": "https://multigroupcoltd.com/wp-content/uploads/2022/04/16027428241593749133palmoil.png",
  "Potatoes": "https://stmaaprodfwsite.blob.core.windows.net/assets/sites/1/2016/02/Elevators-loading-a-bulk-potato-store.jpg",
  "Red Beans": "https://unimarket.ca/cdn/shop/products/Untitled_f63616b5-b3c1-4544-8dc4-0ee78b77d418.png?v=1669833656&width=640",
  "Rice": "https://thumbs.dreamstime.com/b/sacks-rice-displayed-market-representing-wholesale-food-industry-burlap-overflowing-grains-create-vibrant-scene-344575268.jpg",
  "Salt": "https://hwysalt.com/sites/default/files/bulkhighway_solarsalt_1.jpg",
  "Soybeans": "https://www.vehgroshop.com/img/WltPvv7Aub5JaXkqfd9Kq3qJLVE7rDcErA8rePCbS-4/resize:fit:520:600/aHR0cHM6Ly93d3cudmVoZ3Jvc2hvcC5jb20vbWVkaWEvY2F0YWxvZy9wcm9kdWN0LzQvNS80NTM0MF9ib25lbl9oYXJ2ZXN0LmpwZz93aWR0aD01MjAmaGVpZ2h0PTYwMCZzdG9yZT12ZWhncm9zaG9wX2VuJmltYWdlLXR5cGU9aW1hZ2U.jpg?type=catalog",
  "Spices": "https://shreenathglobal.in/wp-content/uploads/2024/02/top-view-various-indian-spices-seasonings-table_181624-58725-1.png",
  "Sugar": "https://b3075642.smushcdn.com/3075642/wp-content/uploads/sugarvsugars-brown-whitesugar-e1528986901183.jpg?lossy=1&strip=1&webp=1",
  "Tea": "https://img.freepik.com/premium-photo/fermentation-tea-production-tea-factory_328191-27666.jpg",
  "Turmeric": "https://5.imimg.com/data5/SELLER/Default/2024/9/453361291/WE/IE/VS/116774317/turmeric-powder-500x500.jpg",
  "Wheat": "https://www.desmud.org/uploads/9d8e3b3a7c9447ff686bc1e0e9058f87.jpg",
};

const SellerDashboard = () => {
  // Mocking the user and navigate hooks as they are not available in this environment
  const user = { role: "seller" };
  const navigate = (path) => console.log("Navigating to:", path);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    // Add a field for the product image URL
    image: "",
  });

  // State to hold the URL of the image to be displayed
  const [selectedImage, setSelectedImage] = useState("");

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
    const { name, value } = e.target;
    // Update the product state
    setProduct({ ...product, [name]: value });

    // If the changed input is the title (item selection)
    if (name === "title") {
      // Get the corresponding image URL from the productImages map
      const newImage = productImages[value];
      // Update the state for the displayed image
      setSelectedImage(newImage);
      // Also update the image field in the product state
      setProduct((prevProduct) => ({ ...prevProduct, image: newImage }));
    }
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
      setProduct({ title: "", description: "", quantity: "", price: "", image: "" });
      setSelectedImage(""); // Clear the image display as well
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMessage("Failed to submit post. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Seller Dashboard
        </h2>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
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
              className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an Item</option>
              {bulkItems.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* This section displays the image when an item is selected */}
          {selectedImage && (
            <div className="flex justify-center mt-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full max-w-sm h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="flex flex-col text-left space-y-1">
            <label className="text-gray-600 text-sm">Description:</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="e.g., 200 metric tons of Lentils, ready for shipment."
              rows="4"
              required
              className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Price per Unit (LKR):
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
