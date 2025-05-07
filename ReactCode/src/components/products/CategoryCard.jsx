import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryCard = ({ to, img, title, delay = 0 }) => {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="relative group h-70 rounded-xl overflow-hidden shadow-lg block"
      >
        <motion.img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-2xl font-bold group-hover:text-blue-400 transition">
            {title}
          </h2>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
