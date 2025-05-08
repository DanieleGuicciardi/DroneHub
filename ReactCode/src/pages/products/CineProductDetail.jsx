import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "../../lib/sanityClient";
import { useCartStore } from "../../store/useCartStore";
import QuickLinks from "../../components/products/QuickLinks.jsx";
import PriceBar from "../../components/products/PriceBar.jsx";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const CineProductDetail = () => {
  const { slug } = useParams();
  const [drone, setDrone] = useState(null);
  const [flyMore, setFlyMore] = useState(false);
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBar, setShowBar] = useState(true);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchDrone = async () => {
      const query = `*[_type == "CineDrones" && slug.current == $slug][0]{
        _id,
        title,
        description,
        specifications,
        category,
        price,
        flyMoreComboPrice,
        images
      }`;
      const data = await client.fetch(query, { slug });
      setDrone(data);

      setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        setShowBar(scrollPosition < docHeight - 100);
      }, 100);
    };

    fetchDrone();

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setShowBar(scrollPosition < docHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === drone.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? drone.images.length - 1 : prev - 1
    );
  };

  if (!drone) {
    return <div className="text-white text-center py-20">Loading drone details...</div>;
  }

  const basePrice = drone.price;
  const flyMorePrice = flyMore ? drone.flyMoreComboPrice || 0 : 0;
  const totalPrice = basePrice + flyMorePrice;

  const handleAddToCart = () => {
    addToCart({
      _id: drone._id,
      title: drone.title,
      price: totalPrice,
      image: drone.images?.[0],
      flyMoreComboPrice: flyMore ? drone.flyMoreComboPrice : 0,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-4 rounded-full transition z-10"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
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
          <p className="text-gray-400 mb-2 text-lg">Category: {drone.category}</p>
          <p className="text-xl text-blue-500 font-semibold mb-4">Base Price: {basePrice} €</p>

          {drone.description && (
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              {drone.description}
            </p>
          )}

          {drone.specifications && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {drone.specifications
                  .split("\n")
                  .slice(0, showAllSpecs ? undefined : 10)
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
              {drone.specifications.split("\n").length > 10 && (
                <button
                  onClick={() => setShowAllSpecs((prev) => !prev)}
                  className="mt-2 text-blue-400 hover:underline text-sm"
                >
                  {showAllSpecs ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          {drone.flyMoreComboPrice > 0 && (
            <div className="mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flyMore}
                  onChange={() => setFlyMore((prev) => !prev)}
                  className="w-5 h-5 accent-blue-600"
                />
                <span className="text-gray-300 text-base">
                  Add Fly More Combo (+{drone.flyMoreComboPrice} €)
                </span>
              </label>

              {flyMore && (
                <div className="mt-3 bg-gray-800 text-gray-300 text-sm rounded-lg p-4 transition-all duration-300">
                  <h4 className="font-semibold text-white mb-2">What’s included:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>3 total batteries (2 extra included)</li>
                    <li>Extra charging hub</li>
                    <li>More propellers and cables</li>
                    <li>Additional carrying case</li>
                    <li>
                      Extra accessories depending on the drone type – check description for details.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <QuickLinks />

      <PriceBar
        visible={showBar}
        price={totalPrice}
        added={added}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};

export default CineProductDetail;
