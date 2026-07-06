const mongoose = require('mongoose');
const Category = require('./models/Category');

const initialCategories = [
  { name: 'Smartphone', icon: '📱', description: 'Mobile phones and accessories', status: 'Active' },
  { name: 'Laptop', icon: '💻', description: 'Laptops and notebooks', status: 'Active' },
  { name: 'Audio', icon: '🎧', description: 'Headphones, speakers, and audio devices', status: 'Active' },
  { name: 'Wearables', icon: '⌚', description: 'Smart watches and fitness trackers', status: 'Active' },
  { name: 'Camera', icon: '📷', description: 'Digital cameras and photography equipment', status: 'Active' },
  { name: 'Accessories', icon: '🖥️', description: 'Computer and mobile accessories', status: 'Active' }
];

async function initCategories() {
  try {
    await mongoose.connect('mongodb+srv://karthick:karthick123@cluster0.mks6vwk.mongodb.net/mydb');
    console.log('Connected to MongoDB');
    
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');
    
    // Add initial categories
    const result = await Category.insertMany(initialCategories);
    console.log(`Added ${result.length} categories successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initCategories();