import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "../../store/useCartStore";
import { client } from "../../lib/sanityClient";
import QuickLinks from "../../components/products/QuickLinks";
import PriceBar from "../../components/products/PriceBar";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const FpvProductDetail = () => {
  const { slug } = useParams();
  const [drone, setDrone] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const [hideNavbar, setHideNavbar] = useState(false);
  

  useEffect(() => {
    const fetchDrone = async () => {
      const query = `*[_type == "FPVDrones" && slug.current == $slug][0]{
        _id,
        title,
        description,
        specifications,
        category,
        images,
        configurations
      }`;
      const data = await client.fetch(query, { slug });
      setDrone(data);
      setSelectedConfig(data?.configurations?.[0] || null);
  
      setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.body.offsetHeight;
  
        setHideNavbar(scrollPosition >= pageHeight - 100);
      }, 100);
    };
  
    fetchDrone();
    
    //scroll animation on priceNavbar
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.offsetHeight;
  
      setHideNavbar(scrollPosition >= pageHeight - 100);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const handleAddToCart = () => {
    if (!drone || !selectedConfig) return;

    addToCart({
      _id: drone._id,
      title: drone.title,
      price: selectedConfig.price,
      configuration: selectedConfig.label,
      image: drone.images?.[0],
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!drone) {
    return <div className="text-white text-center py-20">Loading drone details...</div>;
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-16 pb-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative w-full h-150 rounded-xl overflow-hidden">
          {drone.images?.length > 0 && (
            <>
              <img
                src={urlFor(drone.images[currentImageIndex]).width(800).url()}
                alt={`Drone ${currentImageIndex + 1}`}
                className="w-full h-full object-contain transition duration-300"
              />

              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? drone.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-4 rounded-full transition z-10"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === drone.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-4 rounded-full transition z-10"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {drone.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full ${
                      idx === currentImageIndex ? "bg-white" : "bg-gray-500"
                    } transition`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{drone.title}</h1>
          <p className="text-gray-400 mb-2 text-lg capitalize">Category: {drone.category}</p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Choose Configuration</h3>
            <ul className="grid gap-3">
              {drone.configurations.map((config, idx) => (
                <li
                  key={idx}
                  onClick={() => setSelectedConfig(config)}
                  className={`cursor-pointer p-4 rounded-md border transition-all 
                    ${
                      selectedConfig?.label === config.label
                        ? "border-blue-500 bg-blue-900/30"
                        : "border-gray-700 hover:border-blue-500"
                    }`}
                >
                  <div className="flex justify-between">
                    <span className="text-white">{config.label}</span>
                    <span className="text-blue-400">{config.price} €</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {drone.specifications && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {drone.specifications.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <QuickLinks/>

      {/* price navbar */}
      <PriceBar
        visible={!hideNavbar}
        price={selectedConfig ? selectedConfig.price : drone.price}
        added={added}
        onAddToCart={handleAddToCart}
      />

    </section>
  );
};

export default FpvProductDetail;
