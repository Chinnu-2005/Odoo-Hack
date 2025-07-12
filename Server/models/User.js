// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  points:{type:Number,default:0}
});

module.exports = mongoose.model('User', userSchema); // Bound to default connection
