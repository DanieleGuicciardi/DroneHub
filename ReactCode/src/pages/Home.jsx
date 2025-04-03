import { motion } from "framer-motion";

const Home = () => {
  const siteTitle = "DroneHub";
  const subtitle = "What kind of pilot are you?";
  const options = ["Stabilized", "FPV"];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      
      {/* Site Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-center mb-4"
      >
        {siteTitle}
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-2xl md:text-3xl mb-10 text-center"
      >
        {subtitle}
      </motion.h2>

      {/* Pilot Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col md:flex-row gap-6"
      >
        {options.map((option) => (
          <button
            key={option}
            className="w-60 px-8 py-4 text-xl font-semibold rounded-lg transition
                       bg-white text-black hover:bg-gray-200 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
          >
            {option}
          </button>
        ))}
      </motion.div>
    </main>
  );
};

export default Home;
