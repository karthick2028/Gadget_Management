const express = require('express');
const multer = require('multer');
const path = require('path');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/products', upload.single('image'), createProduct);
router.get('/products', getAllProducts);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;