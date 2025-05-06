import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import ProductCard from "../../components/products/ProductCard";

const categorySections = [
  {
    title: "ActionCams",
    category: "ActionCam",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745414988/Actioncamvideo-1_Yla3bx_sujpna.mp4"
  },
  {
    title: "Stabilizers",
    category: "Stabilizers",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745414734/Stabilizersvideo_crbii4.mp4"
  },
  {
    title: "Controllers",
    category: "RemoteController",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745415017/Controllersvideo_Qpeqxf_w23lq8.mp4"
  },
  {
    title: "Other Accessories",
    category: "Accessory",
    video: "https://res.cloudinary.com/dgtwxbofy/video/upload/v1745414995/Otheraccessoriesvideo_Yqpvc7_stnmle.mp4"
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
                <ProductCard
                  key={item._id}
                  title={item.title}
                  price={item.price}
                  image={item.images?.[0]}
                  slug={item.slug}
                  linkTo={`/products/accessories/${item.slug.current}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Accessories;
