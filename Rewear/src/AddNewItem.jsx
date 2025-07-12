import { useState, useEffect } from "react";
import {
  Upload,
  X,
  Package,
  ArrowLeft,
  Plus,
  ImageIcon,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import productService from "./services/productService";
import {
  validateProductData,
  sanitizeProductData,
  calculateEnvironmentalImpact,
  getCategoryDisplayName,
} from "./utils/productValidation";

const categories = [
  "clothing",
  "electronics",
  "footwear",
  "accessories",
  "furniture",
  "cosmetics",
  "groceries",
  "paper",
];

const conditions = ["New", "Gently Used", "Needs Repair"];

export default function AddNewItem({ onNavigate }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    sizes: "",
    colors: [],
    image: "",
    inStock: true,
    email: user?.email || "",
    co2: 2.1,
    water: 1600,
    description: "",
    condition: "",
  });

  // Update environmental impact when category changes
  useEffect(() => {
    if (formData.category) {
      const impact = calculateEnvironmentalImpact(formData.category);
      setFormData((prev) => ({
        ...prev,
        co2: impact.co2,
        water: impact.water,
      }));
    }
  }, [formData.category]);

  const addTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = () => {
    // Simulate image upload - replace with actual file upload logic
    const newImage = `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&text=Product${
      uploadedImages.length + 1
    }`;
    setUploadedImages([...uploadedImages, newImage]);
    setFormData((prev) => ({ ...prev, image: newImage }));
  };

  const removeImage = (indexToRemove) => {
    const newImages = uploadedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedImages(newImages);
    setFormData((prev) => ({ ...prev, image: newImages[0] || "" }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleColorChange = (color) => {
    setFormData((prev) => {
      const colors = prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color];
      return { ...prev, colors };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    setValidationErrors([]);

    try {
      // Prepare the data according to your Product model
      const productData = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: parseFloat(formData.price),
        sizes: formData.sizes,
        colors: formData.colors,
        image: formData.image,
        inStock: formData.inStock,
        email: formData.email,
        co2: formData.co2,
        water: formData.water,
        description: formData.description || "",
        condition: formData.condition || "gently-used",
        tags: selectedTags,
        images: uploadedImages,
        userId: user?.userId,
      };

      // Validate the data
      const validation = validateProductData(productData);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setIsLoading(false);
        return;
      }

      // Sanitize the data
      const sanitizedData = sanitizeProductData(productData);

      // Use the product service to create the product
      const result = await productService.createProduct(sanitizedData);
      console.log("Product created successfully:", result);

      setSuccess(true);

      // Navigate to dashboard after successful creation
      setTimeout(() => {
        onNavigate("dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-600">
              Share your pre-loved items with the ReWear community
            </p>
          </div>
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-t-lg">
            <h2 className="text-xl font-bold text-green-800">
              Product Details
            </h2>
            <p className="text-green-700 mt-1">
              Provide detailed information about your item to help others find
              what they're looking for.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-700">
                  Product created successfully! Redirecting to dashboard...
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-medium">
                    Please fix the following errors:
                  </span>
                </div>
                <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-gray-900">
                  Product Images
                </label>
                <p className="text-sm text-gray-600">
                  Upload high-quality photos of your item (at least one
                  required)
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group hover:shadow-md transition-shadow"
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {uploadedImages.length < 5 && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-green-600 group"
                    >
                      <div className="p-3 rounded-full bg-gray-100 group-hover:bg-green-100 transition-colors">
                        <Upload className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium">Add Photo</span>
                    </button>
                  )}
                </div>

                {/* Drag and Drop Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag and drop images here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse files
                  </p>
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-base font-semibold">
                    Product Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="brand" className="text-base font-semibold">
                    Brand *
                  </label>
                  <input
                    id="brand"
                    type="text"
                    placeholder="e.g., Levi's, Nike, etc."
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Price and Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-base font-semibold">
                    Price (₹) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sizes" className="text-base font-semibold">
                    Size *
                  </label>
                  <input
                    id="sizes"
                    type="text"
                    placeholder="e.g., M, L, 32, 8"
                    value={formData.sizes}
                    onChange={(e) => handleInputChange("sizes", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Category and Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-semibold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {getCategoryDisplayName(category)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-base font-semibold">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      handleInputChange("condition", e.target.value)
                    }
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select condition</option>
                    {conditions.map((condition) => (
                      <option
                        key={condition}
                        value={condition.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <label className="text-base font-semibold">Colors *</label>
                <p className="text-sm text-gray-600">
                  Select all colors that apply to your item
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Red",
                    "Blue",
                    "Green",
                    "Yellow",
                    "Black",
                    "White",
                    "Gray",
                    "Brown",
                    "Pink",
                    "Purple",
                    "Orange",
                    "Multi",
                  ].map((color) => (
                    <label
                      key={color}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.colors.includes(color.toLowerCase())}
                        onChange={() => handleColorChange(color.toLowerCase())}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-base font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your item's condition, fit, style, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <label className="text-base font-semibold">Tags</label>
                <p className="text-sm text-gray-600">
                  Add tags to help others discover your item
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="h-12 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Environmental Impact Preview */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Environmental Impact
                </h3>
                <p className="text-sm text-green-700 leading-relaxed">
                  By listing this item, you're helping save approximately{" "}
                  <span className="font-semibold">{formData.co2}kg of CO₂</span>{" "}
                  and{" "}
                  <span className="font-semibold">
                    {formData.water}L of water
                  </span>{" "}
                  that would be used to produce a new item. Thank you for
                  contributing to a more sustainable future! 🌱
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading || !formData.image}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-lg py-4 h-14 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Product...
                    </>
                  ) : (
                    "List Product"
                  )}
                </button>
                {!formData.image && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    Please upload at least one image to continue
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
