// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['clothing', 'electronics', 'footwear', 'accessories', 'furniture', 'cosmetics', 'groceries', 'paper'],
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sizes: {
    type: String,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
    validate: [(val) => val.length > 0, 'At least one color is required'],
  },
  image: {
    type: String,
    required: true,
    match: /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Optional: Environmental impact
  co2: {
    type: Number,
    default: 0,
  },
  water: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
