import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/products/cine"
            className="relative group h-60 rounded-xl overflow-hidden shadow-lg block"
          >
            <motion.img
              src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1744716066/CineDrones_csinta.png"
              alt="CineDrones"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-2xl font-bold group-hover:text-blue-400 transition">
                CineDrones
              </h2>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/products/fpv"
            className="relative group h-60 rounded-xl overflow-hidden shadow-lg block"
          >
            <motion.img
              src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1744716069/FPVDrones_mgwp4u.webp"
              alt="FPV Drones"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-2xl font-bold group-hover:text-purple-400 transition">
                FPV Drones
              </h2>
            </div>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto mb-16"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          to="/products/accessories"
          className="relative group h-40 rounded-xl overflow-hidden shadow-lg block"
        >
          <motion.img
            src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1744716051/Accessories_rlamlx.jpg"
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
        transition={{ duration: 0.5, delay: 0.8 }}
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
