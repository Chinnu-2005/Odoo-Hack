import React from "react";
import { Droplets, Leaf, ArrowRight } from "lucide-react";

const FeaturedItems = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Denim Jacket",
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=320&h=300&fit=crop",
      waterSaved: "600L",
      co2Avoided: "8.5 kg",
      price: "25 points",
    },
    {
      id: 2,
      title: "Vintage Sweater",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=320&h=300&fit=crop",
      waterSaved: "450L",
      co2Avoided: "6.2 kg",
      price: "18 points",
    },
    {
      id: 3,
      title: "Summer Dress",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=320&h=300&fit=crop",
      waterSaved: "800L",
      co2Avoided: "12.3 kg",
      price: "32 points",
    },
    {
      id: 4,
      title: "Leather Boots",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=320&h=300&fit=crop",
      waterSaved: "1200L",
      co2Avoided: "18.7 kg",
      price: "45 points",
    },
    {
      id: 5,
      title: "Cotton T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=320&h=300&fit=crop",
      waterSaved: "300L",
      co2Avoided: "4.1 kg",
      price: "12 points",
    },
    {
      id: 6,
      title: "Wool Coat",
      image:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=320&h=300&fit=crop",
      waterSaved: "950L",
      co2Avoided: "15.8 kg",
      price: "38 points",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Items
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing pre-loved fashion pieces and see their positive
            environmental impact
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 w-max">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="w-80 flex-shrink-0 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg bg-gradient-to-b from-white to-gray-50 rounded-lg overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white font-semibold px-3 py-1 rounded-full text-sm">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        {item.waterSaved} Water Saved
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {item.co2Avoided} CO₂ Avoided
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
