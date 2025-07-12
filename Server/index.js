const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

