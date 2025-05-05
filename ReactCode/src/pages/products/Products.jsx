import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryCard from "../../components/products/CategoryCard";

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
        <CategoryCard
          to="/products/cine"
          img="https://res.cloudinary.com/dgtwxbofy/image/upload/v1744716066/CineDrones_csinta.png"
          title="CineDrones"
          delay={0.2}
        />
        <CategoryCard
          to="/products/fpv"
          img="https://res.cloudinary.com/dgtwxbofy/image/upload/v1744716069/FPVDrones_mgwp4u.webp"
          title="FPV Drones"
          delay={0.4}
        />
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <CategoryCard
          to="/products/accessories"
          img="https://res.cloudinary.com/dgtwxbofy/image/upload/v1744716051/Accessories_rlamlx.jpg"
          title="Accessories"
          delay={0.6}
        />
      </div>

      <motion.div
        className="text-center mt-40"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-xl mb-4">Are you a business or professional operator?</p>
        <Link
          to="/products/epdrones"
          className="inline-flex mt-3 items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-700"
        >
          <span className="text-lg tracking-wide group-hover:tracking-wider transition-all duration-300">
            Explore Enterprise Drones
          </span>
          <svg
            className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Products;
