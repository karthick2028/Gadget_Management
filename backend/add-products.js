const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { name: 'iPhone 15 Pro Max', category: 'Smartphone', price: 159999, stock: 15, offer: 8, description: 'Latest iPhone with titanium design', image: '' },
  { name: 'Samsung Galaxy S24 Ultra', category: 'Smartphone', price: 129999, stock: 20, offer: 12, description: 'Premium Android flagship with S Pen', image: '' },
  { name: 'OnePlus 12', category: 'Smartphone', price: 64999, stock: 25, offer: 15, description: 'Flagship killer with Snapdragon 8 Gen 3', image: '' },
  { name: 'Google Pixel 8 Pro', category: 'Smartphone', price: 106999, stock: 18, offer: 10, description: 'AI-powered photography experience', image: '' },
  { name: 'Xiaomi 14 Ultra', category: 'Smartphone', price: 89999, stock: 22, offer: 18, description: 'Leica camera system premium phone', image: '' },
  { name: 'Nothing Phone 2', category: 'Smartphone', price: 44999, stock: 30, offer: 20, description: 'Unique transparent design with Glyph', image: '' },
  { name: 'MacBook Pro M3', category: 'Laptop', price: 199999, stock: 10, offer: 5, description: 'Professional laptop with M3 chip', image: '' },
  { name: 'Dell XPS 13 Plus', category: 'Laptop', price: 149999, stock: 12, offer: 8, description: 'Ultra-portable premium Windows laptop', image: '' },
  { name: 'HP Spectre x360', category: 'Laptop', price: 119999, stock: 15, offer: 12, description: '2-in-1 convertible laptop with OLED', image: '' },
  { name: 'Lenovo ThinkPad X1', category: 'Laptop', price: 179999, stock: 8, offer: 7, description: 'Business laptop with durability', image: '' },
  { name: 'ASUS ROG Zephyrus G14', category: 'Laptop', price: 159999, stock: 14, offer: 15, description: 'Gaming laptop with AMD Ryzen', image: '' },
  { name: 'Surface Laptop Studio', category: 'Laptop', price: 189999, stock: 9, offer: 10, description: 'Microsoft most powerful Surface', image: '' },
  { name: 'Sony WH-1000XM5', category: 'Audio', price: 29999, stock: 25, offer: 18, description: 'Industry-leading noise canceling', image: '' },
  { name: 'AirPods Pro 2nd Gen', category: 'Audio', price: 24900, stock: 30, offer: 15, description: 'Active noise cancellation with spatial audio', image: '' },
  { name: 'Bose QuietComfort 45', category: 'Audio', price: 32900, stock: 20, offer: 20, description: 'Premium comfort with noise cancellation', image: '' },
  { name: 'Sennheiser Momentum 4', category: 'Audio', price: 34999, stock: 18, offer: 12, description: 'Audiophile-grade wireless headphones', image: '' },
  { name: 'JBL Charge 5', category: 'Audio', price: 12999, stock: 35, offer: 25, description: 'Portable Bluetooth speaker with power bank', image: '' },
  { name: 'Marshall Acton III', category: 'Audio', price: 24999, stock: 22, offer: 16, description: 'Iconic rock and roll home speaker', image: '' },
  { name: 'Apple Watch Series 9', category: 'Wearables', price: 41900, stock: 20, offer: 8, description: 'Advanced health monitoring with S9 chip', image: '' },
  { name: 'Samsung Galaxy Watch 6', category: 'Wearables', price: 32999, stock: 25, offer: 15, description: 'Comprehensive health tracking for Android', image: '' },
  { name: 'Fitbit Sense 2', category: 'Wearables', price: 24999, stock: 30, offer: 20, description: 'Advanced fitness and health smartwatch', image: '' },
  { name: 'Garmin Venu 3', category: 'Wearables', price: 44999, stock: 18, offer: 12, description: 'GPS smartwatch with AMOLED display', image: '' },
  { name: 'Amazfit GTR 4', category: 'Wearables', price: 19999, stock: 28, offer: 22, description: 'Long battery life with comprehensive tracking', image: '' },
  { name: 'Huawei Watch GT 4', category: 'Wearables', price: 22999, stock: 24, offer: 18, description: 'Elegant design with 14-day battery life', image: '' },
  { name: 'Canon EOS R6 Mark II', category: 'Camera', price: 219999, stock: 8, offer: 10, description: 'Professional mirrorless camera for photography', image: '' },
  { name: 'Sony A7 IV', category: 'Camera', price: 249999, stock: 6, offer: 8, description: 'Full-frame mirrorless with 33MP sensor', image: '' },
  { name: 'Nikon Z6 III', category: 'Camera', price: 199999, stock: 10, offer: 12, description: 'Versatile full-frame camera for creators', image: '' },
  { name: 'Fujifilm X-T5', category: 'Camera', price: 169999, stock: 12, offer: 15, description: 'APS-C camera with film simulation modes', image: '' },
  { name: 'GoPro Hero 12 Black', category: 'Camera', price: 44999, stock: 20, offer: 18, description: 'Ultimate action camera with 5.3K video', image: '' },
  { name: 'DJI Pocket 2', category: 'Camera', price: 54999, stock: 15, offer: 20, description: 'Tiny handheld camera with 3-axis gimbal', image: '' },
  { name: 'Logitech MX Master 3S', category: 'Accessories', price: 8999, stock: 40, offer: 15, description: 'Advanced wireless mouse for productivity', image: '' },
  { name: 'Keychron K8 Pro', category: 'Accessories', price: 12999, stock: 35, offer: 18, description: 'Wireless mechanical keyboard with hot-swap', image: '' },
  { name: 'Anker PowerCore 26800', category: 'Accessories', price: 4999, stock: 50, offer: 25, description: 'High-capacity portable charger', image: '' },
  { name: 'SanDisk Extreme Pro SSD', category: 'Accessories', price: 15999, stock: 30, offer: 20, description: 'Portable SSD with 2000MB/s transfer speed', image: '' },
  { name: 'Belkin 3-in-1 Wireless Charger', category: 'Accessories', price: 7999, stock: 25, offer: 22, description: 'Charge iPhone, AirPods, and Apple Watch together', image: '' },
  { name: 'UGREEN USB-C Hub 9-in-1', category: 'Accessories', price: 3999, stock: 45, offer: 30, description: 'Multi-port hub with 4K HDMI and fast charging', image: '' }
];

async function addProducts() {
  try {
    await mongoose.connect('mongodb+srv://karthick:karthick123@cluster0.mks6vwk.mongodb.net/mydb');
    console.log('Connected to MongoDB');
    
    const result = await Product.insertMany(products);
    console.log(`${result.length} products added successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
}

addProducts();