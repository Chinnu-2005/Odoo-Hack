const express = require('express');
const router = express.Router();
const validateProduct = require('../middleware/validateProduct');
const Product = require('../models/Product');

// POST /api/products
router.post('/add/',validateProduct, async(req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product saved', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/product-list', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
