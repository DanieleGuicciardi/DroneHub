import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../../lib/sanityClient";
import ProductCard from "../../components/products/ProductCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);

      const data = await client.fetch(
        `*[_type in ["CineDrones", "FPVDrones", "SecondaryProducts"] && title match $q]{
          _id,
          title,
          price,
          flyMoreComboPrice,
          slug,
          _type,
          images
        }`,
        { q: `${query}*` }
      );

      setResults(data);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <section className="min-h-screen bg-black text-white px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Your Search
        </h1>
        <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mb-4" />
        <p className="text-gray-400 text-lg">
          Results for <span className="text-blue-400">"{query}"</span>
        </p>
      </div>


      {loading ? (
        <p className="text-gray-400">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500 text-center">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {results.map((product) => (
            <ProductCard
              key={product._id}
              title={product.title}
              price={product.price}
              comboPrice={product.flyMoreComboPrice}
              slug={product.slug}
              image={product.images?.[0]}
              linkTo={`/products/${product._type === "FPVDrones" ? "fpv" : product._type === "SecondaryProducts" ? "accessories" : "cine"}/${product.slug.current}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
