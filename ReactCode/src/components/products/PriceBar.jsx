import { motion, AnimatePresence } from "framer-motion";

const PriceBar = ({
  visible = true,
  price = 0,
  added = false,
  onAddToCart = () => {},
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "tween", duration: 0.65 }}
          className="fixed bottom-0 left-0 right-0 bg-black px-10 py-6 flex justify-between items-center backdrop-blur-sm border-t border-gray-800 z-50 shadow-inner"
        >
          <span className="text-white text-lg font-semibold">
            Eur <span className="font-light text-xl">{price.toFixed(2)} €</span>
          </span>
          <button
            onClick={onAddToCart}
            className={`px-6 py-2 rounded-full font-semibold transition shadow-lg ${
              added
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PriceBar;
