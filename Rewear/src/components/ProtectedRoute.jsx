import React from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "home",
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // You could redirect to login page here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            Please log in to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // If admin access is required but user is not admin
  if (requireAdmin && (!isAuthenticated || user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You need admin privileges to access this page.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // If user is authenticated but trying to access login/register pages
  if (!requireAuth && isAuthenticated) {
    // Redirect authenticated users away from login/register pages
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Already Logged In
          </h2>
          <p className="text-gray-600 mb-4">You are already logged in.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
