
import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    
    if (req.user.user.role !== 'seller') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    const { title, description, quantity, price, image } = req.body;
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
};

// @desc    Get all pending products for admin approval
// @route   GET /api/products/pending
// @access  Private (Admins only)
export const getPendingProducts = async (req, res) => {
    // Check if the user is an admin
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
};

// @desc    Approve a pending product
// @route   PUT /api/products/:id/approve
// @access  Private (Admins only)
export const approveProduct = async (req, res) => {
    // Check if the user is an admin
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
};

// @desc    Get all approved products
// @route   GET /api/products/approved
// @access  Public
export const getApprovedProducts = async (req, res) => {
    try {
        // Find approved products and populate seller details
        const products = await Product.find({ status: 'approved' }).populate('seller', 'email');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
