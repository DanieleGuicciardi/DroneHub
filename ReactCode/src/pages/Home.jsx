import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const siteTitle = "DroneHub";
  const subtitle = "What kind of pilot are you?";
  const options = ["Stabilized", "FPV"];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section ref={containerRef} className="bg-black text-white overflow-hidden">
      <div className="h-screen flex flex-col justify-center items-center">
        <motion.h1
          style={{ scale, y }}
          className="text-5xl md:text-7xl font-extrabold tracking-wide text-center"
        >
          {siteTitle}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl md:text-3xl mt-4 text-gray-300 text-center"
        >
          {subtitle}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-col md:flex-row gap-6"
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
      </div>

      <div className="min-h-[150vh] bg-white text-black px-8 py-20 rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore our drones</h2>
        <p className="max-w-2xl mx-auto text-center text-lg mb-20">
          Test
        </p>
        <div className="h-[100vh] bg-gray-200 rounded-xl flex items-center justify-center text-xl">
          Test 
        </div>
      </div>
    </section>
  );
};

export default Home;
