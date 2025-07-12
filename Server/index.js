const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

