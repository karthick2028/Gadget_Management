const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection with fallback
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (err) {
    console.log('❌ MongoDB Atlas failed, trying local MongoDB...');
    try {
      await mongoose.connect('mongodb://localhost:27017/gadgetzone');
      console.log('✅ Local MongoDB connected successfully');
    } catch (localErr) {
      console.error('❌ Both MongoDB connections failed:', localErr.message);
      console.log('📝 Server will continue without database (some features may not work)');
    }
  }
};

connectDB();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const productRoutes = require('./routes/productRoutes');
const contentRoutes = require('./routes/contentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Use Routes
app.use('/api', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', productRoutes);
app.use('/api', contentRoutes);
app.use('/api', categoryRoutes);

// Test route
app.get('/api/test', (req, res) => {
  console.log('🧪 Test route accessed');
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://[YOUR_IP]:${PORT}`);
});