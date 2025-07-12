const express = require('express');
const router = express.Router();
const validateProduct = require('../middleware/validateProduct');

// POST /api/products
router.post('/add/',validateProduct, (req, res) => {
  const product = req.body;
  // You can store this in a DB instead
  res.status(201).json({
    message: 'Product created successfully',
    product,
  });
});



module.exports = router;
