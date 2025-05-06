import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import FilterDropdown from "../../components/products/FilterDropdown";
import ProductCard from "../../components/products/ProductCard";

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
          src="https://res.cloudinary.com/dgtwxbofy/video/upload/v1745414377/Mavic3provideo_Ygydqm_aozdvk.mp4"
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

      <FilterDropdown
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
        {filtered.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            price={product.price}
            comboPrice={product.flyMoreComboPrice}
            slug={product.slug}
            image={product.images?.[0]}
            linkTo={`/products/cine/${product.slug.current}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CineDrones;
