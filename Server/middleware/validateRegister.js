function validateRegister(req, res, next) {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    location,
    agreeToTerms,
    phoneNumber,
  } = req.body;

  // Full Name
  if (!fullName || typeof fullName !== 'string') {
    return res.status(400).json({ error: "'fullName' is required and must be a string" });
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: "'email' is required and must be valid" });
  }

  // Phone Number (10 digits, numeric only)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: "'phoneNumber' is required and must be a valid 10-digit number" });
  }

  // Password
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: "'password' must be at least 6 characters long" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "'confirmPassword' does not match 'password'" });
  }

  // Terms Agreement
  if (agreeToTerms !== true && agreeToTerms !== 'true') {
    return res.status(400).json({ error: "You must agree to the terms" });
  }

  // Optional: location
  if (location && typeof location !== 'string') {
    return res.status(400).json({ error: "'location' must be a string" });
  }

  
  next();
}

module.exports = validateRegister;
