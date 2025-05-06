import { Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanityClient";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const ProductCard = ({
  title,
  price,
  comboPrice,
  slug,
  image,
  configurationsCount,
  linkTo,
}) => {
  return (
    <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
      <img
        src={urlFor(image).width(800).url()}
        alt={title}
        className="w-64 h-64 object-contain mb-4 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
      />
      <h2 className="text-xl font-semibold group-hover:text-blue-400 transition">{title}</h2>

      {price && (
        <p className="text-green-400 font-bold mt-1">{price} €</p>
      )}

      {comboPrice > 0 && (
        <p className="text-sm text-gray-400">Fly More Combo: +{comboPrice} €</p>
      )}

      {configurationsCount > 1 && (
        <p className="text-sm text-gray-400">{configurationsCount} configurations</p>
      )}

      <Link
        to={linkTo}
        className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
      >
        {comboPrice || price ? "Buy Now" : "More Info"}
      </Link>
    </div>
  );
};

export default ProductCard;
