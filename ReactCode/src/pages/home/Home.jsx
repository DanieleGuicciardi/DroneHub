import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const stabilizedRef = useRef(null);
  const fpvRef = useRef(null);

  const stabilizedVideoRef = useRef(null);
  const fpvVideoRef = useRef(null);

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

  const HeroSection = () => (
    <div className="h-screen bg-black flex flex-col justify-center items-center text-center text-white px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-4"
      >
        DroneHub
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-xl md:text-2xl text-gray-400"
      >
        What kind of pilot are you?
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex gap-6"
      >
        <button
          onClick={() => stabilizedRef.current.scrollIntoView({ behavior: "smooth" })}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition"
        >
          Stabilized
        </button>
        <button
          onClick={() => fpvRef.current.scrollIntoView({ behavior: "smooth" })}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition"
        >
          FPV
        </button>
      </motion.div>
    </div>
  );

  const VideoSection = ({
    title,
    description,
    videoRef,
    src,
    ctaColor,
    reverse = false,
    ctaLink = "/products"
  }) => (
    <div
      ref={reverse ? fpvRef : stabilizedRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      />
  
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center px-6 text-center text-white z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-lg text-gray-300 mb-6 leading-relaxed"
        >
          {description}
        </motion.p>
        <motion.a
          href={ctaLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={`px-8 py-3 ${ctaColor} text-white font-semibold rounded-full shadow-md transition`}
        >
          View Products
        </motion.a>
      </div>
    </div>
  );

  return (
    <section className="bg-black text-white overflow-hidden">
      <HeroSection />

      <VideoSection
        title="Stabilized Drones"
        description="Ideal for filmmakers, real estate, and smooth cinematic shots. GPS precision and elegant 4K footage from above."
        videoRef={stabilizedVideoRef}
        src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1744715537/CineVideo_kwp4jr.mp4"
        ctaColor="bg-blue-600 hover:bg-blue-700"
        ctaLink="/products/cine"
      />

      <VideoSection
        title="FPV Drones"
        description="The wild side of flying — FPV drones give you total control and unmatched speed for racing, freestyle, or bold cinematic scenes."
        videoRef={fpvVideoRef}
        src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1744715501/FPVVideo_nfxrnu.mp4"
        ctaColor="bg-pink-600 hover:bg-pink-700"
        ctaLink="/products/fpv"
        reverse
      />

      <div className="bg-black py-24 text-center px-6">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          Still not sure what to choose?
        </motion.h3>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
          Explore our full catalog and discover your pilot personality. DroneHub is your skyward gateway.
        </p>
        <a
          href="/products"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-full font-semibold shadow-lg text-white transition"
        >
          Explore All Drones
        </a>
      </div>
    </section>
  );
};

export default Home;
