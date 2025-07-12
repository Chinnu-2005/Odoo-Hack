import React from "react";
import { Recycle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Recycle className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
            <p className="text-gray-400">
              Building a sustainable future through community-driven clothing
              exchange.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/browse"
                  className="hover:text-white transition-colors"
                >
                  Browse Items
                </a>
              </li>
              <li>
                <a
                  href="/add-item"
                  className="hover:text-white transition-colors"
                >
                  List an Item
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="/impact"
                  className="hover:text-white transition-colors"
                >
                  Environmental Impact
                </a>
              </li>
              <li>
                <a
                  href="/trust-safety"
                  className="hover:text-white transition-colors"
                >
                  Trust & Safety
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/help" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 ReWear. All rights reserved. Made with 💚 for the
            planet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
