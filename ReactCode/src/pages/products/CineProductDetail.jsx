import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { useCartStore } from "../../store/useCartStore";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const CineProductDetail = () => {
  const { slug } = useParams();
  const [drone, setDrone] = useState(null);
  const [flyMore, setFlyMore] = useState(false);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchDrone = async () => {
      const query = `*[_type == "CineDrones" && slug.current == $slug][0]{
        _id,
        title,
        description,
        specifications,
        category,
        price,
        flyMoreComboPrice,
        images
      }`;
      const data = await client.fetch(query, { slug });
      setDrone(data);
    };

    fetchDrone();
  }, [slug]);

  if (!drone) {
    return <div className="text-white text-center py-20">Loading drone details...</div>;
  }

  const basePrice = drone.price;
  const flyMorePrice = flyMore ? drone.flyMoreComboPrice || 0 : 0;
  const totalPrice = basePrice + flyMorePrice;

  const handleAddToCart = () => {
    addToCart({
      _id: drone._id,
      title: drone.title,
      price: totalPrice,
      image: drone.images?.[0],
      flyMoreComboPrice: flyMore ? drone.flyMoreComboPrice : 0,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 pt-16 pb-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          {drone.images?.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).width(800).url()}
              alt={`Drone ${i + 1}`}
              className="rounded-xl object-cover w-full"
            />
          ))}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{drone.title}</h1>
          <p className="text-gray-400 mb-2 text-lg">Category: {drone.category}</p>
          <p className="text-xl text-blue-500 font-semibold mb-4">Base Price: {basePrice} €</p>

          {drone.specifications && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {drone.specifications.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {drone.flyMoreComboPrice > 0 && (
            <label className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                checked={flyMore}
                onChange={() => setFlyMore((prev) => !prev)}
                className="w-5 h-5"
              />
              <span className="text-gray-300">
                Add Fly More Combo (+{drone.flyMoreComboPrice} €)
              </span>
            </label>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-2 gap-6">
        <div className="h-64 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">[ Img ]</div>
        <div className="h-64 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">[ Img ]</div>
        <div className="col-span-2 h-64 bg-gray-800 rounded-xl mt-6 flex items-center justify-center text-gray-500">[ Img ]</div>
      </div>

      {/* Price navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black px-10 py-6 flex justify-between items-centerbackdrop-blur-sm border-t border-gray-800">
        <span className="text-white text-lg font-semibold">
          Eur <span className="font-light text-xl">{totalPrice.toFixed(2)} €</span>
        </span>
        <button
          onClick={handleAddToCart}
          className={`px-6 py-2 rounded-full font-semibold transition shadow-lg ${
            added
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </section>
  );
};

export default CineProductDetail;
