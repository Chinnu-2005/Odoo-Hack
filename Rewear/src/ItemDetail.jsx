import { useState } from "react";
import {
  Heart,
  Share2,
  Leaf,
  Droplets,
  Star,
  MapPin,
  Calendar,
  Package,
  ArrowLeft,
  User,
} from "lucide-react";

const itemData = {
  id: 1,
  title: "Vintage Denim Jacket",
  description:
    "Beautiful vintage denim jacket from the 90s. Slightly oversized fit, perfect for layering. Has some natural fading that adds to its character. No stains or tears, well-maintained piece. Perfect for casual outings and adds a retro touch to any outfit.",
  images: [
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
  ],
  size: "Medium",
  condition: "Gently Used",
  category: "Jacket",
  type: "Topwear",
  tags: ["vintage", "denim", "casual", "90s", "oversized"],
  co2Saved: 8.5,
  waterSaved: 600,
  status: "Available",
  uploader: {
    name: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    trustScore: 4.9,
    points: 1250,
    totalSwaps: 34,
    joinDate: "2023-03-15",
    location: "San Francisco, CA",
  },
  postedDate: "2024-01-20",
};

export default function ItemDetail({ onNavigate }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate("browse")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Browse</span>
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
          >
            <Package className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-800">ReWear</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
              <img
                src={
                  itemData.images[selectedImage] ||
                  "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop"
                }
                alt={itemData.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {itemData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-200 ${
                    selectedImage === index
                      ? "ring-2 ring-green-500 ring-offset-2"
                      : ""
                  }`}
                >
                  <img
                    src={
                      image ||
                      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=150&h=150&fit=crop"
                    }
                    alt={`${itemData.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header Section */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {itemData.title}
                </h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        isFavorited
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Status and Badges */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    itemData.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {itemData.status}
                </span>
                <span className="inline-flex px-3 py-1 border border-gray-300 rounded-full text-sm">
                  {itemData.category}
                </span>
                <span className="inline-flex px-3 py-1 border border-gray-300 rounded-full text-sm">
                  {itemData.condition}
                </span>
                <span className="inline-flex px-3 py-1 border border-gray-300 rounded-full text-sm">
                  Size {itemData.size}
                </span>
              </div>

              {/* Eco-Impact Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2 text-sm">
                  <Leaf className="h-4 w-4" />
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-full">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-700">
                        🌿 {itemData.co2Saved} kg
                      </div>
                      <div className="text-xs text-green-600">CO₂ Avoided</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-full">
                      <Droplets className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-700">
                        💧 {itemData.waterSaved}L
                      </div>
                      <div className="text-xs text-blue-600">Water Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {itemData.description}
              </p>
            </div>

            {/* Item Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Item Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-600">Category</span>
                  <p className="font-medium text-sm">{itemData.category}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600">Type</span>
                  <p className="font-medium text-sm">{itemData.type}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600">Size</span>
                  <p className="font-medium text-sm">{itemData.size}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600">Condition</span>
                  <p className="font-medium text-sm">{itemData.condition}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {itemData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-2 py-1 border border-gray-300 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg">
                Request Swap
              </button>
              <button className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 text-base py-3 h-12 font-semibold bg-transparent rounded-lg transition-colors">
                Redeem via Points (500 pts)
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Uploader Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-200">
              <div className="p-4">
                <h3 className="text-base font-semibold flex items-center gap-2 mb-3">
                  <User className="h-4 w-4" />
                  Listed by
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={
                        itemData.uploader.avatar ||
                        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
                      }
                      alt={itemData.uploader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">
                      {itemData.uploader.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="font-medium">
                          {itemData.uploader.trustScore}
                        </span>
                        <span>Trust Score</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3 text-green-600" />
                        <span className="font-medium">
                          {itemData.uploader.points}
                        </span>
                        <span>Points</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{itemData.uploader.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Member since{" "}
                      {new Date(
                        itemData.uploader.joinDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3" />
                    <span>{itemData.uploader.totalSwaps} successful swaps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Posted on{" "}
                      {new Date(itemData.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
