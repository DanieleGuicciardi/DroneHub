import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import CineVideo from "../assets/Homepage/CineVideo.mp4";
import FPVVideo from "../assets/Homepage/FPVVideo.mp4"

const Home = () => {
  const siteTitle = "DroneHub";
  const subtitle = "What kind of pilot are you?";
  const options = ["Stabilized", "FPV"];

  const containerRef = useRef(null);
  const stabilizedRef = useRef(null);
  const fpvRef = useRef(null);

  const stabilizedVideoRef = useRef(null);
  const fpvVideoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // function for automatic player video
  useEffect(() => {
    const videos = [stabilizedVideoRef.current, fpvVideoRef.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videos.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videos.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

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
          <button
            onClick={() => scrollToSection(stabilizedRef)}
            className="w-60 px-8 py-4 text-xl font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Stabilized
          </button>
          <button
            onClick={() => scrollToSection(fpvRef)}
            className="w-60 px-8 py-4 text-xl font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            FPV
          </button>
        </motion.div>
      </div>

      {/* CINE */}
      <motion.div
        ref={stabilizedRef}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="min-h-screen bg-white text-black px-6 py-20 flex flex-col md:flex-row items-center gap-10"
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">Stabilized Drones</h2>
          <p className="text-lg text-gray-700">
            Whether you're a filmmaker, a content creator or simply someone who wants to capture life's moments from a new
            perspective — our <strong>Stabilized Drones</strong> are your perfect flight companions.
            Equipped with ultra-precise GPS systems and gimbals that smooth out every shake, they let you shoot breathtaking 4K footage with cinematic elegance.
            <br /><br />
            Ideal for professional shoots, real estate showcases, nature documentaries or travel vlogs — they're silent, steady and incredibly easy to fly. Turn your ideas into art, from the sky.
          </p>
          <button className="mt-4 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            View Products
          </button>
        </div>
        <motion.div
          className="md:w-1/2 w-full h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <video
            ref={stabilizedVideoRef}
            src={CineVideo}
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* FPV */}
      <motion.div
        ref={fpvRef}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="min-h-screen bg-gray-900 text-white px-6 py-20 flex flex-col md:flex-row-reverse items-center gap-10"
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-white">FPV Drones</h2>
          <p className="text-lg text-gray-300">
            Welcome to the <strong>wild side of flying</strong>. FPV drones aren’t just tools — they’re adrenaline machines.
            With full manual control and immersive first-person view, you don’t just fly: you become the drone.
            <br /><br />
            Chase cars, dive buildings, zip through forests or film action sequences with impossible angles.
            Perfect for racing, freestyle, or cinematic shoots that demand raw speed and control.
            <strong> Only for the brave.</strong>
          </p>
          <button className="mt-4 bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition">
            View Products
          </button>
        </div>
        <motion.div
          className="md:w-1/2 w-full h-64 md:h-96 bg-gray-700 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <video
            ref={fpvVideoRef}
            src={FPVVideo}
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-black text-white text-center px-6 py-24"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Still not sure what to choose?
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Discover our full collection and find your flying identity. Whether you want cinematic stability or heart-pounding FPV adrenaline, DroneHub is your launchpad.
        </p>

        <motion.a
          href="/products"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all"
        >
          Explore All Drones
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Home;
