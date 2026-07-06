const mongoose = require('mongoose');
const Product = require('./models/Product');

async function fixRealmeImage() {
  try {
    await mongoose.connect('mongodb+srv://karthick:karthick123@cluster0.mks6vwk.mongodb.net/mydb');
    console.log('Connected to MongoDB');
    
    // Find and update Realme product
    const realmeProduct = await Product.findOne({ name: 'Realme 13 Pro Plus' });
    console.log('Current Realme product:', realmeProduct);
    
    if (realmeProduct) {
      realmeProduct.image = 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400';
      await realmeProduct.save();
      console.log('Updated Realme image to:', realmeProduct.image);
    }
    
    // Verify the update
    const updatedProduct = await Product.findOne({ name: 'Realme 13 Pro Plus' });
    console.log('Verified updated product:', updatedProduct);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixRealmeImage();