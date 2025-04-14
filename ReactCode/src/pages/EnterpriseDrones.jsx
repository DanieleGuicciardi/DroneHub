import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const EnterpriseDrones = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "EPDrones"]{
        _id,
        title,
        slug,
        category,
        configurations,
        specifications,
        description,
        images
      }`;
      const data = await client.fetch(query);
      setDrones(data);
    };
    fetchData();
  }, []);

  return (
    <section className="bg-black text-white px-6 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <h1 className="text-5xl font-bold mb-4">Enterprise Drones</h1>
        <p className="text-gray-400 text-lg">
          These high-end drones are built for professionals: whether it's for rescue missions, industrial inspections or cinematic masterpieces. Explore our premium models and contact us for personalized offers.
        </p>
      </motion.div>

      <div className="space-y-24 max-w-7xl mx-auto">
        {drones.map((drone, index) => (
          <motion.div
            key={drone._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-10"
          >
            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden">
              <img
                src={urlFor(drone.images?.[0]).width(1000).url()}
                alt={drone.title}
                className="w-full h-80 object-cover rounded-3xl"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold leading-snug">{drone.title}</h2>
              <p className="text-sm text-gray-400 capitalize">Category: {drone.category}</p>
              <p className="text-gray-300 text-base">
                {drone.description?.[0]?.children?.[0]?.text || "Professional drone system"}
              </p>

              {drone.configurations?.[0] && (
                <p className="text-cyan-400 text-xl font-semibold">
                  {drone.configurations[0].label}: {drone.configurations[0].price} €
                </p>
              )}

              <Link
                to="/contacts"
                className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all"
              >
                Contact Us for Purchase
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EnterpriseDrones;
