import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { client } from "../../lib/sanityClient";
import { GoArrowDown } from "react-icons/go";

const EnterpriseDrones = () => {
  const [drones, setDrones] = useState([]);
  const [openDescriptions, setOpenDescriptions] = useState({});
  const [openSpecs, setOpenSpecs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "EPDrones"]{ _id, title, slug, description, specifications }`;
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

  const toggleSpecs = (slug) => {
    setOpenSpecs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const findDrone = (name) =>
    drones.find((d) => d.title.toLowerCase().includes(name.toLowerCase()));

  const renderDroneSection = (drone, videoUrl, overlayColor = "bg-black/50") => {
    if (!drone) return null;

    const slug = drone.slug.current;
    const isDescOpen = openDescriptions[slug];
    const isSpecsOpen = openSpecs[slug];

    const descriptionText =
      drone.description?.[0]?.children?.[0]?.text || "Professional drone system";

    const specsList = drone.specifications
      ? drone.specifications.split("\n").filter((line) => line.trim() !== "")
      : [];

    return (
      <div className="relative w-full overflow-hidden mb-20">
        <div className="relative w-full h-[90vh]">
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

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

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 bg-gradient-to-t from-black/80 to-transparent">
            <button
              onClick={() => toggleDescription(slug)}
              className="text-white text-lg underline hover:text-blue-400 transition"
            >
              {isDescOpen ? "Hide Description" : "Read More"}
            </button>

            {isDescOpen && (
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

        <div className="text-center pr-5 mt-6">
          <button
            onClick={() => toggleSpecs(slug)}
            className="text-white text-lg hover:text-cyan-400 transition"
          >
            {isSpecsOpen ? "Hide Specifications 🡡" : "View Specifications 🡣"}
          </button>

          {isSpecsOpen && specsList.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 max-w-3xl mx-auto text-left text-gray-300 list-disc pl-6"
            >
              {specsList.map((spec, i) => (
                <li key={i} className="mb-1">{spec}</li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    );
  };

  const matrice4 = findDrone("matrice 4");
  const inspire3 = findDrone("inspire 3");
  const agrasT50 = findDrone("agras t50");
  const matrice350 = findDrone("matrice 350");

  return (
    <section className="bg-black text-white overflow-hidden min-h-screen">
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
