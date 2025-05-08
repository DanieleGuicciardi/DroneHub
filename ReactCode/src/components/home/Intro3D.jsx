import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";

import DroneModel from "./DroneModel";

const Scene = () => {
  const gl = useThree((state) => state.gl);

  useFrame(({ camera }) => {
    camera.position.set(0, 5, 6);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <DroneModel />
    </>
  );
};

const Intro3D = ({ onScrollTo }) => {
  const { scrollYProgress } = useScroll();
  const scaleTitle = useTransform(scrollYProgress, [0, 0.2], [1.8, 0.2]);
  const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const yCanvas = useTransform(scrollYProgress, [0, 0.2], [0, 500]);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: yCanvas }}>
        <Canvas gl={{ antialias: false }}>
          <Scene />
        </Canvas>
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
        <motion.h1
          style={{ scale: scaleTitle, y: yTitle }}
          className="text-4xl md:text-6xl font-bold text-white mb-15"
        >
          DroneHub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-gray-300 mb-5"
        >
          What kind of pilot are you?
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-6"
        >
        <button
          onClick={() => onScrollTo("stabilized")}
          className="w-full sm:w-auto min-w-[150px] sm:min-w-[200px]
                      px-6 py-2 sm:px-8 sm:py-4 
                      bg-gradient-to-r from-blue-800 to-blue-700 
                      hover:from-blue-600 hover:to-blue-500 
                      text-white font-semibold rounded-3xl 
                      shadow-md hover:shadow-lg 
                      transform hover:scale-105 
                      transition-all duration-500 
                      border border-black 
                      text-base sm:text-lg tracking-wide"
        >
          Stabilized
        </button>

        <button
          onClick={() => onScrollTo("fpv")}
          className="w-full sm:w-auto min-w-[150px] sm:min-w-[200px]
                      px-6 py-2 sm:px-8 sm:py-4 
                      bg-gradient-to-r from-blue-800 to-blue-700 
                      hover:from-blue-600 hover:to-blue-500 
                      text-white font-semibold rounded-3xl 
                      shadow-md hover:shadow-lg 
                      transform hover:scale-105 
                      transition-all duration-500 
                      border border-black 
                      text-base sm:text-lg tracking-wide"
        >
          FPV
        </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro3D;
