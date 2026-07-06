const Product = require('../models/Product');

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, offer, description } = req.body;
    console.log('📱 Product creation attempt:', { name, category, price });
    
    const product = new Product({
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      offer: Number(offer) || 0,
      description,
      image: req.file ? req.file.filename : null
    });
    
    await product.save();
    console.log('✅ Product created successfully:', { name, id: product._id });
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('❌ Product creation error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log('📊 Products requested. Total:', products.length);
    res.json(products);
  } catch (error) {
    console.error('❌ Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, stock, offer, description } = req.body;
    console.log('✏️ Product update attempt:', { id, name });
    
    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    
    const updateData = {
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      offer: Number(offer) || 0,
      description
    };
    
    if (req.file) {
      updateData.image = req.file.filename;
    }
    
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('✅ Product updated successfully:', { name, id });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('❌ Product update error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Product delete attempt:', { id });
    
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('✅ Product deleted successfully:', { name: product.name, id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Product delete error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};