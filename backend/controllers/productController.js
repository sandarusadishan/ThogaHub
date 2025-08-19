import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  if (req.user.user.role !== 'seller') { return res.status(403).json({ msg: 'Access denied' }); }
  const { title, description, quantity, price } = req.body;
  try {
    const newProduct = new Product({ title, description, quantity, price, seller: req.user.user.id });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
};

export const getPendingProducts = async (req, res) => {
  if (req.user.user.role !== 'admin') { return res.status(403).json({ msg: 'Access denied' }); }
  try {
    const products = await Product.find({ status: 'pending' });
    res.json(products);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
};

export const approveProduct = async (req, res) => {
  if (req.user.user.role !== 'admin') { return res.status(403).json({ msg: 'Access denied' }); }
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!product) { return res.status(404).json({ msg: 'Product not found' }); }
    res.json(product);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
};

export const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'approved' }).populate('seller', 'email');
    res.json(products);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
};