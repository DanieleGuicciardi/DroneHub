import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/headLogo.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

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
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-8" />
            </Link>

            {/* Center Title */}
            <Link to="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition-colors">
              DroneHub
            </Link>

            {/* Right Menu */}
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
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
