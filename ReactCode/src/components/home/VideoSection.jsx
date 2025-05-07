import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VideoSection = ({
  title,
  description,
  videoRef,
  src,
  ctaColor,
  reverse = false,
  ctaLink = "/products",
  sectionRef,
}) => (
  <div
    ref={sectionRef}
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

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to={ctaLink}
          className={`px-8 py-3 ${ctaColor} text-white font-semibold rounded-full shadow-md transition inline-block`}
        >
          View Products
        </Link>
      </motion.div>
    </div>
  </div>
);

export default VideoSection;
