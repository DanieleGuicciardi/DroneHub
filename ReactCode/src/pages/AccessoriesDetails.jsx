import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

import { useCartStore } from "../store/useCartStore";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const AccessoryDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "SecondaryProducts" && slug.current == $slug][0]{
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
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
  
    addToCart({
      _id: slug,
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
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Immagini a sinistra */}
        <div className="space-y-6">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).width(800).url()}
              alt={`Accessory image ${i + 1}`}
              className="rounded-xl object-cover w-full"
            />
          ))}
        </div>
  
        {/* Dettagli a destra */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-400 mb-2 capitalize">
            Category: {product.category}
          </p>
  
          <p className="text-yellow-500 text-xl font-semibold mb-6">
            {product.price} €
          </p>
  
          <button
            onClick={handleAddToCart}
            className={`mt-4 px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg ${
              added
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
  
          {product.specifications && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {product.specifications.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );  
};  

export default AccessoryDetail;
