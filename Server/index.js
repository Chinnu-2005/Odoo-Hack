const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const app = express();
const productRoutes=require('./routes/productRoutes')
const authRoutes=require('./routes/auth')

app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

