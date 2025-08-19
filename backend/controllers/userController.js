import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  // We will now receive both 'password' and 'confirmPassword' from the frontend
  const { email, password, confirmPassword, role } = req.body;

  try {
    // Backend validation: Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    let user = await User.findOne({ email });
    if (user) { 
      return res.status(400).json({ msg: 'User already exists' }); 
    }

    user = new User({ email, password, role });
    await user.save();
    
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, role: user.role });
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error'); 
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) { 
      return res.status(400).json({ msg: 'Invalid credentials' }); 
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { 
      return res.status(400).json({ msg: 'Invalid credentials' }); 
    }
    
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token, role: user.role });
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error'); 
  }
};