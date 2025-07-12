const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateRegister = require('../middleware/validateRegister');
const User = require('../models/User');


router.post('/register', validateRegister, async (req, res) => {
  const { fullName, email, password, phoneNumber, location, profileImage } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      location,
      profileImage,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('❌ Registration error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login',async (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' &&  await bcrypt.compare(password, hashedPassword)) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.use(authMiddleware);

// Protected route
router.get('/dashboard', (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you are an ${req.user.role}` });
});

module.exports = router;
