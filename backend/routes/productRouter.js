// routes/productRouter.js
import express from 'express';

// Import the Product model. Ensure the path is correct.
import Product from '../models/Product.js'; 
import {
    createProduct,
    getPendingProducts,
    approveProduct,
    getApprovedProducts
} from '../controllers/productController.js'; // Assuming you've moved your functions to this file

const router = express.Router();

// A simple middleware for demonstration.
// In a real application, you'd have more robust authentication.
const authenticate = (req, res, next) => {
    // This is a placeholder. Your app.js already handles JWT verification
    // and attaches the user payload to req.user. We'll simulate that here.
    // In a production app, you would remove this mock.
    req.user = {
        // Mock user object for demonstration purposes
        user: {
            id: '60c72b2f9b1d8e001c8a4a51', // A mock MongoDB ObjectId
            role: 'seller' // or 'admin' depending on the use case
        }
    };
    next();
};

// --- API Endpoints for Products ---

// @route   POST /api/products
// @desc    Create a new product post
// @access  Private (Sellers only)
router.post('/', authenticate, async (req, res) => {
    if (req.user.user.role !== 'seller') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    const { title, description, quantity, price, image } = req.body; // Image is added to the request body
    try {
        const newProduct = new Product({
            title,
            description,
            quantity,
            price,
            image, 
            seller: req.user.user.id,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/pending
// @desc    Get all pending products for admin approval
// @access  Private (Admins only)
router.get('/pending', authenticate, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        const products = await Product.find({ status: 'pending' });
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/products/:id/approve
// @desc    Approve a pending product
// @access  Private (Admins only)
router.put('/:id/approve', authenticate, async (req, res) => {
    if (req.user.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/products/approved
// @desc    Get all approved products
// @access  Public
router.get('/approved', async (req, res) => {
    try {
        const products = await Product.find({ status: 'approved' }).populate('seller', 'email');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
