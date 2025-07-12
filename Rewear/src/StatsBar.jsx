import React from "react";
import { Leaf, Droplets, ArrowRight } from "lucide-react";

const StatsBar = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Our Collective Impact
          </h2>
          <p className="text-green-100 text-lg">
            Together, we're making a real difference for our planet
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full">
                <Leaf className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">1,240 kg</div>
            <div className="text-green-100 text-lg font-medium">
              Total CO₂ Saved
            </div>
            <div className="text-green-200 text-sm mt-2">
              Equivalent to planting 56 trees
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full">
                <Droplets className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">90,000 L</div>
            <div className="text-green-100 text-lg font-medium">
              Total Water Saved
            </div>
            <div className="text-green-200 text-sm mt-2">
              Enough for 600 showers
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            Join the Movement
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
