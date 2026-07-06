const mongoose = require('mongoose');
const Product = require('./models/Product');

const productImages = [
  { name: 'iPhone 15 Pro Max', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400' },
  { name: 'Samsung Galaxy S24 Ultra', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
  { name: 'OnePlus 12', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { name: 'Google Pixel 8 Pro', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { name: 'Xiaomi 14 Ultra', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400' },
  { name: 'Nothing Phone 2', image: 'https://images.search.yahoo.com/images/view;_ylt=AwrO6t5lekJpengF.qeJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2Q0ODEwOTNkNWRkZTFkM2E4ZjNkNTA2NGM2ZTc5N2I1BGdwb3MDMQRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3DNothing%2BPhone%2B2%26type%3DE211US714G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D1&w=1268&h=1500&imgurl=m.media-amazon.com%2Fimages%2FI%2F71x5ntU43-L._AC_SL1500_.jpg&rurl=https%3A%2F%2Ftiendamia.com%2Far%2Fproducto%3Famz%3DB0C61WF1RM&size=206KB&p=Nothing+Phone+2&oid=d481093d5dde1d3a8f3d5064c6e797b5&fr2=piv-web&fr=mcafee&tt=Nothing+Phone+%282%29+5G+-+6.7%E2%80%9D+LTPO+AMOLED+Display%2C+256GB+%2B+12GB+RAM%2C+Glyph+Interface%2C+OS+2.0+...&b=0&ni=21&no=1&ts=&tab=organic&sigr=AJKAU.Y0QpaQ&sigb=8VRBOn5Ira3B&sigi=7pwRex1G_oUu&sigt=10e8aeMHGDOD&.crumb=YYZR2WgTGuA&fr=mcafee&fr2=piv-web&type=E211US714G0' },
  { name: 'MacBook Pro M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { name: 'Dell XPS 13 Plus', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
  { name: 'HP Spectre x360', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400' },
  { name: 'Lenovo ThinkPad X1', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400' },
  { name: 'ASUS ROG Zephyrus G14', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400' },
  { name: 'Surface Laptop Studio', image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400' },
  { name: 'Sony WH-1000XM5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { name: 'AirPods Pro 2nd Gen', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' },
  { name: 'Bose QuietComfort 45', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400' },
  { name: 'Sennheiser Momentum 4', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { name: 'JBL Charge 5', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
  { name: 'Marshall Acton III', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
  { name: 'Apple Watch Series 9', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { name: 'Samsung Galaxy Watch 6', image: 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=400' },
  { name: 'Fitbit Sense 2', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { name: 'Garmin Venu 3', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400' },
  { name: 'Amazfit GTR 4', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400' },
  { name: 'Huawei Watch GT 4', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400' },
  { name: 'Canon EOS R6 Mark II', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400' },
  { name: 'Sony A7 IV', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400' },
  { name: 'Nikon Z6 III', image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400' },
  { name: 'Fujifilm X-T5', image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400' },
  { name: 'GoPro Hero 12 Black', image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400' },
  { name: 'DJI Pocket 2', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400' },
  { name: 'Logitech MX Master 3S', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
  { name: 'Keychron K8 Pro', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
  { name: 'Anker PowerCore 26800', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' },
  { name: 'SanDisk Extreme Pro SSD', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400' },
  { name: 'Belkin 3-in-1 Wireless Charger', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400' },
  { name: 'UGREEN USB-C Hub 9-in-1', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' }
];

async function updateImages() {
  try {
    await mongoose.connect('mongodb+srv://karthick:karthick123@cluster0.mks6vwk.mongodb.net/mydb');
    console.log('Connected to MongoDB');
    
    for (const item of productImages) {
      await Product.updateOne(
        { name: item.name },
        { $set: { image: item.image } }
      );
      console.log(`Updated image for ${item.name}`);
    }
    
    console.log('All product images updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
}

updateImages();