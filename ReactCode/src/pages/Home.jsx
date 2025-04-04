import { motion } from "framer-motion";

const Home = () => {
  const siteTitle = "DroneHub";
  const subtitle = "What kind of pilot are you?";
  const options = ["Stabilized", "FPV"];

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-center mb-4 tracking-wide"
      >
        {siteTitle}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-2xl md:text-3xl mb-10 text-center text-gray-300"
      >
        {subtitle}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col md:flex-row gap-6"
      >
        {options.map((option) => (
          <button
            key={option}
            className="w-60 px-8 py-4 text-xl font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {option}
          </button>
        ))}
      </motion.div>
    </section>
  );
};

export default Home;
