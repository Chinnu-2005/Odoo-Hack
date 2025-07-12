// validateProduct.js

async function validateProduct(req, res, next) {
  const {
    name,
    brand,
    category,
    price,
    sizes,
    colors,
    image,
    email,
  } = req.body;

  // Basic field checks
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'name'" });
  }

  if (!brand || typeof brand !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'brand'" });
  }

  if (!category || typeof category !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'category'" });
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ error: "Invalid or missing 'price'" });
  }

  if (!size || typeof size !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'sizes'" });
  }

  if (!Array.isArray(color) || color.length === 0) {
    return res.status(400).json({ error: "Invalid or missing 'colors'" });
  }

  if (!image || typeof image !== "string" || !image.startsWith("http")) {
    return res.status(400).json({ error: "Invalid or missing 'image' URL" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: "'email' is required and must be valid" });
  }

  next(); // Validation passed
}

module.exports = validateProduct;
