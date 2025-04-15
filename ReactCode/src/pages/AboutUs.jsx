import { motion } from "framer-motion";
import PersonalPhoto from "../assets/AboutUs/PersonalPhoto.jpg";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Welcome to DroneHub – a personal project born from passion, precision and flight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={PersonalPhoto}
            alt="Daniele profile"
            className="rounded-xl w-full h-auto shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4">
              My name is <strong className="text-white">Daniele</strong>, and I’ve been piloting drones for over 2 years.
              What began as simple curiosity quickly turned into a deep passion, and eventually a professional journey.
            </p>

            <p className="mb-4">
              I first started flying with <strong className="text-white">DJI stabilized drones</strong>, learning how to capture
              cinematic, steady footage with precision. Over time, I transitioned into the more <strong className="text-white">adrenaline-fueled world of FPV drones</strong>,
              exploring freestyle flying and manual acrobatics — constantly pushing my limits and skills in the sky.
            </p>

            <p>
              I hold an <strong className="text-white">A1-A3 EU drone license</strong> and specialize in aerial cinematography, both stabilized and FPV. 
              Alongside flying, I developed a strong passion for <strong className="text-white">photography and videography</strong>, and I’m constantly improving my 
              <span className="text-white"> video editing</span> abilities to turn every flight into a compelling story from above.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <video
            src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1744715612/PersonalVideo_spiw1x.mp4"
            controls
            className="w-full h-auto rounded-xl"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
