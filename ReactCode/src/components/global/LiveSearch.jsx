import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "../../lib/sanityClient";

const LiveSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const builder = imageUrlBuilder(client);
  const urlFor = (source) => builder.image(source);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchResults = async () => {
        if (query.trim().length === 0) {
          setResults([]);
          return;
        }

        const data = await client.fetch(
          `*[_type in ["CineDrones", "FPVDrones", "SecondaryProducts"] && title match $q][0...5]{
            _id, title, slug, _type, images
          }`,
          { q: `${query}*` }
        );

        setResults(data);
        setShowDropdown(true);
      };

      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setShowDropdown(false);
    setQuery("");
  };

  const handleResultClick = (slug, type) => {
    const path =
      type === "FPVDrones"
        ? "fpv"
        : type === "SecondaryProducts"
        ? "secondary"
        : "cine";

    navigate(`/products/${path}/${slug}`);
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-full"
      >
        <Search className="text-gray-400 mr-2 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none w-full"
          onFocus={() => query.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
      </form>

      {showDropdown && results.length > 0 && (
        <ul className="absolute w-full bg-black border border-gray-700 mt-2 rounded-lg overflow-hidden z-50 shadow-lg">
          {results.map((item) => (
            <li
              key={item._id}
              onClick={() => handleResultClick(item.slug.current, item._type)}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-sm text-white flex items-center gap-2"
            >
              <img
                src={urlFor(item.images?.[0]).width(100).url()}
                alt={item.title}
                className="w-8 h-8 object-cover rounded"
              />
              <div className="flex flex-col">
                <span>{item.title}</span>
                <span className="text-xs text-gray-400 capitalize">
                  {item._type.replace("Drones", " Drones").replace("SecondaryProducts", "Accessories")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveSearchBar;
