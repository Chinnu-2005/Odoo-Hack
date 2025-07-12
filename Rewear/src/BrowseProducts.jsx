import { useState, useEffect } from "react";
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
  Loader2,
  Menu,
} from "lucide-react";
import productService from "./services/productService";
import { useAuth } from "./contexts/AuthContext";

const categories = [
  "All Categories",
  "clothing",
  "electronics",
  "footwear",
  "accessories",
  "furniture",
  "cosmetics",
  "groceries",
  "paper",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const conditions = ["Like New", "Excellent", "Good", "Fair"];

// Helper function to map API data to component format
const mapApiProductToComponent = (apiProduct) => {
  return {
    id: apiProduct._id,
    title: apiProduct.name,
    image:
      apiProduct.image ||
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&text=Product",
    condition: apiProduct.condition || "Good",
    size: apiProduct.sizes,
    category: apiProduct.category,
    co2Saved: apiProduct.co2,
    waterSaved: apiProduct.water,
    location: "India", // Default location since API doesn't provide it
    uploader: apiProduct.email,
    uploaderRating: 4.5, // Default rating since API doesn't provide it
    postedDate: apiProduct.createdAt,
    tags: apiProduct.colors || [],
    isFavorited: false,
    price: apiProduct.price,
    brand: apiProduct.brand,
  };
};

export default function BrowseProducts({ onNavigate }) {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const apiProducts = await productService.getProducts();
        const mappedProducts = apiProducts.map(mapApiProductToComponent);
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
            {isAuthenticated && (
              <button
                onClick={() => onNavigate("dashboard")}
                className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                Dashboard
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => onNavigate("add-item")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                List Item
              </button>
            )}
            {!isAuthenticated && (
              <button
                onClick={() => onNavigate("login")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2 px-4">
              {isAuthenticated && (
                <button
                  onClick={() => {
                    onNavigate("dashboard");
                    setShowMobileMenu(false);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors text-left"
                >
                  Dashboard
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    onNavigate("add-item");
                    setShowMobileMenu(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-left"
                >
                  List Item
                </button>
              )}
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    onNavigate("login");
                    setShowMobileMenu(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-left"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading products...
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch the latest items.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error loading products
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid/List */}
        {!loading && !error && (
          <>
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
                      <h3 className="font-semibold text-gray-900 mb-1 hover:text-green-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.brand}
                      </p>

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
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            ₹{product.price}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(product.postedDate).toLocaleDateString()}
                          </span>
                        </div>
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
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                                {product.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {product.brand}
                              </p>
                            </div>
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
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                ₹{product.price}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(
                                  product.postedDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && filteredProducts.length === 0 && (
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
