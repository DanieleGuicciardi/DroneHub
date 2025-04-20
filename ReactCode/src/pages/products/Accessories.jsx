import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const categorySections = [
  {
    title: "ActionCams",
    category: "ActionCam",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745135321/ActionCamVideo-1_yla3bx.mp4"
  },
  {
    title: "Stabilizers",
    category: "Stabilizers",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1744972559/AccessoryVideo-1_yfod9g.mp4"
  },
  {
    title: "Controllers",
    category: "RemoteController",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745136025/ControllersVideo_qpeqxf.mp4"
  },
  {
    title: "Other Accessories",
    category: "Accessory",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745135804/OtherAccessoriesVideo_yqpvc7.mp4"
  },
];

const Accessories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "SecondaryProducts"]{
        _id,
        title,
        slug,
        price,
        images,
        category
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };
    fetchData();
  }, []);

  const getCategoryProducts = (cat) =>
    products.filter((p) => p.category?.toLowerCase() === cat.toLowerCase());

  return (
    <section className="min-h-screen bg-black text-white px-4 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-10">Accessories & Add-ons</h1>

      <p className="max-w-3xl mx-auto text-center text-gray-400 text-lg mb-16 leading-relaxed">
        Boost your drone setup with the perfect add-ons. Explore dedicated sections for controllers, power solutions, cases and more.
      </p>

      {categorySections.map(({ title, category, video }) => {
        const items = getCategoryProducts(category);
        if (items.length === 0) return null;

        return (
          <div key={category} className="mb-24 max-w-6xl mx-auto">
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <h2 className="text-3xl font-bold mb-9 border-l-4 border-blue-500 pl-4">{title}</h2>
              <video
                src={video}
                muted
                autoPlay
                loop
                playsInline
                className="w-full mb-3 rounded-3xl h-64 md:h-96 object-cover"
              />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300"
                >
                  <img
                    src={urlFor(item.images?.[0]).width(800).url()}
                    alt={item.title}
                    className="w-48 h-48 object-contain mb-4 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-green-400 font-bold mt-1">{item.price} €</p>
                  <Link
                    to={`/products/accessories/${item.slug.current}`}
                    className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Accessories;