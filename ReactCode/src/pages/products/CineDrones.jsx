import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const CineDrones = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "CineDrones"]{
        _id,
        title,
        price,
        slug,
        flyMoreComboPrice,
        category,
        images
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
      setFiltered(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <section className="min-h-screen bg-black text-white px-4 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-6">Cinematic Drones</h1>

      <div className="max-w-6xl mx-auto mb-10">
      <video
            src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1744969250/mavic3ProVideo_ygydqm.mp4"
            muted
            playsInline
            autoPlay
            loop
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
          />
      </div>

      <p className="max-w-3xl mx-auto text-center text-gray-400 text-lg mb-12 leading-relaxed">
        Discover our selection of cinematic drones — precision tools for filmmakers, content creators, and aerial dreamers.
        Ultra-smooth, professional footage is just one flight away.
      </p>

      <div className="flex justify-center mb-14">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-800 text-white px-5 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              src={urlFor(product.images?.[0]).width(800).url()}
              alt={product.title}
              className="w-64 h-64 object-contain mb-4 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
            <h2 className="text-xl font-semibold group-hover:text-blue-400 transition">{product.title}</h2>
            <p className="text-green-400 font-bold mt-1">{product.price} €</p>
            {product.flyMoreComboPrice > 0 && (
              <p className="text-sm text-gray-400">Fly More Combo: +{product.flyMoreComboPrice} €</p>
            )}
            <Link
              to={`/products/cine/${product.slug.current}`}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CineDrones;
