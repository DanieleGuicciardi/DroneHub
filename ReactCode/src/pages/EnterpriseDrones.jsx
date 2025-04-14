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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {drones.map((drone, index) => (
          <motion.div
            key={drone._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
          >
            <img
              src={urlFor(drone.images?.[0]).width(1000).url()}
              alt={drone.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{drone.title}</h2>
              <p className="text-sm text-gray-400 mb-4 capitalize">Category: {drone.category}</p>
              <p className="text-gray-300 text-sm mb-4">
                {drone.description?.[0]?.children?.[0]?.text || "Professional drone system"}
              </p>
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-1">First Configuration:</h4>
                {drone.configurations?.[0] && (
                  <p className="text-cyan-400 text-lg font-semibold">
                    {drone.configurations[0].label}: {drone.configurations[0].price} €
                  </p>
                )}
              </div>

              <Link
                to="/contacts"
                className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
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