import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import CineDrones from "../assets/Products/CineDrones.png"
import FPVDrones from "../assets/Products/FPVDrones.webp"
import Accessories from "../assets/Products/Accessories.jpg"

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

const Products = () => {
  return (
    <motion.section
      className="min-h-screen bg-black text-white px-6 py-16"
      initial="initial"
      animate="animate"
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        Shop by Category
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        {[{
          title: "CineDrones",
          to: "/products/cine",
          img: CineDrones,
          hover: "text-blue-400",
        }, {
          title: "FPV Drones",
          to: "/products/fpv",
          img: FPVDrones,
          hover: "text-purple-400",
        }].map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <Link
              to={item.to}
              className="relative group h-60 rounded-xl overflow-hidden shadow-lg block"
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h2 className={`text-2xl font-bold group-hover:${item.hover} transition`}>
                  {item.title}
                </h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-4xl mx-auto mb-16"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          to="/products/accessories"
          className="relative group h-40 rounded-xl overflow-hidden shadow-lg block"
        >
          <motion.img
            src={Accessories}
            alt="Accessories"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-2xl font-bold group-hover:text-yellow-400 transition">
              Accessories
            </h2>
          </div>
        </Link>
      </motion.div>

      <motion.div
        className="text-center mt-20"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-xl mb-4">Are you a business or professional operator?</p>
        <Link
          to="/products/epdrones"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-full font-semibold shadow-lg"
        >
          Explore Enterprise Drones
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Products;
