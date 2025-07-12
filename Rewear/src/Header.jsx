import React, { useState } from "react";
import { Leaf, Menu, X, User, ChevronDown, Recycle } from "lucide-react";
import LoginPage from "./LoginPage";

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const navigateToRegister = () => onNavigate("register");

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <button
                onClick={() => onNavigate("browse")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
              >
                Browse Items
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
              >
                List an Item
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <button
                onClick={() => onNavigate("admin")}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
              >
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
                </button>
              )}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={openLoginModal}
                    className="text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Log In
                  </button>
                  <button
                    onClick={navigateToRegister}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </button>
                  {/* Profile dropdown would go here */}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                >
                  Home
                </a>
                <button
                  onClick={() => onNavigate("browse")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                >
                  Browse Items
                </button>
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                >
                  List an Item
                </a>
                <button
                  onClick={() => onNavigate("admin")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                >
                  Admin
                </button>
                {isLoggedIn && (
                  <button
                    onClick={() => onNavigate("dashboard")}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                )}

                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={openLoginModal}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium rounded-md transition-colors duration-200"
                      >
                        Log In
                      </button>
                      <button
                        onClick={navigateToRegister}
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full font-medium px-3 py-2 transition-colors duration-200"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">Profile</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginPage
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Header;
