import { useState } from "react";
import { Upload, X, Package, ArrowLeft, Plus, ImageIcon } from "lucide-react";

const categories = [
  "Shirt",
  "Pants",
  "Dress",
  "Saree",
  "Jacket",
  "Footwear",
  "Accessories",
  "Activewear",
  "Formal Wear",
];

const types = ["Topwear", "Bottomwear", "Footwear", "Accessories"];

const conditions = ["New", "Gently Used", "Needs Repair"];

export default function AddNewItem({ onNavigate }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
  });

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
    // Simulate image upload
    const newImage = `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&text=Image${
      uploadedImages.length + 1
    }`;
    setUploadedImages([...uploadedImages, newImage]);
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages(
      uploadedImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      tags: selectedTags,
      images: uploadedImages,
    });
    // Handle form submission
    onNavigate("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Item</h1>
            <p className="text-gray-600">
              Share your pre-loved clothing with the ReWear community
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
            <h2 className="text-xl font-bold text-green-800">Item Details</h2>
            <p className="text-green-700 mt-1">
              Provide detailed information about your item to help others find
              what they're looking for.
            </p>
          </div>
          <div className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-gray-900">
                  Photos
                </label>
                <p className="text-sm text-gray-600">
                  Upload up to 5 high-quality photos of your item
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group hover:shadow-md transition-shadow"
                    >
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
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
                  <label htmlFor="title" className="text-base font-semibold">
                    Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="size" className="text-base font-semibold">
                    Size *
                  </label>
                  <input
                    id="size"
                    type="text"
                    placeholder="e.g., M, L, 32, 8"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-base font-semibold"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your item's condition, fit, style, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-base font-semibold">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select type</option>
                    {types.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-base font-semibold">Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      handleInputChange("condition", e.target.value)
                    }
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
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
                  <span className="font-semibold">2.1kg of CO₂</span> and{" "}
                  <span className="font-semibold">1,600L of water</span> that
                  would be used to produce a new garment. Thank you for
                  contributing to a more sustainable future! 🌱
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4 h-14 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                >
                  List Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
