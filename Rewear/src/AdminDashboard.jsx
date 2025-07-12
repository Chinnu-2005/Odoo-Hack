import { useState } from "react";
import {
  Search,
  Check,
  X,
  AlertTriangle,
  Package,
  Users,
  TrendingUp,
  Filter,
} from "lucide-react";

const pendingItems = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&h=60&fit=crop",
    title: "Vintage Band T-Shirt",
    uploader: "Sarah Johnson",
    date: "2024-01-22",
    category: "Shirt",
    status: "pending",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=60&h=60&fit=crop",
    title: "Designer Handbag",
    uploader: "Mike Chen",
    date: "2024-01-22",
    category: "Accessories",
    status: "pending",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop",
    title: "Running Shoes",
    uploader: "Emma Wilson",
    date: "2024-01-21",
    category: "Footwear",
    status: "pending",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&h=60&fit=crop",
    title: "Cotton Saree",
    uploader: "Priya Sharma",
    date: "2024-01-21",
    category: "Saree",
    status: "pending",
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=60&h=60&fit=crop",
    title: "Denim Jacket",
    uploader: "Alex Rodriguez",
    date: "2024-01-20",
    category: "Jacket",
    status: "pending",
  },
];

const approvedItems = [
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=60&h=60&fit=crop",
    title: "Silk Dress",
    uploader: "Lisa Park",
    date: "2024-01-19",
    category: "Dress",
    status: "approved",
  },
  {
    id: 7,
    thumbnail:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=60&h=60&fit=crop",
    title: "Leather Boots",
    uploader: "Jordan Kim",
    date: "2024-01-18",
    category: "Footwear",
    status: "approved",
  },
];

const spamItems = [
  {
    id: 8,
    thumbnail:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=60&h=60&fit=crop",
    title: "Fake Designer Bag",
    uploader: "Suspicious User",
    date: "2024-01-17",
    category: "Accessories",
    status: "spam",
  },
];

const stats = {
  totalItems: 1247,
  pendingReview: 23,
  activeUsers: 892,
  completedSwaps: 456,
};

export default function AdminDashboard({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("pending");

  const handleApprove = (itemId) => {
    console.log(`Approved item ${itemId}`);
    // Handle approval logic
  };

  const handleReject = (itemId) => {
    console.log(`Rejected item ${itemId}`);
    // Handle rejection logic
  };

  const getItemsForTab = (tab) => {
    switch (tab) {
      case "pending":
        return pendingItems;
      case "approved":
        return approvedItems;
      case "spam":
        return spamItems;
      default:
        return pendingItems;
    }
  };

  const filteredItems = getItemsForTab(activeTab).filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uploader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      item.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Panel – Item Moderation
              </h1>
              <p className="text-gray-600">
                Manage and moderate community item listings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-800">
                ReWear Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Items</h3>
              <Package className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">
              {stats.totalItems.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Pending Review
              </h3>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
            <p className="text-xs text-gray-500">Requires attention</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Active Users
              </h3>
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Completed Swaps
              </h3>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{stats.completedSwaps}</div>
            <p className="text-xs text-gray-500">+23% from last month</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items or uploaders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="shirt">Shirt</option>
                <option value="pants">Pants</option>
                <option value="dress">Dress</option>
                <option value="saree">Saree</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sidebar Tabs and Table */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Item Status</h3>
              </div>
              <div className="p-2">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Pending ({pendingItems.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("approved")}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === "approved"
                        ? "bg-green-100 text-green-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approved ({approvedItems.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("spam")}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === "spam"
                        ? "bg-red-100 text-red-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Spam ({spamItems.length})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {activeTab === "pending" && "Pending Items"}
                  {activeTab === "approved" && "Approved Items"}
                  {activeTab === "spam" && "Spam Items"}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-4 font-medium text-gray-600 w-20">
                        Image
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Title
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Uploader
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Category
                      </th>
                      <th className="text-left p-4 font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-right p-4 font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <td className="p-4">
                          <img
                            src={
                              item.thumbnail ||
                              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&h=60&fit=crop"
                            }
                            alt={item.title}
                            className="w-15 h-15 rounded-lg object-cover"
                          />
                        </td>
                        <td className="p-4 font-medium">{item.title}</td>
                        <td className="p-4">{item.uploader}</td>
                        <td className="p-4">
                          <span className="inline-flex px-2 py-1 border border-gray-300 rounded-full text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{item.date}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {activeTab === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(item.id)}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center gap-1"
                                >
                                  <Check className="h-4 w-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg flex items-center gap-1"
                                >
                                  <X className="h-4 w-4" />
                                  Reject
                                </button>
                              </>
                            )}
                            {activeTab === "approved" && (
                              <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs items-center gap-1">
                                <Check className="h-3 w-3" />
                                Approved
                              </span>
                            )}
                            {activeTab === "spam" && (
                              <span className="inline-flex px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs items-center gap-1">
                                <X className="h-3 w-3" />
                                Spam
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredItems.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No items found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
