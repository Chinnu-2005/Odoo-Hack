const impactMap = {
  clothing: {
    co2: 25, // kg CO2 per item
    water: 2700, // liters per item
  },
  electronics: {
    co2: 80,
    water: 1300,
  },
  footwear: {
    co2: 14,
    water: 4400,
  },
  accessories: {
    co2: 5,
    water: 1200,
  },
  furniture: {
    co2: 200,
    water: 30000,
  },
  cosmetics: {
    co2: 2,
    water: 1500,
  },
  groceries: {
    co2: 3,
    water: 2500,
  },
  paper: {
    co2: 1,
    water: 10,
  },
};

function calculateImpact(category) {
  const data = impactMap[category.toLowerCase()];
  if (!data) {
    return {
      co2: 0,
      water: 0,
      note: "Unknown category. Defaulting to 0.",
    };
  }
  return {
    co2: data.co2,
    water: data.water,
  };
}

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

  if (!sizes || typeof sizes !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'sizes'" });
  }

  if (!Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ error: "Invalid or missing 'colors'" });
  }

  if (!image || typeof image !== "string" || !image.startsWith("http")) {
    return res.status(400).json({ error: "Invalid or missing 'image' URL" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: "'email' is required and must be valid" });
  }
  if (!category || typeof category !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'sizes'" });
  }

const impact = calculateImpact(category);
req.body.co2 = impact.co2;
req.body.water = impact.water;


  next(); // Validation passed
}

module.exports = validateProduct;
