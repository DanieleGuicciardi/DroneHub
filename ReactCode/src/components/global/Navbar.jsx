import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import LiveSearchBar from "./LiveSearch";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = useCartStore((state) => state.cart.length);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") {
        setShowNavbar(true);
      } else {
        setShowNavbar(window.scrollY > window.innerHeight * 0.3);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur shadow-md text-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
            <div className="flex items-center gap-3 justify-start">
              <button onClick={handleHomeClick} className="hover:scale-105 transition">
                <img
                  src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1745839326/ChatGPT_Image_28_apr_2025_13_22_00_qpvete.png"
                  alt="Logo"
                  className="h-13 w-auto"
                />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleHomeClick}
                className="text-xl font-bold tracking-wide hover:text-blue-400 transition"
              >
                DroneHub
              </button>
            </div>

            <div className="hidden md:flex items-center gap-6 justify-end">
              <div className="w-48">
                <LiveSearchBar />
              </div>

              <button onClick={() => navigate("/products")} className="hover:text-blue-400 transition">
                Products
              </button>

              {!user ? (
                <button onClick={() => navigate("/login")} className="hover:text-blue-400 transition">
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    const confirmLogout = window.confirm("Are you sure you want to logout?");
                    if (confirmLogout) logout();
                  }}
                  className="hover:text-red-400 transition"
                >
                  Logout
                </button>
              )}

              <button onClick={() => navigate("/cart")} className="relative hover:text-blue-400 transition">
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>


            {/* mobile */}
            <div className="flex justify-end md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden px-6 pb-6"
              >
                <div className="pt-4 space-y-4 text-lg font-medium border-t border-gray-700">
                  <LiveSearchBar />

                  <button onClick={() => { navigate("/products"); setMenuOpen(false); }} className="block w-full text-left hover:text-blue-400 transition">
                    Products
                  </button>

                  {!user ? (
                    <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="block w-full text-left hover:text-blue-400 transition">
                      Login
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const confirmLogout = window.confirm("Are you sure you want to logout?");
                        if (confirmLogout) {
                          logout();
                          setMenuOpen(false);
                        }
                      }}
                      className="block w-full text-left hover:text-red-400 transition"
                    >
                      Logout
                    </button>
                  )}

                  <button
                    onClick={() => { navigate("/cart"); setMenuOpen(false); }}
                    className="flex items-center gap-2 hover:text-blue-400 transition"
                  >
                    <FaShoppingCart />
                    Cart
                    {cartCount > 0 && (
                      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
