import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const FpvProductDetail = () => {
  const { slug } = useParams();
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const fetchDrone = async () => {
      const query = `*[_type == "FPVDrones" && slug.current == $slug][0]{
        title,
        description,
        specifications,
        category,
        images,
        configurations
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

          {drone.configurations?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Available Configurations</h3>
              <ul className="space-y-2">
                {drone.configurations.map((config, idx) => (
                  <li key={idx} className="flex justify-between bg-gray-800 p-3 rounded-md">
                    <span>{config.label}</span>
                    <span>{config.price} €</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {drone.specifications && (
            <div className="mt-8">
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

export default FpvProductDetail;
