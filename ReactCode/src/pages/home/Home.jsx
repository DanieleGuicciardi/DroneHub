import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Intro3D from "../../components/home/Intro3D";
import VideoSection from "../../components/home/VideoSection";

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

  const scrollToSection = (section) => {
    if (section === "stabilized") stabilizedRef.current.scrollIntoView({ behavior: "smooth" });
    if (section === "fpv") fpvRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white overflow-hidden scroll-smooth">
      <Intro3D onScrollTo={scrollToSection} />

      <VideoSection
        title="Stabilized Drones"
        description="Ideal for filmmakers, real estate, and smooth cinematic shots. GPS precision and elegant 4K footage from above."
        videoRef={stabilizedVideoRef}
        src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1745413389/Cinevideo_Kwp4jr_jvfprh.mp4"
        ctaColor="bg-blue-600 hover:bg-blue-700"
        ctaLink="/products/cine"
      />

      <VideoSection
        title="FPV Drones"
        description="The wild side of flying — FPV drones give you total control and unmatched speed for racing, freestyle, or bold cinematic scenes."
        videoRef={fpvVideoRef}
        src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1745413955/Fpvvideo_Nfxrnu_e5q3b6.mp4"
        ctaColor="bg-blue-600 hover:bg-blue-700"
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
    </div>
  );
};

export default Home;
