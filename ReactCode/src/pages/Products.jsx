import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type in ["CineDrones", "FPVDrones", "EnterpriseDrones"]]{
        _id,
        _type,
        title,
        slug,
        images[0],
        price,
        configurations[]{label, price}
      }`;

      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Drones</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product) => {
          const price = product.price || product.configurations?.[0]?.price || "N/A";

          return (
            <div key={product._id} className="bg-white text-black p-4 rounded-xl shadow hover:shadow-xl transition">
              {product.images && (
                <img
                  src={urlFor(product.images).width(500).url()}
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-blue-600 font-bold mt-2">{price} €</p>
              
              <p className="text-sm text-gray-500 mt-1">Type: {product._type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
