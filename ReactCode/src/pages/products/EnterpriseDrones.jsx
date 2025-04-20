import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EnterpriseDrones = () => {
  const [drones, setDrones] = useState([]);
  const [openDescriptions, setOpenDescriptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "EPDrones"]{ _id, title, slug, description }`;
      const data = await client.fetch(query);
      setDrones(data);
    };
    fetchData();
  }, []);

  const toggleDescription = (slug) => {
    setOpenDescriptions((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const findDrone = (name) =>
    drones.find((d) => d.title.toLowerCase().includes(name.toLowerCase()));

  const renderDroneSection = (drone, videoUrl, overlayColor = "bg-black/50") => {
    if (!drone) return null;

    const isOpen = openDescriptions[drone.slug.current];
    const descriptionText =
      drone.description?.[0]?.children?.[0]?.text || "Professional drone system";

    return (
      <div className="relative w-full h-[90vh] overflow-hidden mb-10">
        {/* Video Background */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${overlayColor} flex flex-col justify-center items-center text-center px-6`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{drone.title}</h2>
          <Link
            to="/contacts"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition hover:scale-105"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Description Dropdown */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 bg-gradient-to-t from-black/80 to-transparent">
          <button
            onClick={() => toggleDescription(drone.slug.current)}
            className="text-white text-lg underline hover:text-blue-400 transition"
          >
            {isOpen ? "Hide Description" : "Read More"}
          </button>

          {isOpen && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 max-w-3xl text-gray-300 text-center px-4"
            >
              {descriptionText}
            </motion.p>
          )}
        </div>
      </div>
    );
  };

  // Match drone data by name
  const matrice4 = findDrone("matrice 4");
  const inspire3 = findDrone("inspire 3");
  const agrasT50 = findDrone("agras t50");
  const matrice350 = findDrone("matrice 350");

  return (
    <section className="bg-black text-white">
      {matrice4 &&
        renderDroneSection(
          matrice4,
          "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745151922/Matrice4Video_qoeixt.mp4"
        )}

      {inspire3 &&
        renderDroneSection(
          inspire3,
          "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745152116/Inspire3Video_rba6po.webm",
          "bg-black/40"
        )}

      {agrasT50 &&
        renderDroneSection(
          agrasT50,
          "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745152330/Agrast50Video_ykc37m.webm",
          "bg-green-900/40"
        )}

      {matrice350 &&
        renderDroneSection(
          matrice350,
          "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745152236/Matrice350Video_l3e7lv.webm",
          "bg-blue-900/40"
        )}
    </section>
  );
};

export default EnterpriseDrones;
