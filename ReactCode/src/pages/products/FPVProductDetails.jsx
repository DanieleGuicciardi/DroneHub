import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { useCartStore } from "../../store/useCartStore";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const FpvProductDetail = () => {
  const { slug } = useParams();
  const [drone, setDrone] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

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
    };
    fetchDrone();
  }, [slug]);

  if (!drone) {
    return <div className="text-white text-center py-20">Loading drone details...</div>;
  }

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

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-16 pb-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          {drone.images?.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).width(800).url()}
              alt={`Drone ${i + 1}`}
              className="rounded-xl object-cover w-full"
            />
          ))}
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

      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/products/accessories"
          className="relative h-64 bg-gray-800 rounded-xl overflow-hidden group"
        >
          <img
            src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1745180398/CineDownImg_d0baxp.jpg"
            alt="Accessories"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <span className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
            Accessories
          </span>
        </Link>

        <Link
          to="/help&support"
          className="relative h-64 bg-gray-800 rounded-xl overflow-hidden group"
        >
          <img
            src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1745180409/CineDownImg2_uooaub.jpg"
            alt="Assurance"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <span className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
            Assurance
          </span>
        </Link>

        <Link
          to="/contacts"
          className="relative col-span-1 md:col-span-2 h-64 bg-gray-800 rounded-xl overflow-hidden group"
        >
          <img
            src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1745181022/CineDownImg3_s59rp9.jpg"
            alt="Support"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <span className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
            Support
          </span>
        </Link>
      </div>

      {/* Sticky Bottom Bar */}
      {selectedConfig && (
        <div className="fixed bottom-0 left-0 right-0 bg-black px-10 py-6 flex justify-between items-center backdrop-blur-sm shadow-lg border-t border-gray-800 z-50">
          <span className="text-white text-lg font-semibold">
            Eur <span className="font-light text-xl">{selectedConfig.price.toFixed(2)} €</span>
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-6 py-2 rounded-full font-semibold transition shadow-lg ${
              added
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      )}
    </section>
  );
};

export default FpvProductDetail;
