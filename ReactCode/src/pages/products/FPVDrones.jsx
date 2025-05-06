import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import FilterDropdown from "../../components/products/FilterDropdown";
import ProductCard from "../../components/products/ProductCard";

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

      <FilterDropdown
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={categories}
        accent="purple"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
        {filtered.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            image={product.images?.[0]}
            slug={product.slug}
            configurationsCount={product.configurations?.length}
            linkTo={`/products/fpv/${product.slug.current}`}
          />
        ))}
      </div>

      <div className="mt-24 max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Need a Custom FPV Build?</h2>
        <p className="text-gray-400 text-lg mb-6">
          Tell us your needs, and we’ll build the perfect drone for your project.
          Whether it’s speed, stability, long-range or cinematic — we assemble, test and deliver it to you.
        </p>
        <a
          href="/products/customrequest"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-full font-semibold shadow-lg text-white transition"
        >
          Request a Custom Build →
        </a>
      </div>
    </section>
  );
};

export default FPVDrones;
