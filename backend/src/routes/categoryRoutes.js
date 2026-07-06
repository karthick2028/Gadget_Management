const express = require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;