const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Dummy login (replace with real DB check)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulate user check
  if (username === 'admin' && password === 'admin123') {
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
