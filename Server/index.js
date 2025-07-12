const express = require('express');


require('dotenv').config();
const mongoose=require('mongoose')

const connectDB = require('./db');

connectDB();

const app = express();
const productRoutes=require('./routes/productRoutes')
const authRoutes=require('./routes/auth')
const dbCheck=require('./middleware/dbCheck');


app.use(dbCheck);


app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

