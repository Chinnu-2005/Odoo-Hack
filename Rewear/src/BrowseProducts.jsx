import { useState } from "react";
import {
  Search,
  Grid3X3,
  List,
  Heart,
  Leaf,
  Droplets,
  MapPin,
  Star,
  Package,
  SlidersHorizontal,
  X,
} from "lucide-react";

const categories = [
  "All Categories",
  "Tops & T-Shirts",
  "Jackets & Coats",
  "Dresses",
  "Pants & Jeans",
  "Skirts",
  "Shoes",
  "Accessories",
  "Activewear",
  "Formal Wear",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const conditions = ["Like New", "Excellent", "Good", "Fair"];

const sampleProducts = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop",
    condition: "Excellent",
    size: "M",
    category: "Jackets & Coats",
    co2Saved: 2.5,
    waterSaved: 1800,
    location: "San Francisco, CA",
    uploader: "Emma Wilson",
    uploaderRating: 4.9,
    postedDate: "2024-01-20",
    tags: ["vintage", "denim", "casual"],
    isFavorited: false,
  },
  {
    id: 2,
    title: "Designer Wool Coat",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
    condition: "Good",
    size: "L",
    category: "Jackets & Coats",
    co2Saved: 4.2,
    waterSaved: 3200,
    location: "New York, NY",
    uploader: "Sarah Johnson",
    uploaderRating: 4.7,
    postedDate: "2024-01-19",
    tags: ["designer", "wool", "formal"],
    isFavorited: true,
  },
  {
    id: 3,
    title: "Cotton Summer Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop",
    condition: "Like New",
    size: "S",
    category: "Dresses",
    co2Saved: 1.8,
    waterSaved: 2400,
    location: "Los Angeles, CA",
    uploader: "Mike Chen",
    uploaderRating: 4.8,
    postedDate: "2024-01-18",
    tags: ["cotton", "summer", "casual"],
    isFavorited: false,
  },
  {
    id: 4,
    title: "Leather Boots",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    condition: "Good",
    size: "9",
    category: "Shoes",
    co2Saved: 3.1,
    waterSaved: 2800,
    location: "Chicago, IL",
    uploader: "Lisa Park",
    uploaderRating: 4.6,
    postedDate: "2024-01-17",
    tags: ["leather", "boots", "winter"],
    isFavorited: false,
  },
  {
    id: 5,
    title: "Silk Blouse",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
    condition: "Excellent",
    size: "M",
    category: "Tops & T-Shirts",
    co2Saved: 2.3,
    waterSaved: 1900,
    location: "Seattle, WA",
    uploader: "Alex Rodriguez",
    uploaderRating: 4.9,
    postedDate: "2024-01-16",
    tags: ["silk", "formal", "elegant"],
    isFavorited: false,
  },
  {
    id: 6,
    title: "Athletic Sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    condition: "Good",
    size: "8.5",
    category: "Shoes",
    co2Saved: 2.7,
    waterSaved: 2100,
    location: "Austin, TX",
    uploader: "Jordan Kim",
    uploaderRating: 4.5,
    postedDate: "2024-01-15",
    tags: ["athletic", "sneakers", "sports"],
    isFavorited: true,
  },
];

export default function BrowseProducts({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(sampleProducts);

  const toggleFavorite = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, isFavorited: !product.isFavorited }
          : product
      )
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedSizes([]);
    setSelectedConditions([]);
    setPriceRange([0, 100]);
    setSortBy("newest");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesSize =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);
    const matchesCondition =
      selectedConditions.length === 0 ||
      selectedConditions.includes(product.condition);

    return matchesSearch && matchesCategory && matchesSize && matchesCondition;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
          >
            <Package className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-800">ReWear</span>
          </button>
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate("add-item")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              List Item
            </button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for items, brands, or styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-48 h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-40 h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="impact">Most Impact</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              <div className="flex items-center gap-1 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-lg shadow-sm border p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Size Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Size</label>
                  <div className="space-y-2">
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`size-${size}`}
                          checked={selectedSizes.includes(size)}
                          onChange={() => toggleSize(size)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={`size-${size}`} className="text-sm">
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Condition
                  </label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div
                        key={condition}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`condition-${condition}`}
                          checked={selectedConditions.includes(condition)}
                          onChange={() => toggleCondition(condition)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label
                          htmlFor={`condition-${condition}`}
                          className="text-sm"
                        >
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Points Range: {priceRange[0]} - {priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full mt-2"
                  />
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Browse Items</h1>
            <p className="text-gray-600">
              {filteredProducts.length} items found
            </p>
          </div>

          {/* Active Filters */}
          {(selectedSizes.length > 0 ||
            selectedConditions.length > 0 ||
            selectedCategory !== "All Categories") && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategory !== "All Categories" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {selectedCategory}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCategory("All Categories")}
                  />
                </span>
              )}
              {selectedSizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  Size {size}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleSize(size)}
                  />
                </span>
              ))}
              {selectedConditions.map((condition) => (
                <span
                  key={condition}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {condition}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleCondition(condition)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border group hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate("item-detail")}
              >
                <div className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                        {product.condition}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="h-8 w-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            product.isFavorited
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span className="inline-flex px-2 py-1 border border-gray-300 text-xs rounded">
                      Size {product.size}
                    </span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span>{product.co2Saved}kg CO₂</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span>{product.waterSaved}L</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{product.uploaderRating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(product.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate("item-detail")}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 rounded-lg object-cover hover:opacity-80 transition-opacity"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                          {product.title}
                        </h3>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              product.isFavorited
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                          {product.condition}
                        </span>
                        <span className="inline-flex px-2 py-1 border border-gray-300 text-xs rounded">
                          Size {product.size}
                        </span>
                        <span className="inline-flex px-2 py-1 border border-gray-300 text-xs rounded">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span>{product.co2Saved}kg CO₂ saved</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span>{product.waterSaved}L water saved</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{product.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>by {product.uploader}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{product.uploaderRating}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(product.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
