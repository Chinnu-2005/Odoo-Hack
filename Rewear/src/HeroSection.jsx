import React from "react";
import { Recycle, ArrowRight, Users, Award, Leaf } from "lucide-react";

const HeroSection = ({ onNavigate }) => {
  const navigateToRegister = () => onNavigate("register");

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-green-100 via-green-50 to-emerald-50">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%234CAF50' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Swap. Save.{" "}
            <span className="text-green-600 relative">
              Sustain.
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-green-400 rounded-full opacity-60"></div>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Exchange unused clothes and earn points while saving the planet.
            Join thousands making fashion sustainable, one swap at a time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <button
            onClick={navigateToRegister}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Recycle className="h-5 w-5" />
            Start Swapping
          </button>
          <button 
            onClick={() => onNavigate("browse")}
            className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto bg-transparent flex items-center justify-center gap-2"
          >
            Browse Items
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
            List an Item
          </button>
        </div>

        <div className="mt-16 flex justify-center items-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>50K+ Members</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            <span>Verified Items</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span>100% Sustainable</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
