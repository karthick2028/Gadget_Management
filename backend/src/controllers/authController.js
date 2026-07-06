const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('📝 Registration attempt:', { username, email });
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    console.log('✅ User registered successfully:', { username, email, id: user._id });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email);
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('✅ Login successful:', { username: user.username, email: user.email });
    res.json({ 
      message: 'Login successful',
      user: { username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log('📊 Users requested. Total users:', users.length);
    res.json(users);
  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};