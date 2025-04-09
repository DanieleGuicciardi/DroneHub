import { Link } from "react-router-dom";

import CineDrones from "../assets/Products/CineDrones.png"
import FPVDrones from "../assets/Products/FPVDrones.webp"
import Accessories from "../assets/Products/Accessories.jpg"

const Products = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">Shop by Category</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        <Link
          to="/products/cine"
          className="relative group h-60 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={CineDrones}
            alt="CineDrones"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-2xl font-bold group-hover:text-blue-400 transition">CineDrones</h2>
          </div>
        </Link>

        <Link
          to="/products/fpv"
          className="relative group h-60 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={FPVDrones}
            alt="FPVDrones"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-2xl font-bold group-hover:text-purple-400 transition">FPV Drones</h2>
          </div>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <Link
          to="/products/accessories"
          className="relative group h-40 rounded-xl overflow-hidden shadow-lg block"
        >
          <img
            src={Accessories}
            alt="Accessories"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-2xl font-bold group-hover:text-yellow-400 transition">Accessories</h2>
          </div>
        </Link>
      </div>

      <div className="text-center mt-20">
        <p className="text-xl mb-4">Are you a business or professional operator?</p>
        <Link
          to="/products/enterprise"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-full font-semibold shadow-lg"
        >
          Explore Enterprise Drones
        </Link>
      </div>
    </section>
  );
};

export default Products;

