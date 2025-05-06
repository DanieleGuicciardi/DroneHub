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
  
      // delay scroll to always shoe the priceNavbar
      setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        setShowBar(scrollPosition < docHeight - 100);
      }, 100);
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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-4 rounded-full z-10"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentImg((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-4 rounded-full z-10"
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

      <QuickLinks/>

      {/* price navbar */}
      <PriceBar
        visible={showBar}
        price={ product.price }
        added={added}
        onAddToCart={handleAddToCart}
      />


    </section>
  );
};

export default AccessoryDetail;
