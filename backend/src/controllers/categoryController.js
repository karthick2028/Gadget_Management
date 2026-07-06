const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    
    // Update product count for each category
    for (let category of categories) {
      const productCount = await Product.countDocuments({ category: category.name });
      category.products = productCount;
      await category.save();
    }
    
    res.json(categories);
  } catch (error) {
    console.error('❌ Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    console.log('📂 Category creation attempt:', { name });
    
    const category = new Category({
      name,
      icon,
      description,
      status: 'Active',
      products: 0
    });
    
    await category.save();
    console.log('✅ Category created successfully:', { name, id: category._id });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('❌ Category creation error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, description, status } = req.body;
    console.log('✏️ Category update attempt:', { id, name });
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }
    
    const updateData = { name, icon, description, status };
    
    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    console.log('✅ Category updated successfully:', { name, id });
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('❌ Category update error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Category delete attempt:', { id });
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }
    
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    console.log('✅ Category deleted successfully:', { name: category.name, id });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('❌ Category delete error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};