import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
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
    <section className="min-h-screen bg-black text-white px-4 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-6">FPV Drones</h1>

      <div className="max-w-6xl mx-auto mb-10">
        <video
          src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1745414678/Fpvbuild-1_Xcjzwe_rdhpgx.mp4"
          muted
          playsInline
          autoPlay
          loop
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      <p className="max-w-3xl mx-auto text-center text-gray-400 text-lg mb-12 leading-relaxed">
        High speed, full control, and unmatched immersion. FPV drones put you in the cockpit.
        Whether you're racing, freestyling, or chasing cinematic perfection — these birds are built for adrenaline.
      </p>

      <div className="flex justify-center mb-14">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-800 text-white px-5 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
            {product.configurations?.length > 1 && (
              <p className="text-sm text-gray-400">
                {product.configurations.length} configurations
              </p>
            )}
            <Link
              to={`/products/fpv/${product.slug.current}`}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              More Info
            </Link>
          </div>
        ))}
      </div>
 
      <div className="mt-24 max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Need a Custom FPV Build?</h2>
        <p className="text-gray-400 text-lg mb-6">
          Tell us your needs, and we’ll build the perfect drone for your project.
          Whether it’s speed, stability, long-range or cinematic — we assemble, test and deliver it to you.
        </p>
        <Link
          to="/products/customrequest"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-full font-semibold shadow-lg text-white transition"
        >
          Request a Custom Build →
        </Link>
      </div>
    </section>
  );
};

export default FPVDrones;
