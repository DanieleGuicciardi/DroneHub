import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { useCartStore } from "../../store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const AccessoryDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const [showBar, setShowBar] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "SecondaryProducts" && slug.current == $slug][0]{
        _id,
        title,
        price,
        images,
        category,
        specifications,
        description
      }`;
      const data = await client.fetch(query, { slug });
      setProduct(data);
    };
    fetchProduct();

    //scroll animation on priceNavbar
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
  
      setShowBar(scrollPosition < docHeight - 100);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return <div className="text-white text-center py-20">Loading accessory details...</div>;
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-16 pb-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative w-full h-150 rounded-xl overflow-hidden">
          {product.images?.length > 0 && (
            <>
              <img
                src={urlFor(product.images[currentImg]).width(800).url()}
                alt={`Accessory ${currentImg + 1}`}
                className="w-full h-full object-contain transition duration-300"
              />

              <button
                onClick={() =>
                  setCurrentImg((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-2 rounded-full z-10"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentImg((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-2 rounded-full z-10"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {product.images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === currentImg ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-400 mb-2 capitalize text-lg">Category: {product.category}</p>
          <p className="text-blue-500 text-xl font-semibold mb-4">{product.price} €</p>

          {product.description && (
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{product.description}</p>
          )}

          {product.specifications && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {product.specifications.split("\n").map((line, i) => (
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
            alt="Support"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <span className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
            Support
          </span>
        </Link>

        <Link
          to="/contacts"
          className="relative col-span-1 md:col-span-2 h-64 bg-gray-800 rounded-xl overflow-hidden group"
        >
          <img
            src="https://res.cloudinary.com/dgtwxbofy/image/upload/v1745181022/CineDownImg3_s59rp9.jpg"
            alt="Contact"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
          <span className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
            Contact
          </span>
        </Link>
      </div>

      {/* price navbar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "tween", duration: 0.65 }}
            className="fixed bottom-0 left-0 right-0 bg-black px-10 py-6 flex justify-between items-center backdrop-blur-sm border-t border-gray-800 z-50 shadow-inner"
          >
            <span className="text-white text-lg font-semibold">
              Eur <span className="font-light text-xl">{product.price.toFixed(2)} €</span>
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
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default AccessoryDetail;
