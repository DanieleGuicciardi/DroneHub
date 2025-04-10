import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const FPVDrones = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "FPVDrones"]{
        _id,
        title,
        price,
        slug,
        category,
        images,
        configurations
      }`;
      const data = await client.fetch(query);
      setProducts(data);
      setFiltered(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">FPV Drones</h1>

      <div className="flex justify-center mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {filtered.map((product) => (
        <Link
          to={`/products/fpv/${product.slug.current}`}
          key={product._id}
          className="bg-white text-black p-4 rounded-xl shadow transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <img
            src={urlFor(product.images?.[0]).width(500).url()}
            alt={product.title}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold">{product.title}</h2>

          <p className="text-purple-600 font-bold mt-1">
            {product.configurations?.[0]?.price
              ? `${product.configurations[0].price} €`
              : "Price not available"}
          </p>

          {product.configurations?.length > 1 && (
            <p className="text-sm text-gray-600">
              {product.configurations.length} configuration options
            </p>
          )}
        </Link>
      ))}
      </div>
    </div>
  );
};

export default FPVDrones;
