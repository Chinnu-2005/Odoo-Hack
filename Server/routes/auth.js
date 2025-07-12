const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateRegister = require('../middleware/validateRegister');

router.post('/register', validateRegister, async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    location,
  } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      fullName,
      email,
      phoneNumber,
      location,
      password: hashedPassword,
    };

    // In real apps, insert into DB here
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        fullName,
        email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
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
