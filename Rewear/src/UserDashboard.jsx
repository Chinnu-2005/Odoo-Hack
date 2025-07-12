import { useState } from "react";
import {
  Plus,
  Leaf,
  Droplets,
  Star,
  Clock,
  CheckCircle,
  Package,
  Eye,
  MessageCircle,
  Heart,
} from "lucide-react";

const userStats = {
  name: "Lakshman",
  fullName: "Lakshman Kumar",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  trustScore: 4.8,
  points: 1250,
  totalSwaps: 23,
  co2Saved: 45.6,
  waterSaved: 34200,
};

const uploadedItems = [
  {
    id: 1,
    title: "Vintage Band T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
    status: "Active",
    views: 24,
    interested: 3,
    postedDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Designer Jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
    status: "Pending",
    views: 12,
    interested: 1,
    postedDate: "2024-01-19",
  },
  {
    id: 3,
    title: "Cotton Saree",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop",
    status: "Swapped",
    views: 45,
    interested: 8,
    postedDate: "2024-01-15",
  },
];

const ongoingSwaps = [
  {
    id: 1,
    item: "Wool Sweater",
    partner: "Mike Chen",
    partnerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    status: "awaiting_confirmation",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop",
    progress: 25,
  },
  {
    id: 2,
    item: "Summer Dress",
    partner: "Emma Wilson",
    partnerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    status: "in_transit",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop",
    progress: 75,
  },
];

const completedSwaps = [
  {
    id: 1,
    item: "Leather Jacket",
    partner: "Alex Rodriguez",
    partnerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    completedDate: "2024-01-15",
    rating: 5,
    feedback: "Great condition, exactly as described!",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    item: "Running Shoes",
    partner: "Lisa Park",
    partnerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    completedDate: "2024-01-10",
    rating: 4,
    feedback: "Good quality, fast shipping.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
  },
];

export default function UserDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("uploaded");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "swapped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSwapStatusText = (status) => {
    switch (status) {
      case "awaiting_confirmation":
        return "Awaiting Confirmation";
      case "in_transit":
        return "In Transit";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
          >
            <Package className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-800">ReWear</span>
          </button>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("browse")}
              className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Browse
            </button>
            <button
              onClick={() => onNavigate("add-item")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New Item
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-300 hover:border-red-300"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hi, {userStats.name} 👋
          </h1>
          <p className="text-gray-600">
            Welcome back to your sustainable fashion journey
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-t-lg">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={
                    userStats.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  }
                  alt={userStats.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userStats.fullName}
                </h2>
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold">
                      {userStats.trustScore}
                    </span>
                    <span className="text-gray-600">Trust Score</span>
                  </div>
                  <span className="inline-flex px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-lg font-medium">
                    {userStats.points} Points
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {userStats.totalSwaps}
                </div>
                <div className="text-gray-600">Total Swaps</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">
                    {userStats.co2Saved}kg
                  </span>
                </div>
                <div className="text-gray-600">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Droplets className="h-6 w-6 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">
                    {userStats.waterSaved.toLocaleString()}L
                  </span>
                </div>
                <div className="text-gray-600">Water Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Item Button */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate("add-item")}
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg text-white flex items-center gap-3"
          >
            <Plus className="h-5 w-5" />
            Add New Item
          </button>
        </div>

        {/* Tabs Section */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex bg-white rounded-lg shadow-sm border p-1">
            <button
              onClick={() => setActiveTab("uploaded")}
              className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-colors ${
                activeTab === "uploaded"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              My Uploaded Items
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-colors ${
                activeTab === "ongoing"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Ongoing Swaps
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-colors ${
                activeTab === "completed"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed Swaps
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "uploaded" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">My Uploaded Items</h2>
                <span className="inline-flex px-3 py-1 border border-gray-300 rounded-full text-lg">
                  {uploadedItems.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop"
                          }
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs mt-2 ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{item.interested}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(item.postedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ongoing" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Ongoing Swaps</h2>
                <span className="inline-flex px-3 py-1 border border-gray-300 rounded-full text-lg">
                  {ongoingSwaps.length} active
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ongoingSwaps.map((swap) => (
                  <div
                    key={swap.id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            swap.image ||
                            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=80&h=80&fit=crop"
                          }
                          alt={swap.item}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{swap.item}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img
                                src={
                                  swap.partnerAvatar ||
                                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face"
                                }
                                alt={swap.partner}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              with {swap.partner}
                            </span>
                          </div>
                        </div>
                        <Clock className="h-6 w-6 text-orange-500" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <span className="inline-flex px-2 py-1 border border-gray-300 rounded-full text-sm">
                          {getSwapStatusText(swap.status)}
                        </span>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{swap.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${swap.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message Partner
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "completed" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Completed Swaps</h2>
                <span className="inline-flex px-3 py-1 border border-gray-300 rounded-full text-lg">
                  {completedSwaps.length} completed
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedSwaps.map((swap) => (
                  <div
                    key={swap.id}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            swap.image ||
                            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=80&h=80&fit=crop"
                          }
                          alt={swap.item}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{swap.item}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img
                                src={
                                  swap.partnerAvatar ||
                                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face"
                                }
                                alt={swap.partner}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              with {swap.partner}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {swap.completedDate}
                          </p>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < swap.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            ({swap.rating}/5)
                          </span>
                        </div>
                        {swap.feedback && (
                          <p className="text-sm text-gray-700 italic">
                            "{swap.feedback}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
