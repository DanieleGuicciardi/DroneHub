import React from "react";
import Logo from "../assets/headLogo.png"

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 z-50">
      <img src={Logo} alt="Logo" className="bg-white p-5 h-5" />
      <Link to="/" className="text-2xl p font-bold tracking-wide hover:text-blue-400 transition-colors">
        DroneHub
      </Link>

      {/* Menu */}
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/products" className="hover:text-blue-400 transition-colors">
            Products
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-400 transition-colors">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
