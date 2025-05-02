import { useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";

// model manipulation
const DroneModel = () => {
  const { scene } = useGLTF("/models/drone.glb");
  const ref = useRef();
  const { scrollYProgress } = useScroll();
  const landedRef = useRef(false);
  const landingStart = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(0, Math.PI, 0);
      ref.current.scale.set(0.1, 0.1, 0.1);
      ref.current.position.set(0.5, 8, 0); 
    }
  }, []);

  useFrame(() => {
    const drone = ref.current;
    if (!drone) return;

    const scroll = scrollYProgress.get();

    const trembleY = Math.sin(Date.now() * 0.01) * 0.01;
    const tiltX = Math.sin(Date.now() * 0.005) * 0.02;
    const tiltZ = Math.sin(Date.now() * 0.007) * 0.02;
    const liftY = scroll < 0.1 ? 0 : (scroll - 0.1) * 2.5;

    // landing animation
    if (!landedRef.current) {
      if (!landingStart.current) landingStart.current = Date.now();
      const elapsed = (Date.now() - landingStart.current) / 1000;
      const y = Math.max(3, 8 - elapsed * 5); 

      drone.position.set(0.5, y + trembleY + liftY, 0);

      if (y <= 3) {   //stop landing animation at 3
        landedRef.current = true;
        landingStart.current = null;
      }
    } else {
      // shake animation
      drone.position.set(0.5, 3 + trembleY + liftY, 0);
    }

    drone.rotation.x = tiltX;
    drone.rotation.z = tiltZ;
  });

  return <primitive ref={ref} object={scene} />;
};


function Scene() {
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
}

const Intro3D = ({ onScrollTo }) => {
  const { scrollYProgress } = useScroll();

  const scaleTitle = useTransform(scrollYProgress, [0, 0.2], [1.8, 0.2]);
  const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const yCanvas = useTransform(scrollYProgress, [0, 0.2], [0, 500]);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yCanvas }}
      >
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
            className="min-w-[200px] px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-700 
              hover:from-blue-600 hover:to-blue-500 
              text-white font-semibold rounded-3xl shadow-md hover:shadow-lg 
              transform hover:scale-105 
              transition-all duration-500 
              border border-black text-lg tracking-wide hover:tracking-wider
              "
          >
            Stabilized
          </button>
          <button
            onClick={() => onScrollTo("fpv")}
            className="min-w-[200px] px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-700 
              hover:from-blue-600 hover:to-blue-500 
              text-white font-semibold rounded-3xl shadow-md hover:shadow-lg 
              transform hover:scale-105 
              transition-all duration-500 
              border border-black text-lg tracking-wide hover:tracking-wider
              "
          >
            FPV
          </button>
        </motion.div>
      </div>
    </div>
  );
};


// homepage

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
