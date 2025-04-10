import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const CineProductDetail = () => {
  const { slug } = useParams();
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const fetchDrone = async () => {
      const query = `*[_type == "CineDrones" && slug.current == $slug][0]{
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

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {drone.images?.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).width(800).url()}
              alt={`Drone image ${i + 1}`}
              className="rounded-xl object-cover w-full"
            />
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{drone.title}</h1>
          <p className="text-gray-400 mb-2">Category: {drone.category}</p>

          <p className="text-blue-500 text-xl font-semibold mb-2">
            Base Price: {drone.price} €
          </p>

          {drone.flyMoreComboPrice > 0 && (
            <p className="text-md text-gray-300 mb-6">
              Fly More Combo available: {drone.flyMoreComboPrice} €
            </p>
          )}

          {drone.specifications && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {drone.specifications.split("\n").map((line, i) => (
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

export default CineProductDetail;
