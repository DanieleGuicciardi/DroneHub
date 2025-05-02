import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

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
          className="w-full bg-black/80 backdrop-blur text-white px-4 py-4 fixed top-0 z-50 shadow-md"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            <button onClick={handleHomeClick} className="flex items-center gap-2 z-10 hover:scale-110">
              <img
                src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1745839326/ChatGPT_Image_28_apr_2025_13_22_00_qpvete.png"
                alt="Logo"
                className="h-15 drop-shadow-md hover:drop-shadow-xl transition duration-300"
              />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2">
              <button
                onClick={handleHomeClick}
                className="text-xl sm:text-2xl font-bold tracking-wide hover:text-blue-400 transition-colors"
              >
                DroneHub
              </button>
            </div>

            {/* desktop */}
            <ul className="hidden md:flex items-center space-x-6 text-lg font-medium z-10">
              <li>
                <button onClick={() => navigate("/products")} className="hover:text-blue-400 transition-colors">
                  Products
                </button>
              </li>
              <li>
                {!user ? (
                  <button onClick={() => navigate("/login")} className="hover:text-blue-400 transition-colors">
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const confirmLogout = window.confirm("Are you sure you want to logout?");
                      if (confirmLogout) logout();
                    }}
                    className="hover:text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </li>
              <li className="relative">
                <button
                  onClick={() => navigate("/cart")}
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <FaShoppingCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>

            {/* mobile*/}
            <button
              className="md:hidden z-20"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full right-4 bg-black/90 backdrop-blur p-6 rounded-md flex flex-col items-end space-y-4 text-lg font-medium md:hidden mt-2"
                >
                  <li>
                    <button onClick={() => { navigate("/products"); setMenuOpen(false); }} className="hover:text-blue-400">
                      Products
                    </button>
                  </li>
                  <li>
                    {!user ? (
                      <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="hover:text-blue-400">
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
                        className="hover:text-red-400"
                      >
                        Logout
                      </button>
                    )}
                  </li>
                  <li className="relative">
                    <button
                      onClick={() => { navigate("/cart"); setMenuOpen(false); }}
                      className="hover:text-blue-400 flex items-center"
                    >
                      <FaShoppingCart className="text-xl mr-2" />
                      Cart
                      {cartCount > 0 && (
                        <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
