// Product validation utilities

export const validateProductData = (productData) => {
  const errors = [];

  // Required field validations
  if (!productData.name || productData.name.trim().length === 0) {
    errors.push("Product name is required");
  }

  if (!productData.brand || productData.brand.trim().length === 0) {
    errors.push("Brand is required");
  }

  if (!productData.category || productData.category.trim().length === 0) {
    errors.push("Category is required");
  }

  if (
    !productData.price ||
    isNaN(productData.price) ||
    productData.price <= 0
  ) {
    errors.push("Valid price is required");
  }

  if (!productData.sizes || productData.sizes.trim().length === 0) {
    errors.push("Size is required");
  }

  if (!productData.colors || productData.colors.length === 0) {
    errors.push("At least one color is required");
  }

  if (!productData.image || productData.image.trim().length === 0) {
    errors.push("At least one image is required");
  }

  if (!productData.email || !isValidEmail(productData.email)) {
    errors.push("Valid email is required");
  }

  // Category validation
  const validCategories = [
    "clothing",
    "electronics",
    "footwear",
    "accessories",
    "furniture",
    "cosmetics",
    "groceries",
    "paper",
  ];

  if (productData.category && !validCategories.includes(productData.category)) {
    errors.push("Invalid category selected");
  }

  // Price validation
  if (
    productData.price &&
    (productData.price < 0 || productData.price > 1000000)
  ) {
    errors.push("Price must be between 0 and 1,000,000");
  }

  // Image URL validation
  if (productData.image && !isValidImageUrl(productData.image)) {
    errors.push("Invalid image URL format");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Image URL validation
export const isValidImageUrl = (url) => {
  const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/;
  return imageUrlRegex.test(url);
};

// Price formatting
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Category display name
export const getCategoryDisplayName = (category) => {
  const categoryMap = {
    clothing: "Clothing",
    electronics: "Electronics",
    footwear: "Footwear",
    accessories: "Accessories",
    furniture: "Furniture",
    cosmetics: "Cosmetics",
    groceries: "Groceries",
    paper: "Paper Products",
  };

  return (
    categoryMap[category] ||
    category.charAt(0).toUpperCase() + category.slice(1)
  );
};

// Condition display name
export const getConditionDisplayName = (condition) => {
  const conditionMap = {
    new: "New",
    "gently-used": "Gently Used",
    "needs-repair": "Needs Repair",
  };

  return conditionMap[condition] || condition;
};

// Environmental impact calculation
export const calculateEnvironmentalImpact = (category) => {
  const impactMap = {
    clothing: { co2: 2.1, water: 1600 },
    electronics: { co2: 5.2, water: 800 },
    footwear: { co2: 3.1, water: 1200 },
    accessories: { co2: 1.5, water: 600 },
    furniture: { co2: 8.4, water: 2400 },
    cosmetics: { co2: 0.8, water: 400 },
    groceries: { co2: 1.2, water: 300 },
    paper: { co2: 0.5, water: 200 },
  };

  return impactMap[category] || { co2: 2.1, water: 1600 };
};

// Sanitize product data for API
export const sanitizeProductData = (productData) => {
  return {
    name: productData.name?.trim(),
    brand: productData.brand?.trim(),
    category: productData.category?.toLowerCase(),
    price: parseFloat(productData.price) || 0,
    sizes: productData.sizes?.trim(),
    colors: Array.isArray(productData.colors) ? productData.colors : [],
    image: productData.image?.trim(),
    inStock: Boolean(productData.inStock),
    email: productData.email?.trim().toLowerCase(),
    co2: parseFloat(productData.co2) || 0,
    water: parseFloat(productData.water) || 0,
    description: productData.description?.trim() || "",
    condition: productData.condition || "gently-used",
    tags: Array.isArray(productData.tags) ? productData.tags : [],
    images: Array.isArray(productData.images) ? productData.images : [],
    userId: productData.userId,
  };
};
