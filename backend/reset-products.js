const mongoose = require('mongoose');
const Product = require('./models/Product');

const allProducts = [
  // Smartphones (6)
  { name: 'iPhone 15 Pro Max', category: 'Smartphone', price: 159999, stock: 15, offer: 8, description: 'Latest iPhone with titanium design', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400' },
  { name: 'Samsung Galaxy S24 Ultra', category: 'Smartphone', price: 129999, stock: 20, offer: 12, description: 'Premium Android flagship with S Pen', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
  { name: 'OnePlus 12', category: 'Smartphone', price: 64999, stock: 25, offer: 15, description: 'Flagship killer with Snapdragon 8 Gen 3', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { name: 'Google Pixel 8 Pro', category: 'Smartphone', price: 106999, stock: 18, offer: 10, description: 'AI-powered photography experience', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { name: 'Xiaomi 14 Ultra', category: 'Smartphone', price: 89999, stock: 22, offer: 18, description: 'Leica camera system premium phone', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400' },
  { name: 'Nothing Phone 2', category: 'Smartphone', price: 44999, stock: 30, offer: 20, description: 'Unique transparent design with Glyph', image: 'https://images.unsplash.com/photo-1607936854279-55e8f4bc0b9a?w=400' },
  
  // Laptops (6)
  { name: 'MacBook Pro M3', category: 'Laptop', price: 199999, stock: 10, offer: 5, description: 'Professional laptop with M3 chip', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { name: 'Dell XPS 13 Plus', category: 'Laptop', price: 149999, stock: 12, offer: 8, description: 'Ultra-portable premium Windows laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
  { name: 'HP Spectre x360', category: 'Laptop', price: 119999, stock: 15, offer: 12, description: '2-in-1 convertible laptop with OLED', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400' },
  { name: 'Lenovo ThinkPad X1', category: 'Laptop', price: 179999, stock: 8, offer: 7, description: 'Business laptop with durability', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400' },
  { name: 'ASUS ROG Zephyrus G14', category: 'Laptop', price: 159999, stock: 14, offer: 15, description: 'Gaming laptop with AMD Ryzen', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400' },
  { name: 'Surface Laptop Studio', category: 'Laptop', price: 189999, stock: 9, offer: 10, description: 'Microsoft most powerful Surface', image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400' },
  
  // Audio (6)
  { name: 'Sony WH-1000XM5', category: 'Audio', price: 29999, stock: 25, offer: 18, description: 'Industry-leading noise canceling', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { name: 'AirPods Pro 2nd Gen', category: 'Audio', price: 24900, stock: 30, offer: 15, description: 'Active noise cancellation with spatial audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' },
  { name: 'Bose QuietComfort 45', category: 'Audio', price: 32900, stock: 20, offer: 20, description: 'Premium comfort with noise cancellation', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400' },
  { name: 'Sennheiser Momentum 4', category: 'Audio', price: 34999, stock: 18, offer: 12, description: 'Audiophile-grade wireless headphones', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { name: 'JBL Charge 5', category: 'Audio', price: 12999, stock: 35, offer: 25, description: 'Portable Bluetooth speaker with power bank', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
  { name: 'Marshall Acton III', category: 'Audio', price: 24999, stock: 22, offer: 16, description: 'Iconic rock and roll home speaker', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
  
  // Wearables (6)
  { name: 'Apple Watch Series 9', category: 'Wearables', price: 41900, stock: 20, offer: 8, description: 'Advanced health monitoring with S9 chip', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { name: 'Samsung Galaxy Watch 6', category: 'Wearables', price: 32999, stock: 25, offer: 15, description: 'Comprehensive health tracking for Android', image: 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=400' },
  { name: 'Fitbit Sense 2', category: 'Wearables', price: 24999, stock: 30, offer: 20, description: 'Advanced fitness and health smartwatch', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { name: 'Garmin Venu 3', category: 'Wearables', price: 44999, stock: 18, offer: 12, description: 'GPS smartwatch with AMOLED display', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400' },
  { name: 'Amazfit GTR 4', category: 'Wearables', price: 19999, stock: 28, offer: 22, description: 'Long battery life with comprehensive tracking', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400' },
  { name: 'Huawei Watch GT 4', category: 'Wearables', price: 22999, stock: 24, offer: 18, description: 'Elegant design with 14-day battery life', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400' },
  
  // Cameras (6)
  { name: 'Canon EOS R6 Mark II', category: 'Camera', price: 219999, stock: 8, offer: 10, description: 'Professional mirrorless camera for photography', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400' },
  { name: 'Sony A7 IV', category: 'Camera', price: 249999, stock: 6, offer: 8, description: 'Full-frame mirrorless with 33MP sensor', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400' },
  { name: 'Nikon Z6 III', category: 'Camera', price: 199999, stock: 10, offer: 12, description: 'Versatile full-frame camera for creators', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400' },
  { name: 'Fujifilm X-T5', category: 'Camera', price: 169999, stock: 12, offer: 15, description: 'APS-C camera with film simulation modes', image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400' },
  { name: 'GoPro Hero 12 Black', category: 'Camera', price: 44999, stock: 20, offer: 18, description: 'Ultimate action camera with 5.3K video', image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400' },
  { name: 'DJI Pocket 2', category: 'Camera', price: 54999, stock: 15, offer: 20, description: 'Tiny handheld camera with 3-axis gimbal', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400' },
  
  // Accessories (6)
  { name: 'Logitech MX Master 3S', category: 'Accessories', price: 8999, stock: 40, offer: 15, description: 'Advanced wireless mouse for productivity', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
  { name: 'Keychron K8 Pro', category: 'Accessories', price: 12999, stock: 35, offer: 18, description: 'Wireless mechanical keyboard with hot-swap', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  { name: 'Anker PowerCore 26800', category: 'Accessories', price: 4999, stock: 50, offer: 25, description: 'High-capacity portable charger', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' },
  { name: 'SanDisk Extreme Pro SSD', category: 'Accessories', price: 15999, stock: 30, offer: 20, description: 'Portable SSD with 2000MB/s transfer speed', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400' },
  { name: 'Belkin 3-in-1 Wireless Charger', category: 'Accessories', price: 7999, stock: 25, offer: 22, description: 'Charge iPhone, AirPods, and Apple Watch together', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400' },
  { name: 'UGREEN USB-C Hub 9-in-1', category: 'Accessories', price: 3999, stock: 45, offer: 30, description: 'Multi-port hub with 4K HDMI and fast charging', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' }
];

async function resetAndAddAllProducts() {
  try {
    await mongoose.connect('mongodb+srv://karthick:karthick123@cluster0.mks6vwk.mongodb.net/mydb');
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Add all 36 products
    const result = await Product.insertMany(allProducts);
    console.log(`Added ${result.length} products successfully!`);
    
    const totalCount = await Product.countDocuments();
    console.log(`Total products in database: ${totalCount}`);
    
    // Count by category
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('Products by category:');
    categories.forEach(cat => {
      console.log(`- ${cat._id}: ${cat.count} products`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetAndAddAllProducts();