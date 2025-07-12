const express = require('express');
const app = express();
const validateProduct = require('./validateProduct');

app.use(express.json());

app.post('/products', validateProduct, (req, res) => {
  res.status(201).json({ message: "Product added successfully", data: req.body });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
