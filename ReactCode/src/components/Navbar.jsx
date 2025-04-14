import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/headLogo.png";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  // Placeholder per conteggio prodotti nel carrello
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowNavbar(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full bg-black/80 backdrop-blur text-white px-6 py-4 fixed top-0 z-50 shadow-md"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            {/* Logo a sinistra */}
            <Link to="/" className="flex items-center gap-2 z-10">
              <img src={Logo} alt="Logo" className="h-8" />
            </Link>

            {/* Nome sito al centro */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                to="/"
                className="text-2xl font-bold tracking-wide hover:text-blue-400 transition-colors"
              >
                DroneHub
              </Link>
            </div>

            {/* Menu a destra */}
            <ul className="flex items-center space-x-6 text-lg font-medium z-10">
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
              <li className="relative">
                <Link to="/cart" className="hover:text-blue-400 transition-colors flex items-center">
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
